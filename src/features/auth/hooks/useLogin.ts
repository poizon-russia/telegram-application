import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { ServerError } from '@/src/shared/types/server-error';
import { PRIVATE_URL } from '@/src/config/url.config';
import type { AuthResponse } from '@/src/entities/auth/model/userTypes';
import { authService } from '@/src/entities/auth/services/auth.service';
import { saveToStorage } from '@/src/entities/auth/services/token.service';

import { useUserStore } from '../stores/useUserStore';

interface LoginData {
  account: string;
  password: string;
}

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginData
> => {
  const router = useRouter();

  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      const { account, password } = data;
      const isPhone = phoneRegex.test(account);
      const payload = isPhone
        ? { phone: account, password }
        : { login: account, password };

      return authService.login(payload);
    },
    onMutate: () => {
      toast.loading('Авторизация...', { position: 'top-right' });
    },
    onSuccess: (data) => {
      if (data.result.token) {
        saveToStorage({ accessToken: data.result.token });

        if ('customer' in data.result) {
          useUserStore.getState().setUser(data.result.customer);
          router.push(PRIVATE_URL.profileOrders());
        }
        toast.success('Вы успешно авторизовались!', { position: 'top-right' });
      }
    },
    onError: (error: ServerError) => {
      const errorMessage =
        error?.response?.data?.message || 'Ошибка входа. Попробуйте снова.';
      toast.error(errorMessage, { position: 'top-right' });
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};
