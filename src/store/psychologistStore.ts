import { create } from 'zustand';
import { PsychologistService } from '@/services/psychologistService';

interface Psychologist {
  id: number;
  education: string;
  qualification: string;
  experience: string;
  userId: number;
  user: {
    email: string;
    profile: {
      name: string;
      phone: string;
      gender: string;
      birthday: string;
      image: string;
    };
  };
}

type PsychologistState = {
  psychologists: Array<Psychologist>;
};

type PsychologistActions = {
  getPsychologists: () => Promise<void>;
};

const usePsychologistStore = create<PsychologistState & PsychologistActions>((set) => ({
  psychologists: [],
  getPsychologists: async () => {
    try {
      const data = await PsychologistService.getPsychologists();
      set({ psychologists: data });
    } catch (error) {
      console.error('Error fetching psychologists data:', error);
    }
  },
}));

export default usePsychologistStore;
