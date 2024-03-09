import {
  Avatar,
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { Link } from 'react-router-dom';


import { data } from '@data/HomePsychologist.json';
import PageImage from '@/components/common/PageImage';
import TypingEffect from '@/components/common/TypingEffect';
import SectionTitle from '@/components/common/SectionTitlle';
import PsychologistSelection from '@/components/home/PsychologistSelection';
import QAndA from '@/components/home/QandA';

type DataType = {
  request: string;
  imageUrl: string;
};

const HomePage = () => {
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
      </Breadcrumbs>

      <Stack direction={'column'} spacing={4} mt={4}>
        <PageImage $image="/public/images/main.jpg">
          <TypingEffect
            text="Добро пожаловать"
            typingDelay={100}
            erasingDelay={100}
            pauseDelay={1000}
          />
        </PageImage>

        <SectionTitle text="С чем поможет психолог ?" />

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {data.map((item: DataType, index: number) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <Card sx={{ height: '100%' }} elevation={0}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                  <Avatar
                    sx={{ width: 128, height: 128, marginBottom: 2 }}
                    src={item.imageUrl}
                    alt={item.imageUrl}
                  />
                </Stack>
                <CardContent>
                  <Typography textAlign={'center'} variant="h6">
                    {item.request}
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

export default HomePage;
