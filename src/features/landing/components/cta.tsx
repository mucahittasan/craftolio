'use client';

import { Button } from '@/features/shared/components/ui/button';
import { RainbowButton } from '@/features/shared/components/ui/rainbow-button';
import { MotionDiv } from '@/features/shared/utils/motions/motions.util';
import { fadeUpVariant } from '@/features/shared/utils/motions/variants.util';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Cta() {
  return (
    <section className="container relative mx-auto px-4 py-24">
      <div className="absolute bottom-[0%] right-[10%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-[#9c40ff] to-[#ffaa40] blur-[220px]" />
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUpVariant}
        className="relative overflow-hidden text-center md:p-12"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Build Your Future?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of professionals who are showcasing their work and
            growing their careers with Craftolio.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              asChild
              className="group h-12 bg-foreground px-8 text-base font-bold text-background hover:bg-foreground/90"
            ></Button>
            <RainbowButton className="text-sm transition duration-200 hover:scale-[1.02] sm:text-base">
              ✨{' '}
              <Link href="/register" className="ml-2">
                Start for Free
              </Link>
            </RainbowButton>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
}
