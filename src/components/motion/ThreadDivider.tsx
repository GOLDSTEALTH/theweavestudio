"use client";

import { motion } from "framer-motion";

interface ThreadDividerProps {
  className?: string;
  withKnot?: boolean;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function ThreadDivider({
  className = "",
  withKnot = true,
}: ThreadDividerProps) {
  return (
    <div className={`relative flex items-center justify-center w-full my-8 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.95, ease: LUXURY_EASE }}
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#F3EFE6]/25 to-transparent origin-left"
      />
      {withKnot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4, ease: LUXURY_EASE }}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-[#0E0D0C] px-3"
        >
          <span className="w-1.5 h-1.5 rotate-45 border border-[#C8A87A]/70 bg-[#0E0D0C] shadow-[0_0_6px_rgba(200,168,122,0.4)]" />
        </motion.div>
      )}
    </div>
  );
}
