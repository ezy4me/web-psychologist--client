import * as React from 'react';
import { useState, useEffect, useRef } from 'react'; // Добавлен useRef
import {
  Box,
  InputBase,
  Typography,
  Paper,
  Avatar,
  Grid,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import useAuthStore from '@/store/authStore';
import useChatStore from '@/store/chatStore';
import dayjs from 'dayjs';
import io from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_PUBLIC_API_URL;

const Chat = ({ patient }: any) => {
  const socket = io(`${SERVER_URL}`);
  const [isLoading, setLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Создание ссылки на DOM-элемент

  const { user } = useAuthStore();
  const { messages, chat, getUserChat, getMessages } = useChatStore();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await getUserChat(user.id, patient?.id);
      await getMessages(user.id, patient?.id);
      setLoading(false);
    };

    fetchData();

    return () => {
      socket.disconnect();
    };
  }, [patient]);

  useEffect(() => {
    const handleNewMessage = (msg: any) => {
      getMessages(user.id, patient?.id);
    };

    socket.on('recMessage', handleNewMessage);

    return () => {
      socket.off('recMessage', handleNewMessage);
    };
  }, [patient, messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', {
        text: message,
        userId: user.id,
        chatId: chat[0].id,
      });
      setMessage('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); // Прокрутка вниз
    }
  }, [messages]);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      {isLoading ? (
        <Box minHeight="100%" display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box minHeight="100%" flexGrow={1} overflow="auto" px={4} pt={2}>
          {messages.map((msg: any, index: number) => (
            <Box
              key={index}
              bgcolor={user.id === msg.message.userId ? '#2196f3' : '#3f51b5'}
              color="white"
              p={2}
              sx={{
                alignSelf: user.id === msg.message.userId ? 'flex-end' : 'flex-start',
                borderRadius: 8,
                maxWidth: '100%',
                mb: 2,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar>{msg.message.user.profile.name.charAt(0)}</Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle2">{msg.message.user.profile.name}</Typography>
                  <Typography variant="body1">{msg.message.text}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    {dayjs(new Date(msg.message.dateTime)).format('MM.DD | HH:mm')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
          {/* Создание пустого DIV для установки ссылки */}
          <div ref={messagesEndRef} />
        </Box>
      )}
      <Paper sx={{ marginTop: 2 }} elevation={2}>
        <Box padding={2} display="flex" alignItems="center">
          <InputBase
            fullWidth
            multiline
            placeholder="Введите сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            aria-label="send"
            color="primary"
            onClick={sendMessage}
            disabled={!message.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;
