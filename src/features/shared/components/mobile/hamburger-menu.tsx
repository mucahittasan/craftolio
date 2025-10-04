import { cn } from '@/lib/utils';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { hamburgerMenuVariants } from '@/features/shared/utils/motions/variants.util';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function HamburgerMenu({
  isOpen,
  onClick,
  className,
}: HamburgerMenuProps) {
  return (
    <button
      className={cn(
        'group relative flex h-12 w-12 items-center justify-center',
        className,
      )}
      onClick={onClick}
    >
      <div className="relative h-3 w-6">
        <MotionDiv
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={hamburgerMenuVariants.top}
          className={`absolute left-0 top-[1px] h-[2px] w-6 transform rounded-full bg-foreground transition-colors duration-200 ${
            isOpen ? '-translate-y-1/2 bg-destructive' : ''
          }`}
        />
        <MotionDiv
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={hamburgerMenuVariants.middle}
          className="absolute left-0 top-[55%] h-[2px] w-6 -translate-y-1/2 transform rounded-full bg-foreground transition-colors duration-200"
        />
        <MotionDiv
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={hamburgerMenuVariants.bottom}
          className={`absolute bottom-[1px] left-0 h-[2px] w-6 transform rounded-full bg-foreground transition-colors duration-200 ${
            isOpen ? 'top-[50%] -translate-y-1/2 bg-destructive' : ''
          }`}
        />
      </div>
    </button>
  );
}
