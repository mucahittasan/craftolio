import { auth } from '@/auth'; // auth.ts'den auth fonksiyonunu çekiyoruz
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">
        Welcome to your Dashboard, {session.user.name}!
      </h1>
      <p className="text-muted-foreground">This is a protected page.</p>
    </div>
  );
}
