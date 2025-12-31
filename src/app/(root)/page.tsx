import { Features } from '@/features/landing/components/features';
import { Hero } from '@/features/landing/components/hero';
import { HowItWorks } from '@/features/landing/components/how-it-works';
import { PdfShowcase } from '@/features/landing/components/pdf-showcase';
import { Cta } from '@/features/landing/components/cta';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Features />
      <PdfShowcase />
      <HowItWorks />
      <Cta />
    </div>
  );
}
