import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/features/shared/components/ui/button';

type EmptyPortfolioStateProps = {
  ctaHref?: string;
};

export function EmptyPortfolioState({
  ctaHref = '/dashboard',
}: EmptyPortfolioStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-blue-600/20 blur-3xl"></div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-3xl items-center justify-center px-4 py-16 sm:py-24">
        <div className="glass-panel w-full rounded-2xl border border-white/20 p-8 text-center shadow-2xl sm:p-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#9c40ff] to-[#ffaa40] text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            No portfolio to display yet
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            There’s nothing to show here right now. If this is your profile,
            head to your dashboard, complete your profile details and save to
            publish your portfolio.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href={ctaHref}>Complete your profile</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
