import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { data } from '@data/ForPsychologist.json';
import { Link } from 'react-router-dom';
import TypingEffect from '@/components/common/TypingEffect';
import SectionTitle from '@/components/common/SectionTitlle';
import PsychologistSelection from '@/components/home/PsychologistSelection';
import QAndA from '@/components/home/QandA';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PsychologistRegForm from '@/components/auth/PsychologistRegForm';

type DataType = {
  title: string;
  text: string;
};

const ForPsychologistPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Typography color="textPrimary">Для психологов</Typography>
      </Breadcrumbs>

      <Stack direction={'column'} spacing={4} mt={4}>
        <Paper
          elevation={0}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
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
          <Button variant="contained" color="primary" startIcon={<LoginIcon />} onClick={openModal}>
            РЕГИСТРАЦИЯ ДЛЯ ПСИХОЛОГА
          </Button>
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
      </Stack>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            overflowY: 'scroll',
            minHeight: 400,
            maxHeight: 800,
            boxShadow: 24,
            minWidth: 300,
            maxWidth: 600,
          }}
        >
          <PsychologistRegForm closeModal={closeModal} />
        </Box>
      </Modal>
    </Container>
  );
};

export default ForPsychologistPage;
