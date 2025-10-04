'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface BillingToggleProps {
  isYearly: boolean;
  setIsYearly: (value: boolean) => void;
}

export function BillingToggle({ isYearly, setIsYearly }: BillingToggleProps) {
  return (
    // DEĞİŞİKLİK: Konteynere sabit yükseklik (h-10) verildi.
    <div className="relative mx-auto flex h-10 w-fit items-center rounded-full bg-muted p-1">
      <div
        className={cn(
          // DEĞİŞİKLİK: 'top-1 h-8' yerine 'inset-y-1' kullanılarak mükemmel dikey ortalama sağlandı.
          'absolute inset-y-1 w-1/2 rounded-full bg-background shadow-sm transition-transform duration-300 ease-in-out',
          isYearly ? 'translate-x-[95%]' : 'translate-x-0', // Ufak bir pozisyon ayarı
        )}
      />
      <div className="relative grid w-[14rem] grid-cols-2">
        <button
          onClick={() => setIsYearly(false)}
          className={cn(
            'rounded-full px-4 py-1 text-center text-sm font-medium transition-colors',
            !isYearly ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={cn(
            'rounded-full px-4 py-1 text-center text-sm font-medium transition-colors',
            isYearly ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          Yearly
        </button>
      </div>
    </div>
  );
}
