import Image from 'next/image';
import React from 'react';

interface Props {
  name: string | null;
  title: string | null | undefined;
  location: string | null | undefined;
  avatarUrl: string | null | undefined;
}

export function PortfolioHeader({ name, title, location, avatarUrl }: Props) {
  return (
    <header className="flex items-center space-x-6">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={
            avatarUrl ||
            `https://ui-avatars.com/api/?name=${name}&background=random`
          }
          alt={name || 'User Avatar'}
          className="rounded-full object-cover"
          fill
        />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">{name}</h1>
        <p className="mt-1 text-xl text-muted-foreground">{title}</p>
        {location && (
          <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        )}
      </div>
    </header>
  );
}
