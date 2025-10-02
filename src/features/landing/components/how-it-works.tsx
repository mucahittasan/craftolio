'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { UserPlus, FileText, Globe } from 'lucide-react';
import React from 'react';
import { MotionDiv } from '@/src/utils/motions/motions';
import { fadeUpVariant } from '@/src/utils/motions/variants';
import Tilt from 'react-parallax-tilt';

const steps = [
  {
    icon: <UserPlus className="text-primary h-8 w-8" />,
    title: 'Sign Up & Provide Info',
    description:
      'Create your account and fill out a simple form with your experience, education, and projects.',
  },
  {
    icon: <FileText className="text-primary h-8 w-8" />,
    title: 'Choose Your Template',
    description:
      'Select from a variety of professional templates and customize colors and fonts to match your style.',
  },
  {
    icon: <Globe className="text-primary h-8 w-8" />,
    title: 'Publish & Share',
    description:
      'Publish your portfolio to a unique URL and share it with the world.',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="container mx-auto px-4 py-24 text-center"
    >
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        custom={0.1}
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
          Get Your Professional Site in 3 Easy Steps
        </h2>
        <p className="text-muted-foreground mx-auto mb-16 max-w-2xl md:text-lg">
          From signing up to going live, the entire process is designed to be
          quick, easy, and intuitive.
        </p>
      </MotionDiv>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {steps.map((step, index) => (
          <MotionDiv
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUpVariant}
            custom={0.2 * (index + 1)}
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glarePosition="all"
              className="h-full w-full rounded-2xl"
            >
              <Card className="bg-card/60 dark:bg-card/40 group relative h-full overflow-hidden rounded-2xl border text-left shadow-xl shadow-black/[0.04] backdrop-blur-sm transition-all duration-300 dark:shadow-white/[0.02]">
                {/* Shine Efekti */}
                <div className="absolute left-[-100%] top-0 h-full w-1/2 bg-gradient-to-r from-transparent to-white/10 opacity-50 transition-all duration-700 group-hover:left-[150%]" />

                <div className="text-primary/5 pointer-events-none absolute -right-6 -top-8 select-none text-[9rem] font-bold opacity-80">
                  0{index + 1}
                </div>

                <CardHeader className="relative z-10">
                  <div className="bg-background mb-4 w-fit rounded-full border p-4 shadow-sm">
                    {step.icon}
                  </div>
                  <CardTitle className="text-balance text-xl">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground text-balance text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </Tilt>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
