"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ATELIER_CONFIG, HERO_IMAGE } from "@/data/atelier";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { LUXURY_EASE, MOTION_DURATIONS } from "@/lib/motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Compositor-only GPU transforms
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], ["0px", "-40px"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] flex items-end justify-start overflow-hidden bg-[#0A0A0B]"
    >
      {/* Background Image with Ambient Zoom & Scroll Parallax */}
      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
        }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={HERO_IMAGE}
          alt="The Weave Studio Textile Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.72] contrast-[1.08]"
        />

        {/* Cinematic Multi-layered Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-[#0A0A0B]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/90 via-[#0A0A0B]/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0A0A0B_100%)] opacity-80" />
      </motion.div>

      {/* Hero Foreground Content */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
        className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 lg:pb-32"
      >
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Micro-eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: MOTION_DURATIONS.medium,
              delay: 0.2,
              ease: LUXURY_EASE,
            }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <span className="w-8 h-[1px] bg-[#C6A972]/80" />
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#C6A972] font-medium">
              {ATELIER_CONFIG.eyebrow}
            </span>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: MOTION_DURATIONS.deliberate,
              delay: 0.35,
              ease: LUXURY_EASE,
            }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F4F1EA] font-light tracking-[-0.01em] leading-[1.06]"
          >
            Architecture in <br />
            <span className="italic font-normal text-[#F4F1EA]/95">Every Loop.</span>
          </motion.h1>

          {/* Subtitle / Philosophy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: MOTION_DURATIONS.medium,
              delay: 0.5,
              ease: LUXURY_EASE,
            }}
            className="font-sans text-xs sm:text-sm text-[#9A968E] max-w-xl font-light leading-relaxed tracking-wide"
          >
            Hand-tensioned single-hook geometry and museum-grade natural fibers. Numbered commissions conceived as heirloom structures for architectural living.
          </motion.p>

          {/* Single Ghost Hairline CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: MOTION_DURATIONS.deliberate,
              delay: 0.65,
              ease: LUXURY_EASE,
            }}
            className="pt-2 sm:pt-4 flex flex-wrap items-center gap-6"
          >
            <button
              onClick={() => scrollTo("#collections")}
              className="group relative inline-flex items-center justify-center px-7 sm:px-9 py-3.5 sm:py-4 border border-[#F4F1EA]/20 bg-[#0A0A0B]/40 backdrop-blur-sm text-[#F4F1EA] hover:border-[#C6A972] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            >
              <span className="font-sans text-[11px] tracking-[0.28em] uppercase font-light text-[#F4F1EA] group-hover:text-[#C6A972] transition-colors">
                DISCOVER THE COLLECTION
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A972] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
            </button>

            <span className="font-sans text-[10px] tracking-[0.25em] text-[#9A968E]/60 uppercase hidden sm:inline">
              {ATELIER_CONFIG.founded} / HYDERABAD
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Minimal Vertical Hairline Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 right-8 sm:right-16 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#9A968E]/75 [writing-mode:vertical-rl] rotate-180">
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
            className="w-full h-1/2 bg-[#C6A972]"
          />
        </div>
      </motion.div>
    </section>
  );
}
