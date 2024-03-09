import { authInstance } from '.';

export const PsychologistService = {
  async getPsychologists() {
    try {
      const response = await authInstance.get('psychologist');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
