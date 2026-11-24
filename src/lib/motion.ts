export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATIONS = {
  fast: 0.6,
  medium: 0.9,
  deliberate: 1.2,
  ceremonial: 1.4,
} as const;

export const FADE_UP = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.deliberate,
      ease: LUXURY_EASE,
    },
  },
};

export const FADE_IN = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.medium,
      ease: LUXURY_EASE,
    },
  },
};

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};
