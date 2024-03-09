import { authInstance } from '.';

export const UserService = {
  async getUsers() {
    try {
      const response = await authInstance.get('user');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
