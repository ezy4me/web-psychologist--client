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
  psychologist: Psychologist | null;
  chats: any;
};

type PsychologistActions = {
  getPsychologists: () => Promise<void>;
  getPsychologist: (id: number) => Promise<void>;
  getPsychologistChats: (id: number) => Promise<void>;
};

const usePsychologistStore = create<PsychologistState & PsychologistActions>((set) => ({
  psychologists: [],
  psychologist: null,
  chats: [],
  getPsychologists: async () => {
    try {
      const data = await PsychologistService.getPsychologists();
      set({ psychologists: data });
    } catch (error) {
      console.error('Error fetching psychologists data:', error);
    }
  },
  getPsychologist: async (id) => {
    try {
      const data = await PsychologistService.getPsychologist(id);
      set({ psychologist: data });
    } catch (error) {
      console.error('Error fetching psychologist data:', error);
    }
  },
  getPsychologistChats: async (id) => {
    try {
      const data = await PsychologistService.getPsychologistChats(id);
      set({ chats: data });
    } catch (error) {
      console.error('Error fetching psychologist chats data:', error);
    }
  },
}));

export default usePsychologistStore;
