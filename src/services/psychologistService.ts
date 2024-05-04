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

  async getPsychologist(id: number) {
    try {
      const response = await authInstance.get(`psychologist/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getPsychologistChats(id: number) {
    try {
      const response = await authInstance.get(`psychologist/chat/${id}`);
      
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
