import { auth } from '@/auth';
import { AuthLayout } from '@/features/auth/components/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';
import React from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Craftolio account to manage and update your professional portfolio.',
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
