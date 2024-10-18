import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { authService } from '@/src/entities/auth/services/auth.service';
import type { ServerError } from '@/src/shared/types/server-error';
import type { AuthResponse } from '@/src/entities/auth/model/userTypes';
import { PRIVATE_URL } from '@/src/config/url.config';
import { saveToStorage } from '@/src/entities/auth/services/token.service';

import { useUserStore } from '../stores/useUserStore';
import { useAuthStore } from '../stores/useAuthStore';

export const useActivateCode = (): UseMutationResult<
  AuthResponse,
  ServerError,
  { phone: string; code: string },
  unknown
> => {
  const router = useRouter();

  return useMutation<
    AuthResponse,
    ServerError,
    { phone: string; code: string }
  >({
    mutationFn: (data) => authService.activateCode(data),
    onMutate: () => {
      toast.loading('Подтверждение кода...', { position: 'top-right' });
    },
    onSuccess: (data) => {
      if (data.ok) {
        saveToStorage({ accessToken: data.result.token });
        useUserStore.getState().setUser(data.result.customer);
        useAuthStore.getState().resetAuthState();

        toast.success('Код успешно подтвержден!', { position: 'top-right' });
        router.push(PRIVATE_URL.profileOrders());
      } else {
        toast.error('Ошибка при подтверждении кода.');
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Ошибка при подтверждении кода.',
      );
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};
