import { Footer } from '@/features/landing/components/footer';
import { Header } from '@/features/landing/components/header';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
