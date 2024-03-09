import { Breadcrumbs, Card, CardContent, Container, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { data } from '@data/ForPsychologist.json';
import { Link } from 'react-router-dom';
import TypingEffect from '@/components/common/TypingEffect';
import SectionTitle from '@/components/common/SectionTitlle';
import PsychologistSelection from '@/components/home/PsychologistSelection';
import QAndA from '@/components/home/QandA';

type DataType = {
  title: string;
  text: string;
};

const ForPsychologistPage = () => {
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Link to={'/for-psychologist'}>Для психологов</Link>
      </Breadcrumbs>

      <Stack direction={'column'} spacing={4} mt={4}>
        <Paper
          elevation={0}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0084ff39',
            height: 200,
          }}
        >
          <TypingEffect
            text="Для психологов"
            typingDelay={100}
            erasingDelay={100}
            pauseDelay={1000}
          />
        </Paper>

        <SectionTitle text="Ждём от вас" />

        <Grid container spacing={2}>
          {data.map((item: DataType, index: number) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <Card sx={{ height: '100%' }} elevation={0}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <Typography textAlign={'center'} variant="h6" fontWeight={600} color={'#38a5ff'}>
                    {item.title}
                  </Typography>
                </Stack>
                <CardContent>
                  <Typography textAlign={'center'} variant="body1">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <SectionTitle text="Как мы отбираем психологов ?" />
        <PsychologistSelection />

        <SectionTitle text="Часто задаваемые вопросы" />
        <QAndA />
      </Stack>
    </Container>
  );
};

export default ForPsychologistPage;
