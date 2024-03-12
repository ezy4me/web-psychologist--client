import { apiInstance, authInstance, formDataInstance } from '.';

export const TestService = {
  async getTests() {
    try {
      const response = await apiInstance.get('test');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getTestQuestions(testId: string) {
    try {
      const response = await apiInstance.get(`test-question/${testId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getTestingResult(testId: string, score?: number) {
    try {
      const response = await authInstance.get(`result/test/${testId}?score=${score}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getTestsByUserId(id: string) {
    try {
      const response = await authInstance.get(`test/user/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getOneTest(id: string) {
    try {
      const response = await authInstance.get(`test/data/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addTest(dto: any) {
    try {
      console.log(dto);

      const response = await authInstance.post(`test`, { ...dto });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateTest(id: string, dto: any) {
    try {
      const response = await authInstance.put(`test/${id}`, {
        ...dto,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async removeTest(id: string) {
    try {
      const response = await authInstance.delete(`test/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
