"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ThreadProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
    restDelta: 0.0001,
  });

  return (
    <div
      className="pointer-events-none fixed top-20 left-0 right-0 z-40 h-[1.5px] bg-black/10 dark:bg-white/5 overflow-hidden transition-colors"
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full w-full bg-gradient-to-r from-[#C8A87A]/30 via-[#C8A87A]/80 to-[#C8A87A] origin-left"
        style={{ scaleX }}
      >
        {/* Leading needle-tip glint */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white dark:bg-[#F3EFE6] shadow-[0_0_8px_rgba(200,168,122,0.9)]" />
      </motion.div>
    </div>
  );
}
