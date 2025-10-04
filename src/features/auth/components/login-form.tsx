'use client';

import { useFormStatus } from 'react-dom';
import { Input } from '@/features/shared/components/ui/input';
import { Button } from '@/features/shared/components/ui/button';
import Link from 'next/link';
import { Label } from '@/features/shared/components/ui/label';
import { login, LoginState } from '@/features/auth/actions/login.action';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import React, { useState, useActionState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="text-md group w-full bg-foreground font-semibold text-background hover:bg-foreground/90"
      aria-disabled={pending}
    >
      {pending ? 'Signing In...' : 'Sign In'}
      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  );
}

export function LoginForm() {
  const initialState: LoginState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white/10 p-8 shadow-2xl backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your details to access your account.
        </p>
      </div>

      <form action={dispatch} className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              required
              className="h-12 bg-transparent pl-10 focus-visible:ring-primary"
            />
          </div>
          {state.errors?.email && (
            <p className="text-sm font-medium text-destructive">
              {state.errors.email}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              required
              className="h-12 bg-transparent px-10 focus-visible:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-muted-foreground hover:text-primary"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {state.errors?.password && (
            <p className="text-sm font-medium text-destructive">
              {state.errors.password}
            </p>
          )}
        </div>

        {state.message && (
          <p className="pt-2 text-center text-sm font-medium text-destructive">
            {state.message}
          </p>
        )}

        <div className="pt-4">
          <SubmitButton />
        </div>
      </form>
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          Don&apos;t have an account?{' '}
        </span>
        <Link
          href="/register"
          className="font-semibold text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
