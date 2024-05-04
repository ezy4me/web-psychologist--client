import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QuizIcon from '@mui/icons-material/Quiz';
import ArticleIcon from '@mui/icons-material/Article';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import ChatIcon from '@mui/icons-material/Chat';
interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  primary: string;
}

const MainNavLinks = () => {
  return (
    <>
      <NavLink to="/psychologist/articles" icon={<ArticleIcon />} primary="Статьи" />
      <NavLink to="/psychologist/tests" icon={<QuizIcon />} primary="Тесты" />
      <NavLink to="/psychologist/chats" icon={<ChatIcon />} primary="Чаты" />
    </>
  );
};

const SecondaryNavLinks = () => {
  const { onLogout } = useAuthStore();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <ExitToAppIcon color="error" />
      </ListItemIcon>
      <ListItemText primary="Выход" />
    </ListItemButton>
  );
};

const NavLink = ({ to, icon, primary }: NavLinkProps) => {
  return (
    <ListItemButton component={Link} to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};

export { MainNavLinks, SecondaryNavLinks };
