import { ProfileService } from '@/services/profileService';
import { create } from 'zustand';

type Profile = {
  id: number;
  name: string;
  phone: string;
  gender: string;
  birthday: string;
  description: string;
  image: string;
  userId: number;
};

type ProfileState = {
  profile: Profile | null;
};

type ProfileActions = {
  getUserProfile: (userId: number) => Promise<void>;
  updateUserProfile: (profile: Partial<Profile>) => Promise<void>;
};

const getValueFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  profile: getValueFromLocalStorage('profile'),
  getUserProfile: async (userId) => {
    try {
      const data = await ProfileService.getUserProfile(userId);

      localStorage.setItem('profile', JSON.stringify(data));

      set({ profile: data });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  },
  updateUserProfile: async (profile) => {
    try {
      const data = await ProfileService.updateUserProfile(profile);
      set({ profile: data });
    } catch (error) {
      console.error('Error to update profile data:', error);
    }
  },
}));

export default useProfileStore;
