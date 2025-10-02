import { ProfileForm } from '@/features/builder/components/profile-form';
import React from 'react';

export default function ProfilePage() {
  return (
    <div className="relative">
      <div className="absolute right-[10%] top-[100%] h-[200px] w-[200px] bg-gradient-to-tr from-[#9c40ff] to-[#ffaa40] blur-[220px]" />
      <h1 className="mb-2 text-3xl font-bold">Personal Information</h1>
      <p className="mb-8 text-muted-foreground">
        This information will be displayed publicly on your portfolio page.
      </p>
      <ProfileForm />
    </div>
  );
}
