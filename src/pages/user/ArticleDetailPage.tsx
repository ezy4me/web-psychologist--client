import {
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useArticleStore from '@store/articleStore';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { article, getOneArticle } = useArticleStore((state) => ({
    article: state.article,
    getOneArticle: state.getOneArticle,
  }));

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (id) await getOneArticle(id);
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Link to={'/articles'}>Статьи</Link>
        <Link to={`/articles/${id}`}>{article?.title!}</Link>
      </Breadcrumbs>
      {!article ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack direction={'column'} spacing={4} mt={4}>
          <Card elevation={0}>
            <CardMedia sx={{ height: 400 }} image={article.image} title="green iguana" />
            <CardContent>
              <Stack
                direction={'row'}
                spacing={4}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography gutterBottom variant="h4" component="div">
                  {article.title}
                </Typography>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Avatar src={article.psychologist.user.profile.image} />
                  <Typography>{article.psychologist.user.profile.name}</Typography>
                </Stack>
              </Stack>
            </CardContent>
            <CardContent>
              <Stack direction={'column'} spacing={4} alignItems={'flex-start'}>
                <Typography variant="body1" color="text.secondary">
                  {article.subtitle}
                </Typography>
              </Stack>
            </CardContent>
            <CardContent>
              <Stack direction={'column'} spacing={4} alignItems={'flex-start'}>
                <Typography variant="body1">
                  {article.description}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Container>
  );
};

export default ArticleDetailPage;
