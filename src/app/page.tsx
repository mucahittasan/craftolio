import { Features } from '@/src/features/landing/components/features';
import { Hero } from '@/src/features/landing/components/hero';
import { HowItWorks } from '@/src/features/landing/components/how-it-works';
import { Pricing } from '@/src/features/landing/components/pricing';
import { Cta } from '@/src/features/landing/components/cta';

export default function HomePage() {
  return (
    <div>
      <div className="absolute left-[20%] top-[60%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-[#9c40ff] to-[#ffaa40] blur-[220px]" />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Cta />
    </div>
  );
}
