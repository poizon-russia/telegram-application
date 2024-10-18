import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authService } from '@/src/entities/auth/services/auth.service';
import type { ServerError } from '@/src/shared/types/server-error';
import type { ApiResponse } from '@/src/entities/auth/model/types';

export const useSendTelegramCode = (): UseMutationResult<
  ApiResponse<null>,
  ServerError,
  string
> => {
  return useMutation<ApiResponse<null>, ServerError, string>({
    mutationFn: (phone: string) => authService.sendTelegramCode(phone),
    onMutate: () => {
      toast.loading('Отправка кода...', {
        position: 'top-right',
      });
    },
    onSuccess: (data) => {
      if (data.ok) {
        toast.success('Код был отправлен на ваш Telegram!', {
          position: 'top-right',
        });
      } else {
        toast.error('Произошла ошибка. Попробуйте снова.');
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Ошибка при отправке кода.',
      );
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
};
