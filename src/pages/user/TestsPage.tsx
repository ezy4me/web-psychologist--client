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
import useTestStore from '@store/testStore';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { FaBrain, FaHouseUser, FaRegHandshake, FaBook } from 'react-icons/fa6';
import SectionTitle from '@/components/common/SectionTitlle';

const TestsPage = () => {
  const navigate = useNavigate();

  const { tests, getTests } = useTestStore((state) => ({
    tests: state.tests.filter((test) => test.isApproved),
    getTests: state.getTests,
  }));

  const fetchData = async () => {
    await getTests();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenTestPassing = (id: number) => {
    navigate(`/tests/${id}`);
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Typography color="textPrimary">Тесты</Typography>
      </Breadcrumbs>
      <Stack direction={'column'} spacing={4} mt={4}>
        <SectionTitle text="Зачем проводить психологические тесты ?" />
        <Typography variant="body1">
          Психологические тесты являются важным инструментом для изучения и понимания различных
          аспектов человеческой психики, поведения и личности. Они позволяют психологам и
          исследователям получить информацию о личностных особенностях, эмоциональном состоянии,
          склонностях и предпочтениях человека. Вот несколько причин, почему психологические тесты
          имеют важное значение:
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <Card elevation={0}>
              <CardContent>
                <Stack
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={2}
                >
                  <FaHouseUser color="#4ba8ff" size={64} />
                  <Typography textAlign={'center'} variant="h6">
                    Оценка личностных характеристик
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card elevation={0}>
              <CardContent>
                <Stack
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={2}
                >
                  <FaBrain color="#4ba8ff" size={64} />
                  <Typography textAlign={'center'} variant="h6">
                    Диагностика психологических состояний
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card elevation={0}>
              <CardContent>
                <Stack
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={2}
                >
                  <FaBook color="#4ba8ff" size={64} />
                  <Typography textAlign={'center'} variant="h6">
                    Профессиональная ориентация
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card elevation={0}>
              <CardContent>
                <Stack
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  spacing={2}
                >
                  <FaRegHandshake color="#4ba8ff" size={64} />
                  <Typography textAlign={'center'} variant="h6">
                    Развитие отношений
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid marginTop={4} container spacing={2}>
          {tests?.map((test, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{ cursor: 'pointer', height: '100%' }}
                onClick={() => handleOpenTestPassing(test.id)}
              >
                <CardMedia sx={{ height: 180 }} image={test.image} title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {test.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {test.subtitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Avatar src={test.psychologist.user.profile.image} />
                    <Typography>{test.psychologist.user.profile.name}</Typography>
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

export default TestsPage;
