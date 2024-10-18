import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isCodeSent: boolean;
  userPhone: string;
  setCodeSent: (isSent: boolean, phone?: string) => void;
  resetAuthState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isCodeSent: false,
      userPhone: '',
      setCodeSent: (isSent, phone = '') =>
        set({ isCodeSent: isSent, userPhone: phone }),
      resetAuthState: () => set({ isCodeSent: false, userPhone: '' }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
