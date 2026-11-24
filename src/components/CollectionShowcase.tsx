"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/data/atelier";
import { LUXURY_EASE, MOTION_DURATIONS } from "@/lib/motion";

export function CollectionShowcase() {
  return (
    <section id="collections" className="relative w-full bg-[#0A0A0B] py-28 sm:py-36 lg:py-40">
      {/* Editorial Section Header */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-10 gap-6">
          <div className="space-y-3">
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#C6A972]">
              CHAPTER I — SIGNATURE PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] font-light">
              The Permanent Editions
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed tracking-wide">
              Each edition is constructed individually upon bespoke commission. Numbered and cataloged in the atelier archive, zero iterations are mass-produced.
            </p>
          </div>
        </div>
      </div>

      {/* Alternating Asymmetric Editorial Spreads */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 space-y-28 sm:space-y-40">
        {COLLECTIONS.map((piece, index) => {
          const isEven = index % 2 === 1;

          return (
            <motion.article
              key={piece.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: MOTION_DURATIONS.deliberate,
                ease: LUXURY_EASE,
              }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Link
                  href={`/collection/${piece.slug}`}
                  className="block relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#121214] border border-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                >
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{
                      duration: 1.2,
                      ease: LUXURY_EASE,
                    }}
                    className="w-full h-full relative group-hover:will-change-transform"
                  >
                    <Image
                      src={piece.heroImage}
                      alt={piece.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
                    />
                  </motion.div>

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Discrete Corner Tag */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 bg-[#0A0A0B]/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                    <span className="font-sans text-[10px] tracking-[0.25em] text-[#C6A972] uppercase font-light">
                      {piece.editionTag}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Text / Specification Narrative Column */}
              <div
                className={`lg:col-span-5 space-y-6 sm:space-y-8 ${
                  isEven ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#9A968E]">
                      {piece.editionIndex}
                    </span>
                    <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C6A972]">
                      {piece.specs.handcraftHours}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA] font-light leading-tight">
                    {piece.title}
                  </h3>

                  <p className="font-serif text-base sm:text-lg text-[#C6A972] italic font-light">
                    {piece.subtitle}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#9A968E] font-light leading-relaxed tracking-wide">
                  {piece.narrative}
                </p>

                {/* Provenance Micro Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-[11px] font-sans">
                  <div>
                    <span className="block tracking-[0.25em] text-[#9A968E] uppercase text-[9px] mb-1">
                      FIBER COMPOSITION
                    </span>
                    <p className="text-[#F4F1EA] font-light truncate">
                      {piece.specs.fiberComposition}
                    </p>
                  </div>
                  <div>
                    <span className="block tracking-[0.25em] text-[#9A968E] uppercase text-[9px] mb-1">
                      LEAD TIME
                    </span>
                    <p className="text-[#F4F1EA] font-light">
                      {piece.specs.leadTime}
                    </p>
                  </div>
                </div>

                {/* Explore Action Button */}
                <div className="pt-2">
                  <Link
                    href={`/collection/${piece.slug}`}
                    className="group inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.28em] uppercase text-[#F4F1EA] hover:text-[#C6A972] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                  >
                    <span>EXPLORE PIECE</span>
                    <ArrowUpRight
                      strokeWidth={1.25}
                      className="w-4 h-4 text-[#C6A972] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-500"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
