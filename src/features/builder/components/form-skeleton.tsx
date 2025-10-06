import { Skeleton } from '@/features/shared/components/ui/skeleton';

export function FormSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page heading + subtitle (to match dashboard pages) */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-60 sm:h-9 sm:w-72" />
        <Skeleton className="h-4 w-80 sm:w-[28rem]" />
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-black/10 bg-white/10 p-8 shadow-2xl backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
        <div className="space-y-6">
          {/* First row: two inputs */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Rich text editor area */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Three inputs row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
            <Skeleton className="h-10 w-full sm:w-44" />
            <Skeleton className="h-10 w-full sm:w-56" />
          </div>
        </div>
      </div>
    </div>
  );
}
