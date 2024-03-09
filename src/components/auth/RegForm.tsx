import { useState, ChangeEvent } from 'react';
import { Card, CardContent, Typography, TextField, Button, MenuItem, Stack } from '@mui/material';
import useAuthStore from '@/store/authStore';

interface RegFormProps {
  closeModal?: () => void;
}

const RegForm = ({ closeModal }: RegFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roleId, setRoleId] = useState<number>(0);

  const { onRegister } = useAuthStore((state) => ({
    onRegister: state.onRegister,
  }));

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRoleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoleId(Number(e.target.value));
  };

  const handleRegister = async () => {
    await onRegister(email, password, password, roleId).then(() => {
      if (closeModal) closeModal();
    });
  };

  return (
    <Card sx={{ width: 320, boxShadow: 0, padding: 2 }}>
      <CardContent>
        <Stack alignItems={'center'} spacing={4}>
          <Typography variant="h5">Регистрация</Typography>
          <TextField
            variant="standard"
            label="Email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Пароль"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField
            variant="standard"
            select
            label="Кто вы?"
            value={roleId}
            onChange={handleRoleIdChange}
            fullWidth
          >
            <MenuItem value={2}>Пациент</MenuItem>
            <MenuItem value={3}>Психолог</MenuItem>
          </TextField>
          <Button fullWidth variant="contained" onClick={handleRegister}>
            Зарегистрироваться
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RegForm;
