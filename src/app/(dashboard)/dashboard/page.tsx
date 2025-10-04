import { ProfileForm } from '@/features/builder/components/profile-form';
import React from 'react';

export default function ProfilePage() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
        Personal Information
      </h1>
      <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
        This information will be displayed publicly on your portfolio page.
      </p>
      <ProfileForm />
    </div>
  );
}
