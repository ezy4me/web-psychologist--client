import React, { useState } from 'react';
import { TextField, Button, IconButton, Box, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import useTestStore from '@store/testStore';
import useAuthStore from '@store/authStore';
import { showNotification } from '@/utils/notification';

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

const TestAddForm = ({ callBack }: any) => {
  const addTest = useTestStore((state) => state.addTest);
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    subtitle: '',
    description: '',
    isApproved: false,
    createdAt: new Date(),
    image: '',
    userId: user.id,
    questions: [
      {
        question: '',
        options: ['', ''],
        points: [0, 0],
      },
    ],
    results: [{ text: '', minScore: 0, maxScore: 0 }],
  });

  const handleQuestionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setFormData((prevState: any) => {
      const updatedQuestions = [...prevState.questions];

      updatedQuestions[index] = { ...updatedQuestions[index], question: value };

      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setFormData((prevState: any) => {
      const updatedQuestions = [...prevState.questions];
      const updatedOptions = [...updatedQuestions[questionIndex].options];
      updatedOptions[optionIndex] = value;
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedOptions,
      };
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handlePointsChange = (
    questionIndex: number,
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    const parsedValue = isNaN(parseInt(value)) ? '' : parseInt(value);

    setFormData((prevState: any) => {
      const updatedQuestions = [...prevState.questions];
      const updatedPoints = [...updatedQuestions[questionIndex].points];
      updatedPoints[optionIndex] = parsedValue;
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        points: updatedPoints,
      };
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handleAddQuestion = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          question: '',
          options: [''],
          points: [0],
        },
      ],
    }));
  };

  const handleRemoveQuestion = (index: number) => {
    setFormData((prevState: any) => ({
      ...prevState,
      questions: prevState.questions.filter((_: any, i: any) => i !== index),
    }));
  };

  const handleAddOption = (index: number) => {
    setFormData((prevState: any) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[index].options.push('');
      updatedQuestions[index].points.push(0);
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    setFormData((prevState: any) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      updatedQuestions[questionIndex].points.splice(optionIndex, 1);
      return { ...prevState, questions: updatedQuestions };
    });
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    let parsedValue: string | number = value;

    if (field !== 'text' && value !== '') {
      parsedValue = isNaN(parseInt(value)) ? '' : parseInt(value);
    }

    setFormData((prevState: any) => ({
      ...prevState,
      results: prevState.results.map((result: Result, i: number) =>
        i === index ? { ...result, [field]: parsedValue } : result,
      ),
    }));
  };

  const handleAddResult = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      results: [...prevState.results, { text: '', minScore: 0, maxScore: 0 }],
    }));
  };

  const handleRemoveResult = (index: number) => {
    setFormData((prevState: any) => ({
      ...prevState,
      results: prevState.results.filter((_: any, i: any) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasQuestions = formData.questions.some((question) => question.options.length > 0);

    const hasResults = formData.results.length > 0;

    const allFieldsFilled = Object.values(formData).every((value) => value !== '');

    const questionsValid = formData.questions.some(
      (question) => question.question !== '' && question.options.some((option) => option !== ''),
    );

    if (!hasQuestions || !hasResults || !allFieldsFilled || !questionsValid) {
      showNotification({
        title: 'Создание теста',
        text: `Должен быть хотя бы один вопрос с ответами и хотя бы один результат, а также заполнены все поля формы`,
        icon: 'error',
      });
      return;
    }

    await addTest(formData).then(() => {
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
        onChange={(e) => setFormData((prevState) => ({ ...prevState, title: e.target.value }))}
        fullWidth
        margin="normal"
      />
      <TextField
        name="subtitle"
        label="Подзаголовок"
        variant="standard"
        value={formData.subtitle}
        onChange={(e) => setFormData((prevState) => ({ ...prevState, subtitle: e.target.value }))}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Содержание"
        variant="standard"
        value={formData.description}
        onChange={(e) =>
          setFormData((prevState) => ({ ...prevState, description: e.target.value }))
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
        onChange={(e) => setFormData((prevState) => ({ ...prevState, image: e.target.value }))}
        fullWidth
        margin="normal"
      />
      <Typography fontWeight={500} mt={2} variant="body1" component={'p'}>
        Список вопросов:
      </Typography>
      {formData.questions.map((question, questionIndex) => (
        <Box key={questionIndex} marginBottom={2}>
          <TextField
            name={`question-${questionIndex}`}
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
              <IconButton
                onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                size="small"
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button onClick={() => handleAddOption(questionIndex)} startIcon={<Add />} size="small">
            Добавить вариант ответа
          </Button>
          <IconButton onClick={() => handleRemoveQuestion(questionIndex)} size="small">
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Typography fontWeight={500} mt={2} variant="body1" component={'p'}>
        Результаты:
      </Typography>
      {formData.results.map((result, index) => (
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
          <IconButton onClick={() => handleRemoveResult(index)} size="small">
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          onClick={handleAddQuestion}
          startIcon={<Add />}
          fullWidth
          variant="contained"
          color="primary"
        >
          Добавить вопрос
        </Button>
        <Button
          onClick={handleAddResult}
          startIcon={<Add />}
          fullWidth
          variant="contained"
          color="primary"
        >
          Добавить результат
        </Button>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Добавить тест
        </Button>
      </Box>
    </form>
  );
};

export default TestAddForm;
