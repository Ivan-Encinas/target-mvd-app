import { z } from 'zod';
import { PASSWORD_REGEX } from 'constants/constants';

export const homeSchema = z.object({
  radius: z.string().min(1),
  title: z.string().min(1),
  topic_id: z.string().min(1),
});

export const profileSchema = z.object({
  current_password: z.string().min(1),
  password: z.string().min(1),
  password_confirmation: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Must provide an email' }),
  password: z.string().min(1, { message: 'Must provide a password' }),
});

export const signupSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email({ message: 'Must provide an email' }),
    gender: z.string().min(1),
    password: z.string().regex(PASSWORD_REGEX, {
      message: 'Password must have at least 8 characters, a letter and a number',
    }),
    passwordConfirmation: z.string().regex(PASSWORD_REGEX, {
      message: 'Password must have at least 8 characters, a letter and a number',
    }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Must provide an email' }),
});

export const contactSchema = z.object({
  email: z.string().min(1),
  body: z.string().min(1),
});
