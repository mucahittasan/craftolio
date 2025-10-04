import { Skeleton } from '@/features/shared/components/ui/skeleton';

export function FormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-black/10 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Second input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Full width input */}
          <div className="space-y-2 md:col-span-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Date inputs */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Add button skeleton */}
      <Skeleton className="h-10 w-48" />

      {/* Navigation buttons skeleton */}
      <div className="flex justify-between pt-8">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
