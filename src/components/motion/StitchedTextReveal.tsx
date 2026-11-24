"use client";

import { motion } from "framer-motion";
import React from "react";

interface StitchedTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function StitchedTextReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}: StitchedTextRevealProps) {
  return (
    <div className={`overflow-hidden inline-block ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.9,
          delay,
          ease: LUXURY_EASE,
        }}
      >
        <Component className="inline-block">{children}</Component>
      </motion.div>
    </div>
  );
}
