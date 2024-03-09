import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { CreateArticle } from '@/types';
import useArticleStore from '@/store/articleStore';
import useAuthStore from '@/store/authStore';

const ArticleAddForm = ({ callBack }: any) => {
  const addArticle = useArticleStore((state) => state.addArticle);
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<CreateArticle>({
    title: '',
    subtitle: '',
    description: '',
    isApproved: false,
    createdAt: new Date(),
    image: '',
    userId: user.id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addArticle(formData).then(() => {
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
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="subtitle"
        label="Подзаголовок"
        variant="standard"
        value={formData.subtitle}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Содержание"
        variant="standard"
        value={formData.description}
        onChange={handleChange}
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
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button fullWidth type="submit" variant="contained" color="primary">
        Добавить
      </Button>
    </form>
  );
};

export default ArticleAddForm;
