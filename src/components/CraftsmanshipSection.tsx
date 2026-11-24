"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CRAFTSMANSHIP_PILLARS } from "@/data/atelier";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { LUXURY_EASE, MOTION_DURATIONS } from "@/lib/motion";

export function CraftsmanshipSection() {
  const [activePillarId, setActivePillarId] = useState<string>(CRAFTSMANSHIP_PILLARS[0].id);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePillarId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -45% 0%",
        threshold: 0.1,
      }
    );

    CRAFTSMANSHIP_PILLARS.forEach((pillar) => {
      const el = document.getElementById(pillar.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="craftsmanship" className="relative w-full bg-[#121214] py-28 sm:py-36 lg:py-44 border-t border-b border-white/10">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Sticky Editorial Context */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="space-y-3">
                <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#C6A972]">
                  CHAPTER II — THE ATELIER PHILOSOPHY
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] font-light leading-tight">
                  Discipline of the <br />
                  <span className="italic">Single Stitch.</span>
                </h2>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#9A968E] font-light leading-relaxed tracking-wide">
                At The Weave Studio, we reject the hurried momentum of contemporary fashion. Our practice is an architectural devotion to tensile equilibrium, structural restraint, and heirloom durability.
              </p>

              {/* Architectural Indicator Rules with Active Pillar Highlighting */}
              <div className="pt-8 border-t border-white/10 space-y-4">
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#9A968E] uppercase block">
                  CRAFT PILLARS
                </span>
                <div className="space-y-2">
                  {CRAFTSMANSHIP_PILLARS.map((p) => {
                    const isActive = activePillarId === p.id;

                    return (
                      <button
                        key={p.number}
                        onClick={() => scrollTo(`#${p.id}`)}
                        className={`group w-full flex items-center justify-between text-left py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                          isActive ? "text-[#C6A972]" : "text-[#9A968E] hover:text-[#F4F1EA]"
                        }`}
                      >
                        <div className="flex items-center gap-3 text-xs font-sans">
                          <span className={`font-medium tracking-[0.2em] transition-colors ${
                            isActive ? "text-[#C6A972]" : "text-[#9A968E]"
                          }`}>
                            {p.number}
                          </span>
                          <span className={`tracking-[0.15em] uppercase font-light transition-colors ${
                            isActive ? "text-[#F4F1EA] font-normal" : "text-[#9A968E]"
                          }`}>
                            {p.title}
                          </span>
                        </div>

                        {/* Animated hairline indicator */}
                        <div className="w-12 flex justify-end items-center">
                          {isActive ? (
                            <motion.span
                              layoutId="activePillarLine"
                              className="w-8 h-[1px] bg-[#C6A972]"
                              transition={{ duration: 0.5, ease: LUXURY_EASE }}
                            />
                          ) : (
                            <span className="w-3 h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6">
                <div className="p-5 border border-white/10 bg-[#0A0A0B]/60 backdrop-blur-sm">
                  <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#C6A972] block mb-1">
                    STUDIO PRINCIPLE
                  </span>
                  <p className="font-serif text-sm italic text-[#F4F1EA]/90 leading-relaxed">
                    &ldquo;When every loop is pulled by hand, time ceases to be a cost and becomes the quietest ingredient of beauty.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Tactile Pillars */}
          <div className="lg:col-span-7 space-y-24 sm:space-y-32">
            {CRAFTSMANSHIP_PILLARS.map((pillar) => (
              <motion.article
                key={pillar.id}
                id={pillar.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: MOTION_DURATIONS.deliberate,
                  ease: LUXURY_EASE,
                }}
                className="space-y-8 border-b border-white/10 pb-16 sm:pb-24 last:border-b-0 scroll-mt-32"
              >
                {/* Pillar Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0B] border border-white/10">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center filter brightness-[0.82] contrast-[1.08] hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 bg-[#0A0A0B]/85 backdrop-blur-md px-3 py-1 border border-white/10">
                    <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#C6A972]">
                      {pillar.tag}
                    </span>
                  </div>
                </div>

                {/* Pillar Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs tracking-[0.3em] text-[#C6A972] font-medium">
                      PILLAR {pillar.number}
                    </span>
                    <span className="w-8 h-[1px] bg-white/10" />
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-light">
                    {pillar.title}
                  </h3>

                  <p className="font-serif text-base sm:text-lg text-[#C6A972] italic font-light">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Pillar Narrative Body */}
                <p className="font-sans text-xs sm:text-sm text-[#9A968E] font-light leading-relaxed tracking-wide">
                  {pillar.body}
                </p>

                {/* Technical Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {pillar.specs.map((spec) => (
                    <div key={spec.label} className="space-y-1">
                      <span className="font-sans text-[9px] tracking-[0.25em] text-[#9A968E] uppercase block">
                        {spec.label}
                      </span>
                      <span className="font-sans text-xs text-[#F4F1EA] font-light block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
