import { auth } from '@/auth';
import { AuthLayout } from '@/features/auth/components/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';
import React from 'react';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
