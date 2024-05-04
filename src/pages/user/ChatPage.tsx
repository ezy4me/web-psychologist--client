import Chat from '@/components/user/Chat';
import usePsychologistStore from '@/store/psychologistStore';
import { Container, Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();

  const { getPsychologist, psychologist } = usePsychologistStore((state) => ({
    getPsychologist: state.getPsychologist,
    psychologist: state.psychologist,
  }));

  useEffect(() => {
    if (id) getPsychologist(parseInt(id));
  }, [id]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Окно чата
      </Typography>
      <Box height={'400px'} display="flex" flexDirection="column" gap={2}>
        {psychologist && <Chat psychologist={psychologist} />}
      </Box>
    </Container>
  );
};

export default ChatPage;
