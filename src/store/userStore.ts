import { create } from 'zustand';
import { UserService } from '@/services/userService';

type User = {
  id: number;
  email: string;
  role: {
    name: string;
  };
};

type UserState = {
  users: Array<User>;
};

type UserActions = {
  getUsers: () => Promise<void>;
};

const useUserStore = create<UserState & UserActions>((set) => ({
  users: [],
  getUsers: async () => {
    try {
      const data = await UserService.getUsers();
      set({ users: data });
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  },
}));

export default useUserStore;
