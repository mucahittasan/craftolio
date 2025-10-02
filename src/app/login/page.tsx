import { AuthLayout } from '@/features/auth/components/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';
import React from 'react';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
