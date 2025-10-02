'use client';
export const containerVariants = {
  hidden: { opacity: 0, z: -100, scale: 0.8 },
  visible: { opacity: 1, z: 0, transition: { duration: 0.3 }, scale: 1 },
};

export const pullupVariant = {
  initial: { y: 20, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay },
  }),
};

export const headingVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.3, delay, ease: [0.4, 0, 0.2, 1] as const },
  }),
};
