import { useState, ChangeEvent, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import useAuthStore from '@/store/authStore';
import useProfileStore from '@/store/profileStore';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { showNotification } from '@/utils/notification';

interface RegFormProps {
  closeModal?: () => void;
}

const PsychologistRegForm = ({ closeModal }: RegFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const [experience, setExperience] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string | Date>('');
  const [gender, setGender] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const { onPsychologistRegister } = useAuthStore((state) => ({
    onPsychologistRegister: state.onPsychologistRegister,
  }));

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEducationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEducation(e.target.value);
  };

  const handleQualificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQualification(e.target.value);
  };

  const handleExperienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExperience(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthdayChange = (date: string | null | Date) => {
    if (date instanceof Date) {
      setBirthday(date);
    } else if (date) {
      setBirthday(dayjs(date).toDate().toISOString());
    }
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const validateForm = () => {
    if (
      !email ||
      !password ||
      !education ||
      !qualification ||
      !experience ||
      !name ||
      !birthday ||
      !gender ||
      !phone ||
      !description
    ) {
      showNotification({
        title: 'Регистрация',
        text: `Пожалуйста заполните все поля формы`,
        icon: 'error',
      });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    await onPsychologistRegister(
      email,
      password,
      password,
      3,
      education,
      qualification,
      experience,
      { name, birthday: birthday?.toLocaleString() || '', gender, phone, description },
    ).then(() => {
      if (closeModal) closeModal();
    });
  };

  return (
    <Card sx={{ boxShadow: 0, padding: 2 }}>
      <CardContent>
        <Stack alignItems={'center'} spacing={4}>
          <Typography variant="h5">Регистрация как психолог</Typography>
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
            label="Ваше образование"
            placeholder="Образование"
            type="text"
            value={education}
            onChange={handleEducationChange}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Квалификация"
            placeholder="Квалификация"
            type="text"
            value={qualification}
            onChange={handleQualificationChange}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Опыт работы"
            placeholder="Опыт работы"
            type="text"
            value={experience}
            onChange={handleExperienceChange}
            fullWidth
          />
          <Typography variant="h6">Личные данные</Typography>
          <TextField
            variant="standard"
            label="Имя"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
          <DatePicker
            label="Дата рождения"
            shouldRespectLeadingZeros
            //@ts-ignore
            value={dayjs(birthday)}
            onChange={handleBirthdayChange}
          />
          <TextField
            variant="standard"
            label="Пол"
            value={gender}
            onChange={handleGenderChange}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Телефон"
            value={phone}
            onChange={handlePhoneChange}
            fullWidth
          />
          <TextField
            variant="standard"
            label="О себе"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
          />
          <Button fullWidth variant="contained" onClick={handleRegister}>
            Зарегистрироваться
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PsychologistRegForm;
