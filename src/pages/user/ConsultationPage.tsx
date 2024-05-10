import {
  Breadcrumbs,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import usePsychologistStore from '@/store/psychologistStore';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';

const ConsultationPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const [isLoading, setLoading] = useState<boolean>(false);
  const { getPsychologists, psychologists } = usePsychologistStore((state) => ({
    getPsychologists: state.getPsychologists,
    psychologists: state.psychologists,
  }));

  const fetchData = async () => {
    setLoading(true);
    await getPsychologists();
    setLoading(false);
  };

  const handleOpenChat = (id: number) => {
    navigate(`/chat/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [psychologists]);

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Typography color="textPrimary">Консультация</Typography>
      </Breadcrumbs>
      <Grid container spacing={3} mt={3}>
        {isLoading || !psychologists ? (
          <CircularProgress />
        ) : (
          psychologists.map((psychologist) => (
            <Grid item key={psychologist.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Stack my={1} direction={'row'} gap={1} alignItems={'center'}>
                    <Avatar>{psychologist.user.profile.name.charAt(0)}</Avatar>
                    <Typography variant="h6" component="h2">
                      {psychologist.user.profile.name}
                    </Typography>
                  </Stack>

                  <Divider />
                  <Typography my={1}>О специалисте:</Typography>
                  <Divider />
                  <Typography color="textSecondary">{psychologist.education}</Typography>
                  <Typography variant="body1" component="p">
                    {psychologist.qualification}
                  </Typography>
                  <Typography fontWeight={'bold'} variant="body1" component="p">
                    Стаж: {psychologist.experience}
                  </Typography>
                  <Divider />
                  {user ? (
                    <Button onClick={() => handleOpenChat(psychologist.id)}>Чат</Button>
                  ) : (
                    <Typography my={1} textAlign={'center'} color={'#59b4ff'}>
                      Для консультации требуется авторизация
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ConsultationPage;
