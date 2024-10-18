'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Button } from '@/src/shared/ui/button';
import { Form, FormField, FormItem, FormControl } from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { handleKeyPress } from '@/src/shared/lib/form-utils';
import type { FieldErrors } from '@/src/shared/types/field-errors';
import { loginSchema } from '@/src/entities/auth/model/schema';
import { useFormErrors } from '@/src/shared/hooks/useFormErrors';
import { useLogin } from '@/src/features/auth/hooks/useLogin';

import css from './signInForm.module.scss';
import ModalTrigger from './_ui/emailModal/ModalTrigger';

type LoginFormValues = {
  account: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
    },
  });

  const { mutateAsync: login } = useLogin();
  const [isErrorsShown, setIsErrorsShown] = useState<boolean>(false);
  const errors: FieldErrors = form.formState.errors;
  useFormErrors(isErrorsShown, errors, setIsErrorsShown);

  const signIn = async ({ account, password }: LoginFormValues) => {
    await login({ account, password });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signIn)} className={css.form}>
        <p>Вход</p>
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Номер телефона / Логин"
                  {...field}
                  onKeyDown={handleKeyPress}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Пароль"
                  type="password"
                  {...field}
                  onKeyDown={handleKeyPress}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={() => setIsErrorsShown(true)}
          className="bg-active hover:bg-active/80"
        >
          Войти
        </Button>
        <div className={css.code}>
          <ModalTrigger />
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
