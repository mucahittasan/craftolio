'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .max(30, 'Username must be at most 30 characters.')
    .regex(/^[a-zA-Z0-9_\.]+$/, 'Only letters, numbers, dot and underscore.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export type RegisterState = {
  errors?: {
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function register(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Account.',
    };
  }

  const { name, username, email, password } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { message: 'Email already in use.' };
    }

    // Check username uniqueness (case-insensitive)
    const existingUsername = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: { id: true },
    });
    if (existingUsername) {
      return { message: 'Username already taken.' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        hashedPassword,
      },
    });

    // Otomatik giriş yap
    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/dashboard',
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          message:
            'Account created but auto-login failed. Please login manually.',
        };
      }
      throw error;
    }
  } catch (error) {
    // Prisma hataları için
    if (error instanceof AuthError) {
      throw error;
    }
    return { message: 'Database Error: Failed to Create Account.' };
  }

  // Bu satıra normalde ulaşılmaz çünkü signIn redirect yapar
  return { message: null };
}
