import { AuthLayout } from '@/features/auth/components/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';
import React from 'react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
}
