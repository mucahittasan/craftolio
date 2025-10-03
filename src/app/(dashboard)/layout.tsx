import { Sidebar } from '@/features/builder/components/sidebar';
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
    <div className="relative flex min-h-screen">
      <Sidebar user={session.user} />
      <div className="absolute bottom-[0%] right-[10%] h-[200px] w-[200px] bg-gradient-to-tr from-[#9c40ff] to-[#ffaa40] blur-[220px]" />
      <main className="relative flex-1 p-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-black dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)]"></div>
        <Suspense fallback={<FormSkeleton />}>
          <PortfolioLoader>{children}</PortfolioLoader>
        </Suspense>
      </main>
    </div>
  );
}
