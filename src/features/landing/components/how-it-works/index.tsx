'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Edit3, Share2, Check } from 'lucide-react';
import { SectionHeader } from '../shared';
import { staggerContainerSlow, scaleInSpring } from '../../motion';

// Custom step variants for alternating left/right animations
const stepVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -50 : 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const STEPS = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create your account',
    description:
      'Sign up for free in seconds. No credit card required to get started. Just your name and email.',
    color: 'teal',
  },
  {
    number: '02',
    icon: Edit3,
    title: 'Add your content',
    description:
      'Fill in your experience, projects, skills, and education. Our intuitive editor makes it easy to showcase your work.',
    color: 'teal',
  },
  {
    number: '03',
    icon: Share2,
    title: 'Share with the world',
    description:
      'Get your unique portfolio URL and share it with recruiters, clients, and peers. Your work, accessible anywhere.',
    color: 'teal',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="How It Works"
          badgeColor="blue"
          title="Get your portfolio live in 3 simple steps"
          description="No coding, no complexity. Just fill in your details and you are ready to go."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerSlow}
          className="relative mx-auto max-w-4xl"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="absolute left-1/2 top-5 hidden h-[calc(100%-115px)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#005461] via-[#0C7779] to-[#3BC1A8] lg:block"
          />

          <div className="space-y-16 lg:space-y-24">
            {STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  custom={isLeft}
                  variants={stepVariants}
                  className="relative"
                >
                  <div className="hidden lg:grid lg:grid-cols-[1fr_40px_1fr] lg:gap-8">
                    <div className={isLeft ? 'flex justify-end pr-4' : ''}>
                      {isLeft && (
                        <div className="text-right">
                          <div className="flex h-10 items-center justify-end gap-3">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {step.title}
                            </h3>
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                                step.color === 'teal'
                                  ? 'bg-[#3BC1A8]/20 dark:bg-[#0C7779]/30'
                                  : step.color === 'blue'
                                    ? 'bg-blue-100 dark:bg-blue-900/30'
                                    : 'bg-emerald-100 dark:bg-emerald-900/30'
                              }`}
                            >
                              <step.icon
                                className={`h-5 w-5 ${
                                  step.color === 'teal'
                                    ? 'text-[#005461] dark:text-[#3BC1A8]'
                                    : step.color === 'blue'
                                      ? 'text-blue-600 dark:text-blue-400'
                                      : 'text-emerald-600 dark:text-emerald-400'
                                }`}
                              />
                            </div>
                          </div>
                          <p className="mt-3 text-gray-600 dark:text-gray-400">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg ${
                          step.color === 'teal'
                            ? 'bg-gradient-to-br from-[#005461] to-[#249E94] shadow-[#0C7779]/30'
                            : step.color === 'blue'
                              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/30'
                              : 'bg-gradient-to-br from-emerald-600 to-teal-600 shadow-emerald-500/30'
                        }`}
                      >
                        {step.number}
                      </div>
                    </div>

                    <div className={!isLeft ? 'pl-4' : ''}>
                      {!isLeft && (
                        <div>
                          <div className="flex h-10 items-center gap-3">
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                                step.color === 'teal'
                                  ? 'bg-[#3BC1A8]/20 dark:bg-[#0C7779]/30'
                                  : step.color === 'blue'
                                    ? 'bg-blue-100 dark:bg-blue-900/30'
                                    : 'bg-emerald-100 dark:bg-emerald-900/30'
                              }`}
                            >
                              <step.icon
                                className={`h-5 w-5 ${
                                  step.color === 'teal'
                                    ? 'text-[#005461] dark:text-[#3BC1A8]'
                                    : step.color === 'blue'
                                      ? 'text-blue-600 dark:text-blue-400'
                                      : 'text-emerald-600 dark:text-emerald-400'
                                }`}
                              />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="mt-3 text-gray-600 dark:text-gray-400">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 lg:hidden">
                    <div
                      className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg ${
                        step.color === 'teal'
                          ? 'bg-gradient-to-br from-[#005461] to-[#249E94]'
                          : step.color === 'blue'
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600'
                            : 'bg-gradient-to-br from-emerald-600 to-teal-600'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex h-8 items-center gap-2">
                        <div
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                            step.color === 'teal'
                              ? 'bg-[#3BC1A8]/20 dark:bg-[#0C7779]/30'
                              : step.color === 'blue'
                                ? 'bg-blue-100 dark:bg-blue-900/30'
                                : 'bg-emerald-100 dark:bg-emerald-900/30'
                          }`}
                        >
                          <step.icon
                            className={`h-4 w-4 ${
                              step.color === 'teal'
                                ? 'text-[#005461] dark:text-[#3BC1A8]'
                                : step.color === 'blue'
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={scaleInSpring}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 dark:border-emerald-800 dark:bg-emerald-900/30">
            <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-emerald-700 dark:text-emerald-300">
              That&apos;s it! Your portfolio is live.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
