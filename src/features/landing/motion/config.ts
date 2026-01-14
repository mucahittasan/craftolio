export const MOTION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.7,
    slower: 0.9,
  },

  ease: {
    easeOut: [0.16, 1, 0.3, 1] as const,
    easeInOut: [0.65, 0, 0.35, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
    decelerate: [0, 0.55, 0.45, 1] as const,
  },

  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },

  viewport: {
    once: true,
    amount: 0.2,
    margin: '-50px',
  },
} as const;

export type Duration = keyof typeof MOTION_CONFIG.duration;
export type Ease = keyof typeof MOTION_CONFIG.ease;
export type Stagger = keyof typeof MOTION_CONFIG.stagger;
