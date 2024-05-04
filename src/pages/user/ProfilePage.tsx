import { ChangeEvent, useEffect, useState } from 'react';
import useProfileStore from '@/store/profileStore';
import useAuthStore from '@/store/authStore';
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Stack,
  CardMedia,
  Breadcrumbs,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const ProfilePage = () => {
  const navigate = useNavigate();

  const { user, onLogout } = useAuthStore((state) => ({
    user: state.user,
    onLogout: state.onLogout,
  }));

  const { profile, getUserProfile, updateUserProfile } = useProfileStore((state) => ({
    getUserProfile: state.getUserProfile,
    updateUserProfile: state.updateUserProfile,
    profile: state.profile,
  }));

  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string | Date>('');
  const [gender, setGender] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setBirthday(profile.birthday || '');
      setGender(profile.gender || '');
      setPhone(profile.phone || '');
      setImage(profile.image || '');
      setDescription(profile.description || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      getUserProfile(user.id);
    }
  }, []);

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

  const handleSaveProfile = async () => {
    console.log(profile?.id);
    
    await updateUserProfile({
      id: profile?.id,
      name,
      birthday: birthday?.toLocaleString() || '',
      gender,
      phone,
      description,
    });
  };

  const onHandleLogout = async () => {
    await onLogout().then(() => {
      navigate('/');
      location.reload();
    });
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={'/'}>Главная</Link>
        <Typography color="textPrimary">Личный кабинет</Typography>
      </Breadcrumbs>

      <Stack direction={'column'} spacing={4} mt={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Ваш профиль</Typography>
          <Button variant="contained" color="error" onClick={onHandleLogout}>
            Выйти
          </Button>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                alt="Profile Image"
                src={image ? image : '/public/images/profile.png'}
              />
              <CardContent>
                <Stack direction={'column'} spacing={2}>
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
                  <Button onClick={handleSaveProfile} variant="contained" color="primary">
                    Сохранить
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6}>
            <Stack direction={'column'} spacing={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Ваши записи</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="h6">Ваши тесты</Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
