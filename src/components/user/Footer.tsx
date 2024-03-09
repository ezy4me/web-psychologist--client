import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Stack, Avatar } from '@mui/material';

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <MyLink to="/terms">Условия использования</MyLink>
              <MyLink to="/privacy">Политика конфиденциальности</MyLink>
              <MyLink to="/faq">Часто задаваемые вопросы</MyLink>
              <MyLink to="/support">Поддержка</MyLink>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <MyLink to="/about">О нас</MyLink>
              <MyLink to="/services">Услуги</MyLink>
              <MyLink to="/contact">Контакты</MyLink>
              <MyLink to="/blog">Блог</MyLink>
            </Stack>
          </Grid>
          <Stack spacing={2} direction={'column'} alignItems={'center'} height={120} width={120}>
            <Avatar
              alt="footer_logo"
              sx={{ width: 64, height: 64 }}
              src="/public/logo-monochrome.png"
            />
            <Typography variant="subtitle2" textAlign={'center'}>
              &copy; 2024, MindCare
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </FooterContainer>
  );
};

const MyLink = ({ to, children }: any) => (
  <Link to={to}>
    <Typography variant="body2" component="span">
      {children}
    </Typography>
  </Link>
);

import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem 0;
  background-color: #252525;
  color: #e0e0e0;
`;

export default Footer;
