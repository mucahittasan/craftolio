import React from 'react';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-screen w-full place-items-center bg-white px-4 py-8 dark:bg-gray-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]"></div>
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent blur-3xl dark:from-violet-500/20 dark:via-purple-500/10"></div>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {children}
      </MotionDiv>
    </div>
  );
}
