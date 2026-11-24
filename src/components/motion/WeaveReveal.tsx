"use client";

import { motion } from "framer-motion";
import React from "react";

interface WeaveRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function WeaveReveal({
  children,
  className = "",
  delay = 0,
}: WeaveRevealProps) {
  return (
    <motion.div
      initial={{
        clipPath: "inset(12% 0% 0% 0%)",
        opacity: 0,
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 1.15,
        delay,
        ease: LUXURY_EASE,
      }}
      className={`overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ scale: 1.07 }}
        whileInView={{ scale: 1.0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.25,
          delay,
          ease: LUXURY_EASE,
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
