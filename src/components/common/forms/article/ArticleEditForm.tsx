import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import useArticleStore from '@/store/articleStore';
import useAuthStore from '@/store/authStore';

interface Props {
  articleId: string;
  callBack: () => void;
}

const ArticleEditForm = ({ articleId, callBack }: Props) => {
  const { updateArticle, getOneArticle, article } = useArticleStore((state) => ({
    updateArticle: state.updateArticle,
    getOneArticle: state.getOneArticle,
    article: state.article,
  }));
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState<any>({
    title: '',
    subtitle: '',
    description: '',
    isApproved: false,
    createdAt: new Date(),
    image: '',
    userId: user.id,
  });

  const fetchData = async () => {
    await getOneArticle(articleId);
  };

  useEffect(() => {
    fetchData();
  }, [articleId]);

  useEffect(() => {
    if (article) setFormData(article);
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateArticle(articleId, formData).then(() => {
      callBack();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Заголовок"
        variant="standard"
        value={formData.title || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="subtitle"
        label="Подзаголовок"
        variant="standard"
        value={formData.subtitle || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Содержание"
        variant="standard"
        value={formData.description || ''}
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
        value={formData.image || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button fullWidth type="submit" variant="contained" color="primary">
        Сохранить
      </Button>
    </form>
  );
};

export default ArticleEditForm;
