import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Container,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import { Box, Grid } from '@mui/material';
import useAuthStore from '@store/authStore';
import LoginIcon from '@mui/icons-material/Login';
import AuthForm from '@/components/auth/AuthForm';
import RegForm from '@/components/auth/RegForm';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAuthForm, setIsAuthForm] = useState<boolean>(true);

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) setIsAuth(true);
  }, [user]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleForm = () => {
    setIsAuthForm((prev) => !prev);
  };

  return (
    <AppBar elevation={0} position="static">
      <Container sx={{ py: 1 }}>
        <Toolbar style={{ padding: 0 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Link to={'/'}>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Avatar alt="header_logo" src="/public/logo.png" sx={{ width: 64, height: 64 }} />
                <Typography variant="h5" component="div">
                  MindCare
                </Typography>
              </Stack>
            </Link>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Link to={'/consultation'} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Консультация</Button>
              </Link>
              <Link to={'/tests'} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Тесты</Button>
              </Link>
              <Link to={'/articles'} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Статьи</Button>
              </Link>
              <Link to={'/for-psychologist'} style={{ textDecoration: 'none' }}>
                <Button color="inherit">Для психологов</Button>
              </Link>

              <Divider flexItem orientation="vertical" />

              {!isAuth ? (
                <Button color="inherit" startIcon={<LoginIcon />} onClick={openModal}>
                  Войти
                </Button>
              ) : (
                <Link to={'/profile'}>{user?.email}</Link>
              )}
            </Stack>
          </Grid>
        </Toolbar>
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              minWidth: 320,
              maxWidth: 400,
            }}
          >
            {isAuthForm ? (
              <AuthForm closeModal={closeModal} />
            ) : (
              <RegForm closeModal={closeModal} />
            )}
            <Stack alignItems={'center'} pb={2}>
              <Button onClick={toggleForm}>{isAuthForm ? 'Регистрация' : 'Авторизация'}</Button>
            </Stack>
          </Box>
        </Modal>
      </Container>
    </AppBar>
  );
};

export default Header;
