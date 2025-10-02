import { ProfileForm } from '@/features/builder/components/profile-form';
import React from 'react';

export default function ProfilePage() {
  return (
    <div className="relative">
      <h1 className="mb-2 text-3xl font-bold">Personal Information</h1>
      <p className="mb-8 text-muted-foreground">
        This information will be displayed publicly on your portfolio page.
      </p>
      <ProfileForm />
    </div>
  );
}
