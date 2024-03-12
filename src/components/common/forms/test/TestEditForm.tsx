import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import useTestStore from '@store/testStore';
import useAuthStore from '@store/authStore';

interface Question {
  question: string;
  options: string[];
  points: number[];
}

interface Result {
  text: string;
  minScore: number;
  maxScore: number;
}

interface FormData {
  title: string;
  subtitle: string;
  description: string;
  isApproved: boolean;
  createdAt: Date;
  image: string;
  userId: number;
  questions: Question[];
  results: Result[];
}

const TestEditForm = ({ testId, callBack }: any) => {
  const updateTest = useTestStore((state) => state.updateTest);
  const getOneTest = useTestStore((state) => state.getOneTest);
  const test = useTestStore((state) => state.test);
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    description: '',
    isApproved: false,
    createdAt: new Date(),
    image: '',
    userId: user.id,
    questions: [{ question: '', options: [''], points: [0] }],
    results: [],
  });
  

  useEffect(() => {
    const fetchData = async () => {
      await getOneTest(testId);
    };
    fetchData();
  }, [getOneTest, testId]);

  useEffect(() => {
    if (test) {
      const formattedQuestions = test.TestQuestion.map((question: any) => ({
        question: question.question.text,
        options: question.question.Answer.map((answer: any) => answer.text),
        points: question.question.Answer.map((answer: any) => answer.score),
      }));

      const formattedResults = test.Result.map((result: any) => ({
        text: result.text,
        minScore: result.minScore,
        maxScore: result.maxScore,
      }));

      setFormData({
        ...test,
        userId: user.id,
        createdAt: new Date(test.createdAt),
        questions: formattedQuestions,
        results: formattedResults,
      });
    }
  }, [test]);

  const handleQuestionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setFormData((prevState: FormData) => ({
      ...prevState,
      questions: prevState.questions.map((question, i) =>
        i === index ? { ...question, question: value } : question,
      ),
    }));
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setFormData((prevState: FormData) => ({
      ...prevState,
      questions: prevState.questions.map((question, i) =>
        i === questionIndex
          ? {
              ...question,
              options: question.options.map((opt, j) => (j === optionIndex ? value : opt)),
            }
          : question,
      ),
    }));
  };

  const handlePointsChange = (
    questionIndex: number,
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    const parsedValue: number | '' = value === '' ? '' : parseInt(value, 10);
  
    setFormData((prevState: FormData) => ({
      ...prevState,
      questions: prevState.questions.map((question: any, i: number) =>
        i === questionIndex
          ? {
              ...question,
              points: question.points.map((point: any, j: number) =>
                j === optionIndex ? parsedValue : point,
              ),
            }
          : question,
      ),
    }));
  };
  

  const handleResultChange = (index: number, field: string, value: string) => {
    let parsedValue: string | number = value;
    if (field !== 'text' && value !== '') {
      parsedValue = isNaN(parseInt(value)) ? '' : parseInt(value);
    }

    setFormData((prevState: FormData) => ({
      ...prevState,
      results: prevState.results.map((result, i) =>
        i === index ? { ...result, [field]: parsedValue } : result,
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTest(testId, formData).then(() => {
      callBack();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Заголовок"
        variant="standard"
        value={formData.title}
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            title: e.target.value,
          }))
        }
        fullWidth
        margin="normal"
      />
      <TextField
        name="subtitle"
        label="Подзаголовок"
        variant="standard"
        value={formData.subtitle}
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            subtitle: e.target.value,
          }))
        }
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Содержание"
        variant="standard"
        value={formData.description}
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            description: e.target.value,
          }))
        }
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <TextField
        name="image"
        label="URL изображения"
        variant="standard"
        value={formData.image}
        onChange={(e) =>
          setFormData((prevState) => ({
            ...prevState,
            image: e.target.value,
          }))
        }
        fullWidth
        margin="normal"
      />
      <Typography fontWeight={500} mt={2} variant="body1" component={'p'}>
        Список вопросов:
      </Typography>
      {formData.questions &&
        formData.questions.map((question, questionIndex) => (
          <Box key={questionIndex} marginBottom={2}>
            <TextField
              label={`Вопрос ${questionIndex + 1}`}
              variant="standard"
              value={question.question}
              onChange={(e) => handleQuestionChange(questionIndex, e)}
              fullWidth
              margin="normal"
            />
            {question.options.map((option: any, optionIndex: any) => (
              <Box key={optionIndex} display="flex" alignItems="center" gap={2} marginBottom={1}>
                <TextField
                  label={`Вариант ответа ${optionIndex + 1}`}
                  value={option}
                  fullWidth
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                  variant="standard"
                  margin="normal"
                />
                <TextField
                  label="Баллы"
                  fullWidth
                  value={question.points[optionIndex]}
                  onChange={(e) => handlePointsChange(questionIndex, optionIndex, e)}
                  type="number"
                  variant="standard"
                  margin="normal"
                />
              </Box>
            ))}
          </Box>
        ))}
      <Typography fontWeight={500} mt={2} variant="body1" component={'p'}>
        Результаты:
      </Typography>
      {formData.results &&
        formData.results.map((result, index) => (
          <Box key={index} marginBottom={2}>
            <TextField
              label={`Результат ${index + 1}`}
              variant="standard"
              value={result.text}
              onChange={(e) => handleResultChange(index, 'text', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Минимальный балл"
              variant="standard"
              value={result.minScore}
              onChange={(e) => handleResultChange(index, 'minScore', e.target.value)}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Максимальный балл"
              variant="standard"
              value={result.maxScore}
              onChange={(e) => handleResultChange(index, 'maxScore', e.target.value)}
              type="number"
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
      <Button type="submit" fullWidth variant="contained" color="primary">
        Сохранить изменения
      </Button>
    </form>
  );
};

export default TestEditForm;
