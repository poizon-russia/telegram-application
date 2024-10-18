import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/src/shared/ui/input';
import { DialogHeader, DialogTitle } from '@/src/shared/ui/dialog';
import { Button } from '@/src/shared/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/src/shared/ui/form';
import { useSendTelegramCode } from '@/src/features/auth/hooks/useSendTelegramCode';
import { PhoneSchema } from '@/src/entities/auth/model/schema';
import type { PhoneForm as Phone } from '@/src/entities/auth/model/schema';

import css from '../emailModal/modal.module.scss';
interface EmailFormProps {
  onPhoneSent: (phone: string) => void;
}

const PhoneForm: React.FC<EmailFormProps> = ({ onPhoneSent }) => {
  const form = useForm<Phone>({
    resolver: zodResolver(PhoneSchema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });

  const { mutateAsync: sendTelegramCode } = useSendTelegramCode();

  const handlePhoneSubmit = (data: Phone) => {
    sendTelegramCode(data.phone, {
      onSuccess: () => {
        onPhoneSent(data.phone);
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePhoneSubmit)}
        className={css.content}
      >
        <DialogHeader>
          <DialogTitle>
            <h2 className={css.title}>
              Введите свой номер телефона, для продолжения
            </h2>
          </DialogTitle>
        </DialogHeader>
        <div className={css.getCode}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="+7 (999) 999 9999" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-black hover:bg-black/80 transition-all"
          >
            Получить код
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhoneForm;
