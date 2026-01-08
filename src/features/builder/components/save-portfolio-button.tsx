'use client';

import { Button } from '@/features/shared/components/ui/button';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { savePortfolio } from '@/features/builder/actions/save-portfolio.action';
import { loadPortfolio } from '@/features/builder/actions/load-portfolio.action';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import {
  validatePortfolio,
  getSectionRoute,
} from '@/features/builder/utils/validate-portfolio.util';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

type SavePortfolioButtonProps = {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
};

/**
 * A reusable button component that saves the portfolio and redirects to the portfolio page.
 * Validates all data before saving and shows helpful error messages.
 */
export function SavePortfolioButton({
  variant = 'default',
  className = '',
}: SavePortfolioButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const username = usePortfolioStore((state) => state.username);
  const hydrateStore = usePortfolioStore((state) => state.hydrateStore);
  const queryClient = useQueryClient();

  const handleSave = async () => {
    const currentFormTrigger =
      window.__educationFormTrigger ||
      window.__experienceFormTrigger ||
      window.__projectFormTrigger ||
      window.__profileFormTrigger;

    if (currentFormTrigger) {
      const isFormValid = await currentFormTrigger();
      if (!isFormValid) {
        toast.error('Form has errors', {
          description: 'Please fix the errors before saving',
          duration: 3000,
        });
        return;
      }
    }

    const validationErrors = validatePortfolio();

    if (validationErrors.length > 0) {
      const firstError = validationErrors[0];

      toast.error('Portfolio Incomplete', {
        description: firstError.message,
        action: {
          label: `Go to ${firstError.section}`,
          onClick: () => {
            const route = getSectionRoute(firstError.section);
            router.push(`${route}?validate=true`);
          },
        },
        duration: 5000,
        icon: <AlertCircle className="h-5 w-5" />,
      });

      console.error('Validation errors:', validationErrors);
      return;
    }

    startTransition(async () => {
      const portfolioState = usePortfolioStore.getState();
      const result = await savePortfolio(portfolioState);

      if (result.success && username) {
        toast.success('Portfolio Saved!', {
          description: 'Your changes have been saved successfully.',
        });

        const freshData = await loadPortfolio();
        if (freshData) {
          hydrateStore(freshData);
          queryClient.setQueryData(['portfolio'], freshData);
        }

        router.push(`/portfolio/${username}`);
        router.refresh();
      } else if (result.error) {
        toast.error('Save Failed', {
          description: result.error,
        });
      }
    });
  };

  if (!username) return null;

  return (
    <Button
      type="button"
      onClick={handleSave}
      disabled={isPending}
      variant={variant}
      className={`shadow-[var(--brand-primary)]/25 hover:shadow-[var(--brand-primary)]/40 gap-2 bg-gradient-to-r from-[var(--brand-dark)] to-[var(--brand-secondary)] text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl ${className}`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save & View Portfolio
        </>
      )}
    </Button>
  );
}
