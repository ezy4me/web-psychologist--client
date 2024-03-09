import {
  Avatar,
  Breadcrumbs,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useArticleStore from '../../store/articleStore';
import Grid from '@mui/material/Unstable_Grid2';
import SectionTitle from '@/components/common/SectionTitlle';

const ArticlesPage = () => {
  const navigate = useNavigate();
  const { articles, getArticles } = useArticleStore((state) => ({
    articles: state.articles,
    getArticles: state.getArticles,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getArticles();
  };

  const handleOpenArticleDetail = (id: number) => {
    navigate(`/articles/${id}`);
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Link to={'/articles'}>Статьи</Link>
      </Breadcrumbs>
      <Stack direction={'column'} spacing={4} mt={4}>
        <SectionTitle text="Последние статьи" />
        <Grid container spacing={2}>
          {articles?.map((article, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleOpenArticleDetail(article.id)}
                sx={{ cursor: 'pointer', height: '100%' }}
              >
                <CardMedia sx={{ height: 180 }} image={article.image} title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.subtitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Avatar src={article.psychologist.user.profile.image} />
                    <Typography>{article.psychologist.user.profile.name}</Typography>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default ArticlesPage;
