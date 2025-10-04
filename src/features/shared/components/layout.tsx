import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-background min-h-screen font-sans antialiased">
      <main>{children}</main>
    </div>
  );
}
