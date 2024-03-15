import { Container, Typography, Stack, Avatar } from '@mui/material';

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Stack direction={'row'} justifyContent={'center'} spacing={4}>
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

import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem 0;
  background-color: #252525;
  color: #e0e0e0;
`;

export default Footer;
