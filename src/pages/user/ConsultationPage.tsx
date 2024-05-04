import {
  Breadcrumbs,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import usePsychologistStore from '@/store/psychologistStore';
import { useEffect, useState } from 'react';

const ConsultationPage = () => {
  const navigate = useNavigate();

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
                  <Typography variant="h5" component="h2">
                    {psychologist.user.profile.name}
                  </Typography>
                  <Typography color="textSecondary">{psychologist.education}</Typography>
                  <Typography variant="body2" component="p">
                    {psychologist.qualification}
                  </Typography>
                  <Button onClick={() => handleOpenChat(psychologist.id)}>Чат</Button>
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
