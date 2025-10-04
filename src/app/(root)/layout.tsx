import { Layout } from '@/features/shared/components/layout';
import { Header } from '@/features/landing/components/header';
import { Footer } from '@/features/landing/components/footer';

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Layout>
      <Header />
      <main className="min-h-[calc(100vh-144px)]">{children}</main>
      <Footer />
    </Layout>
  );
}
