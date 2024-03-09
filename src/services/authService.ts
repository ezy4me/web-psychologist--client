import { apiInstance } from '.';
import { showNotification } from '@/utils/notification';

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await apiInstance.post('auth/login', {
        email,
        password,
      });

      showNotification({
        title: 'Авторизация',
        text: 'Успешно',
        icon: 'success',
      });

      return response.data;
    } catch (error: any) {
      showNotification({
        title: 'Авторизация',
        text: `${error?.response?.data?.message || 'Ошибка при авторизации'}`,
        icon: 'error',
      });
      throw error;
    }
  },

  async register(email: string, password: string, passwordRepeat: string, roleId: number) {
    try {
      const response = await apiInstance.post('auth/register', {
        email,
        password,
        passwordRepeat,
        roleId,
      });

      showNotification({
        title: 'Регистрация',
        text: 'Успешно',
        icon: 'success',
      });

      return response.data;
    } catch (error: any) {
      showNotification({
        title: 'Регистрация',
        text: `${error?.response?.data?.message || 'Ошибка при авторизации'}`,
        icon: 'error',
      });
      throw error;
    }
  },
};
