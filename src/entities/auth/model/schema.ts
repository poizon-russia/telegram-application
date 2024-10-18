import type { ZodType } from 'zod';
import { z } from 'zod';

export type LoginForm = {
  phone: string;
  password: string;
};

export type ActivateCodeForm = {
  code: string;
};

export type PhoneForm = {
  phone: string;
};

export const loginSchema: ZodType<LoginForm> = z.object({
  phone: z
    .string()
    .min(1, { message: 'Номер телефона обязателен для заполнения.' })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Введите корректный номер телефона',
    }),
  password: z.string().min(1, 'Поле пароля обязательно для заполнения.'),
});

export const activateCodeSchema: ZodType<ActivateCodeForm> = z.object({
  code: z
    .string()
    .min(6, { message: 'Код должен содержать не менее 6 символов' })
    .max(6, { message: 'Код должен содержать не более 6 символов' }),
});

export const PhoneSchema: ZodType<PhoneForm> = z.object({
  phone: z
    .string()
    .min(1, { message: 'Номер телефона обязателен для заполнения.' })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: 'Введите корректный номер телефона',
    }),
});
