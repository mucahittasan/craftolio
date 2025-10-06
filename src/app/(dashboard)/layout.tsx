import { Sidebar } from '@/features/builder/components/sidebar';
import { MobileToggle } from '@/features/shared/components/sidebar/mobile-toggle';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { PortfolioLoader } from '@/features/builder/components/portfolio-loader';
import { Suspense } from 'react';
import { FormSkeleton } from '@/features/builder/components/form-skeleton';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="relative flex min-h-screen bg-background">
      <Sidebar user={session.user} />
      <MobileToggle />
      <div className="absolute bottom-[0%] right-[10%] z-10 h-[250px] w-[250px] bg-gradient-to-tr from-[#9c40ff] to-[#ffaa40] blur-[220px]" />
      <main className="relative flex-1 p-4 sm:p-8">
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-background dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)]" />
        <div className="relative z-10">
          <Suspense fallback={<FormSkeleton />}>
            <PortfolioLoader>{children}</PortfolioLoader>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
