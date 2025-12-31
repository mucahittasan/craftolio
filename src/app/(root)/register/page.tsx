import { auth } from '@/auth';
import { AuthLayout } from '@/features/auth/components/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';
import { redirect } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Create your free Craftolio account and build your professional portfolio in minutes. No coding required.',
};

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
