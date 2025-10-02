'use client';

import { Button } from '@/src/components/ui/button';
import { MotionDiv } from '@/src/utils/motions/motions';
import { fadeUpVariant } from '@/src/utils/motions/variants';
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
        className="relative overflow-hidden p-12 text-center"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Build Your Future?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Join thousands of professionals who are showcasing their work and
            growing their careers with Craftolio.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              asChild
              className="bg-foreground text-background hover:bg-foreground/90 group h-12 px-8 text-base font-bold"
            >
              <Link href="/register">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
}
