import * as React from 'react';
import {
  Container,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  Box,
  CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Avatar, Stack } from '@mui/material';
import Drawer from '@/components/common/dashboard/Drawer';
import AppBar from '@/components/common/dashboard/AppBar';
import { Outlet } from 'react-router-dom';
import { MainNavLinks, SecondaryNavLinks } from '@/components/psychologist/dashboard/NavList';

const PsychologistPage = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar elevation={0} position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Avatar alt="header_logo" src="/public/logo.png" sx={{ width: 40, height: 40 }} />
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              MindCare --- Психолог
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            bgcolor: '#2196F3',
          }}
        >
          <IconButton color="inherit" onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <List component="nav">
          <MainNavLinks />
          <Divider sx={{ my: 1 }} />
          <SecondaryNavLinks />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? '#fafafa' : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default PsychologistPage;
