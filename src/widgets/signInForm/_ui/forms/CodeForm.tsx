import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/shared/ui/dialog';
import { Button } from '@/src/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/src/shared/ui/form';
import {
  activateCodeSchema,
  type ActivateCodeForm,
} from '@/src/entities/auth/model/schema';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/src/shared/ui/input-otp';
import { useActivateCode } from '@/src/features/auth/hooks/useActivateCode';
import { useSendTelegramCode } from '@/src/features/auth/hooks/useSendTelegramCode';

import css from '../emailModal/modal.module.scss';

interface CodeFormProps {
  phone: string;
}

const RESEND_TIMEOUT = 60;

const CodeForm: React.FC<CodeFormProps> = ({ phone }) => {
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const form = useForm<ActivateCodeForm>({
    resolver: zodResolver(activateCodeSchema),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  const { mutateAsync: activateCode } = useActivateCode();
  const { mutateAsync: sendTelegramCode } = useSendTelegramCode();

  const handleCodeSubmit = (data: ActivateCodeForm) => {
    activateCode(
      { phone, code: data.code },
      {
        onSuccess: () => {
          form.reset();
          console.log('Код успешно подтвержден!');
        },
      },
    );
  };

  const handleResendCode = () => {
    sendTelegramCode(phone, {
      onSuccess: () => {
        setTimer(RESEND_TIMEOUT);
        setIsResendEnabled(false);
      },
    });
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setIsResendEnabled(true);
    }

    return undefined;
  }, [timer]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCodeSubmit)}
        className={css.content}
      >
        <DialogHeader>
          <DialogTitle>
            <h2 className={css.title}>Введите код подтверждения</h2>
          </DialogTitle>
          <DialogDescription className={css.description}>
            Мы отправили код подтверждения на Теlegram, с номером {phone}.
            Пожалуйста, введите его в поле ниже.
          </DialogDescription>
        </DialogHeader>
        <div className={css.getCode}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex justify-center items-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-black hover:bg-black/80 transition-all"
          >
            Подтвердить код
          </Button>
        </div>

        <div className={css.resendCode}>
          {isResendEnabled ? (
            <Button
              type="button"
              variant={'ghost'}
              onClick={handleResendCode}
              className={css.resendBtn}
            >
              Получить новый код
            </Button>
          ) : (
            <p className={css.timerText}>
              Получить новый код можно через: {timer} сек.
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CodeForm;
