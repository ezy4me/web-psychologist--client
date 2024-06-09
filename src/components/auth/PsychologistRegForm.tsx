import { useState, ChangeEvent } from 'react';
import { Card, CardContent, Typography, TextField, Button, Stack, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Alert } from '@mui/material';
import useAuthStore from '@/store/authStore';
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
  const [error, setError] = useState<string | null>(null);

  const { onPsychologistRegister } = useAuthStore((state) => ({
    onPsychologistRegister: state.onPsychologistRegister,
  }));

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEducationChange = (e: SelectChangeEvent<string>) => {
    setEducation(e.target.value as string);
  };

  const handleQualificationChange = (e: SelectChangeEvent<string>) => {
    setQualification(e.target.value as string);
  };

  const handleExperienceChange = (e: SelectChangeEvent<string>) => {
    setExperience(e.target.value as string);
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

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    setGender(e.target.value as string);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const isValidEmail = (email: string) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const hasNoSpaces = (str: string) => {
    return !/\s/.test(str);
  };

  const calculateAge = (birthday: Date) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    if (!email || !password || !education || !qualification || !experience || !name || !birthday || !gender || !phone || !description) {
      setError('Пожалуйста, заполните все поля формы.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setError('Неверный формат email или email содержит пробелы.');
      return;
    }

    if (!hasNoSpaces(password)) {
      setError('Пароль не должен содержать пробелы.');
      return;
    }

    const age = calculateAge(new Date(birthday));
    if (age < 18) {
      setError('Вы должны быть старше 18 лет для регистрации.');
      return;
    }

    if (!validateForm()) return;

    try {
      await onPsychologistRegister(
        email,
        password,
        password,
        3,
        education,
        qualification,
        experience,
        { name, birthday: birthday?.toLocaleString() || '', gender, phone, description }
      );
      if (closeModal) closeModal();
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
    }
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
          <FormControl fullWidth>
            <InputLabel id="education-label">Ваше образование</InputLabel>
            <Select
              labelId="education-label"
              id="education"
              value={education}
              onChange={handleEducationChange}
              variant="standard"
            >
              <MenuItem value="Бакалавр">Бакалавр</MenuItem>
              <MenuItem value="Магистр">Магистр</MenuItem>
              <MenuItem value="Доктор наук">Доктор наук</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="qualification-label">Квалификация</InputLabel>
            <Select
              labelId="qualification-label"
              id="qualification"
              value={qualification}
              onChange={handleQualificationChange}
              variant="standard"
            >
              <MenuItem value="Стажер">Стажер</MenuItem>
              <MenuItem value="Лицензированный">Лицензированный</MenuItem>
              <MenuItem value="Сертифицированный">Сертифицированный</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="experience-label">Опыт работы</InputLabel>
            <Select
              labelId="experience-label"
              id="experience"
              value={experience}
              onChange={handleExperienceChange}
              variant="standard"
            >
              <MenuItem value="1-3 года">1-3 года</MenuItem>
              <MenuItem value="3-5 лет">3-5 лет</MenuItem>
              <MenuItem value="5+ лет">5+ лет</MenuItem>
            </Select>
          </FormControl>
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
            //@ts-ignore
            value={dayjs(birthday)}
            onChange={handleBirthdayChange}
            disableFuture
            renderInput={(params: any) => (
              <TextField
                {...params}
                fullWidth
              />
            )}
          />
          <FormControl fullWidth>
            <InputLabel id="gender-label">Пол</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              variant="standard"
            >
              <MenuItem value="Мужской">Мужской</MenuItem>
              <MenuItem value="Женский">Женский</MenuItem>
            </Select>
          </FormControl>
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
          {error && <Alert severity="error">{error}</Alert>}
          <Button fullWidth variant="contained" onClick={handleRegister}>
            Зарегистрироваться
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PsychologistRegForm;
