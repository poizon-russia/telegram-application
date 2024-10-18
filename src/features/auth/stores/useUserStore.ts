import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { authService } from '@/src/entities/auth/services/auth.service';
import type { Customer } from '@/src/entities/auth/model/userTypes';
import { removeFromStorage } from '@/src/entities/auth/services/token.service';

interface UserState {
  user: Customer | null;
  setUser: (user: Customer | null) => void;
  logout: () => Promise<void>;
  getUser: () => Customer | null;
  updateIsPassword: (isPassword: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateIsPassword: (isPassword: boolean) => {
        const user = get().user;
        if (user) {
          set({
            user: {
              ...user,
              isPassword,
            },
          });
        }
      },
      logout: async () => {
        try {
          await authService.logout();
          set({ user: null });
          removeFromStorage();
        } catch (error) {
          console.error('User logout failed:', error);
        }
      },
      getUser: () => get().user,
    }),
    {
      name: 'user-storage',
    },
  ),
);
