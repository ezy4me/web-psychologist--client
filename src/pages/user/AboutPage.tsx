import PageImage from '@/components/common/PageImage';
import { Breadcrumbs, Container, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Link to={'/about'}>О нас</Link>
      </Breadcrumbs>
      <Stack direction={'column'} spacing={4} mt={4}>
        <PageImage $image="/public/images/about.jpg">
          <Paper
            elevation={0}
            sx={{
              paddingRight: 4,
              paddingLeft: 4,
              width: '100%',
              bgcolor: '#ffffffba',
            }}
          >
            <Typography textAlign={'center'} fontWeight={700} fontSize={40}>
              О нас
            </Typography>
          </Paper>
        </PageImage>
        <Typography textAlign={'center'} fontWeight={700} fontSize={40}>
          in dev progress...
        </Typography>
      </Stack>
    </Container>
  );
};

export default AboutPage;
