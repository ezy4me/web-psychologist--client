import { authInstance } from ".";

export const ChatAPI = {
  async getMessages(psychologistId: number, patientId: number) {
    try {
      const response = await authInstance.get(
        `chat?psychologistId=${psychologistId}&patientId=${patientId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch chat messages.");
    }
  },

  async getUserChat(psychologistId: number, patientId: number) {
    try {
      const response = await authInstance.get(
        `chat/user?psychologistId=${psychologistId}&patientId=${patientId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch chat messages.");
    }
  },
};
