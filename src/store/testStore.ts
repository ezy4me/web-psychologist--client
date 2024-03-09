import { create } from 'zustand';
import { TestService } from '@/services/testService';
import { Test, TestQuestion } from '@/types';

type TestState = {
  tests: Array<Test>;
  testQuestions: Array<TestQuestion>;
  result: string;
};

type TestActions = {
  getTests: () => Promise<void>;
  getTestQuestions: (testId: string) => Promise<void>;
  getPsychologistTests: (testId: string) => Promise<void>;
  getTestingResult: (testId: string, score: number) => Promise<void>;
  addTest: (dto: any) => Promise<void>;
  removeTest: (testId: string) => Promise<void>;
  clearResult: () => void;
};

const useTestStore = create<TestState & TestActions>((set) => ({
  tests: [],
  testQuestions: [],
  result: '',
  getTests: async () => {
    try {
      const data = await TestService.getTests();
      set({ tests: data });
    } catch (error) {
      console.error('Error fetching tests data:', error);
    }
  },
  getTestQuestions: async (testId) => {
    try {
      const data = await TestService.getTestQuestions(testId);
      set({ testQuestions: data });
    } catch (error) {
      console.error('Error fetching test questions data:', error);
    }
  },
  getTestingResult: async (testId, totalScore) => {
    try {
      const data = await TestService.getTestingResult(testId, totalScore);
      set({ result: data?.text });
    } catch (error) {
      console.error('Error fetching test questions data:', error);
    }
  },

  getPsychologistTests: async (id) => {
    try {
      const data = await TestService.getTestsByUserId(id);
      set({ tests: data });
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  addTest: async (dto) => {
    try {
      await TestService.addTest(dto);
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  removeTest: async (id) => {
    try {
      await TestService.removeTest(id);
    } catch (error) {
      console.error('Error fetching articles data:', error);
    }
  },

  clearResult: () => {
    set({ result: '' });
  },
}));

export default useTestStore;
