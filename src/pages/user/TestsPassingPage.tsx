import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import useTestStore from '@store/testStore';
import { Answer, TestQuestion } from '@/types';
import { showNotification } from '@/utils/notification';
import SectionTitle from '@/components/common/SectionTitlle';

export interface SelectedAnswers {
  [key: number]: string;
}

const TestsPassingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [totalScore, setTotalScore] = useState<number>(0);
  const { result, testQuestions, getTestQuestions, getTestingResult, clearResult } = useTestStore(
    (state) => ({
      result: state.result,
      testQuestions: state.testQuestions,
      getTestQuestions: state.getTestQuestions,
      getTestingResult: state.getTestingResult,
      clearResult: state.clearResult,
    }),
  );

  useEffect(() => {
    if (id) {
      clearResult();
      getTestQuestions(id);
    }
  }, [id]);

  const getTestTitle = () => {
    if (testQuestions.length > 0) {
      const title = testQuestions[0]?.test?.title || '';
      return title.trim();
    }
    return '';
  };

  const handleAnswerChange = (questionIndex: number, selectedAnswer: string, score: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: selectedAnswer,
    });

    setTotalScore((prevScore) => prevScore + score);
  };

  const handleSendAnswers = async () => {
    const isAnyAnswerSelected = Object.values(selectedAnswers).some((answer) => !!answer);

    if (!isAnyAnswerSelected) {
      showNotification({
        title: 'Прохождение теста',
        text: 'Необходимо выбрать вариант ответа',
        icon: 'warning',
      });
      return;
    }

    const isEveryAnswerSelected = testQuestions.every((_, index) => !!selectedAnswers[index]);

    if (!isEveryAnswerSelected) {
      showNotification({
        title: 'Прохождение теста',
        text: 'Ответы на все вопросы должны быть выбраны перед отправкой формы',
        icon: 'error',
      });
      return;
    }

    if (id) {
      await getTestingResult(id, totalScore);
    }
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Link to={'/tests'}>Тесты</Link>
      </Breadcrumbs>
      <Stack direction={'column'} spacing={4} mt={4}>
        <>
          <SectionTitle text={getTestTitle()} />
          {testQuestions.map((question: TestQuestion, index: number) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Вопрос {index + 1}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {question.question.text}
                </Typography>
              </CardContent>
              <CardActions>
                <FormControl component="fieldset" error={!selectedAnswers[index]}>
                  <RadioGroup
                    aria-label={`answer-${index}`}
                    value={selectedAnswers[index] || ''}
                    onChange={(e) =>
                      handleAnswerChange(
                        index,
                        e.target.value,
                        question.question.Answer.find(
                          (a: Answer) => a.id.toString() === e.target.value,
                        )?.score || 0,
                      )
                    }
                  >
                    {question.question.Answer?.map((a: Answer) => (
                      <FormControlLabel
                        key={a.id}
                        value={a.id.toString()}
                        control={<Radio />}
                        label={a.text}
                      />
                    ))}
                  </RadioGroup>
                  {!selectedAnswers[index] && <FormHelperText>Выберите ответ</FormHelperText>}
                </FormControl>
              </CardActions>
            </Card>
          ))}
          <Button variant="contained" onClick={handleSendAnswers}>
            Отправить
          </Button>
          {result && (
            <Typography variant="h6" color="primary">
              Результат: {result}
            </Typography>
          )}
        </>
      </Stack>
    </Container>
  );
};

export default TestsPassingPage;
