"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CRAFTSMANSHIP_PILLARS } from "@/data/atelier";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { LUXURY_EASE } from "@/lib/motion";

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
    <section id="craftsmanship" className="relative w-full bg-[#000000] py-24 sm:py-36 border-t border-b border-white/15">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Sticky Editorial Context */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="space-y-3">
                <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/50 font-light">
                  THE ATELIER PHILOSOPHY
                </span>
                <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-[0.16em] uppercase leading-tight">
                  DISCIPLINE OF THE SINGLE STITCH
                </h2>
              </div>

              <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed tracking-wide">
                At The Weave Studio, we reject the hurried momentum of contemporary fashion. Our practice is an architectural devotion to tensile equilibrium, structural restraint, and heirloom durability.
              </p>

              {/* Architectural Indicator Rules with Active Pillar Highlighting */}
              <div className="pt-8 border-t border-white/15 space-y-4">
                <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase block font-light">
                  CRAFT PILLARS
                </span>
                <div className="space-y-2">
                  {CRAFTSMANSHIP_PILLARS.map((p) => {
                    const isActive = activePillarId === p.id;

                    return (
                      <button
                        key={p.number}
                        onClick={() => scrollTo(`#${p.id}`)}
                        className={`group w-full flex items-center justify-between text-left py-2 transition-colors focus-visible:outline-none ${
                          isActive ? "text-white" : "text-white/40 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-4 text-xs font-sans">
                          <span className={`tracking-[0.2em] font-light ${
                            isActive ? "text-white font-normal" : "text-white/40"
                          }`}>
                            {p.number}
                          </span>
                          <span className={`tracking-[0.18em] uppercase font-light ${
                            isActive ? "text-white font-normal" : "text-white/40"
                          }`}>
                            {p.title}
                          </span>
                        </div>

                        {/* Animated hairline indicator */}
                        <div className="w-12 flex justify-end items-center">
                          {isActive ? (
                            <motion.span
                              layoutId="activePillarLine"
                              className="w-8 h-[1px] bg-white"
                              transition={{ duration: 0.5, ease: LUXURY_EASE }}
                            />
                          ) : (
                            <span className="w-3 h-[1px] bg-white/15 group-hover:bg-white/40 transition-colors" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Detailed Pillar Cards */}
          <div className="lg:col-span-7 space-y-28 sm:space-y-36">
            {CRAFTSMANSHIP_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                id={pillar.id}
                className="scroll-mt-32 space-y-8"
              >
                {/* Full-width Image for Pillar */}
                <div className="relative aspect-[16/10] w-full bg-[#151515] overflow-hidden border border-white/15">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 px-3 py-1 border border-white/20">
                    <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/80 font-light">
                      {pillar.number} / {pillar.tag}
                    </span>
                  </div>
                </div>

                {/* Pillar Typography */}
                <div className="space-y-4">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/50 block font-light">
                    PILLAR {pillar.number}
                  </span>

                  <h3 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.16em] uppercase">
                    {pillar.title}
                  </h3>

                  <p className="font-sans text-sm text-white/80 font-light italic leading-relaxed">
                    {pillar.subtitle}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed pt-2">
                    {pillar.body}
                  </p>
                </div>

                {/* Metrics / Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
                  {pillar.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-4 bg-[#151515] border border-white/10 space-y-1"
                    >
                      <span className="block font-sans text-[8px] tracking-[0.25em] uppercase text-white/40 font-light">
                        {spec.label}
                      </span>
                      <span className="block font-sans text-xs text-white font-light tracking-wide">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
