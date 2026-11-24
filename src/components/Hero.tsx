"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ATELIER_CONFIG, HERO_IMAGE } from "@/data/atelier";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { LUXURY_EASE, MOTION_DURATIONS } from "@/lib/motion";

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section className="relative w-full h-[100svh] min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#000000]">
      {/* Background Architectural Canvas */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{
          duration: MOTION_DURATIONS.ceremonial,
          ease: LUXURY_EASE,
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={HERO_IMAGE}
          alt="The Weave Studio Luxury Atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.70] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60 pointer-events-none" />
      </motion.div>

      {/* Top Spacer */}
      <div className="h-20 sm:h-24" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 w-full my-auto text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-3"
        >
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white/70 font-light">
            {ATELIER_CONFIG.eyebrow}
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: MOTION_DURATIONS.deliberate,
              delay: 0.35,
              ease: LUXURY_EASE,
            }}
            className="font-sans text-4xl sm:text-6xl lg:text-[76px] font-light tracking-[0.18em] uppercase text-white leading-tight max-w-5xl mx-auto"
          >
            {ATELIER_CONFIG.tagline}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: LUXURY_EASE }}
          className="font-sans text-xs sm:text-sm font-light text-white/70 max-w-xl mx-auto leading-relaxed tracking-wide"
        >
          Specializing in bespoke commissions, architectural tapestries, and ready-to-ship numbered editions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: LUXURY_EASE }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            href="/collections"
            className="rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          >
            DISCOVER COLLECTIONS
          </Link>
          <Link
            href="/bespoke/configure"
            className="rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white/70 transition-all duration-500 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          >
            CONFIGURE IN 3D
          </Link>
        </motion.div>
      </div>

      {/* Bottom Architectural Bar */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
        <span>HYDERABAD BESPOKE ATELIER</span>

        <button
          onClick={() => scrollTo(window.innerHeight)}
          className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          aria-label="Scroll to exploration"
        >
          <span className="hidden sm:inline">EXPLORE</span>
          <ArrowDown strokeWidth={1.25} className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
        </button>

        <span>MMXXIV ARCHIVE</span>
      </div>
    </section>
  );
}
