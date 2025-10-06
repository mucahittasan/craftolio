import { auth } from '@/auth';
import { AuthLayout } from '@/features/auth/components/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
}
