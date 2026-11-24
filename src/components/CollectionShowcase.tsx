"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/data/atelier";

export function CollectionShowcase() {
  return (
    <section id="collections" className="relative w-full bg-[#000000] py-28 sm:py-36 lg:py-44">
      {/* Chapter Eyebrow */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
        <div className="border-b border-white/15 pb-8 space-y-3">
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/50 font-light">
            CHAPTER I — SIGNATURE EDITIONS
          </span>
          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-[0.16em] uppercase leading-tight">
            THE ARCHITECTURAL EDITIONS
          </h2>
          <p className="font-sans text-xs text-white/60 font-light max-w-2xl leading-relaxed tracking-wide pt-2">
            Each numbered piece represents an unrepeatable exploration of form and tension. Commissioned individually with museum-grade natural fibers.
          </p>
        </div>
      </div>

      {/* Alternating Asymmetric Product Chapters */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 space-y-36 sm:space-y-48">
        {COLLECTIONS.map((piece, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={piece.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                isEven ? "" : "lg:grid-flow-dense"
              }`}
            >
              {/* Product Visual */}
              <div
                className={`relative ${
                  isEven ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-6"
                }`}
              >
                <Link
                  href={`/collection/${piece.slug}`}
                  className="block relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#151515] border border-white/15 focus-visible:outline-none"
                >
                  <Image
                    src={piece.heroImage}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 px-3 py-1 border border-white/20">
                    <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/80 font-light">
                      {piece.editionTag}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Product Editorial Details */}
              <div
                className={`space-y-6 ${
                  isEven ? "lg:col-span-5" : "lg:col-span-5 lg:col-start-1"
                }`}
              >
                <div className="flex items-center gap-4 text-xs font-light tracking-[0.25em] text-white/40 uppercase">
                  <span>{piece.editionIndex}</span>
                  <span className="w-8 h-[1px] bg-white/20" />
                  <span>{piece.priceEstimate}</span>
                </div>

                <Link href={`/collection/${piece.slug}`} className="block focus-visible:outline-none">
                  <h3 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.16em] uppercase hover:text-white/80 transition-colors">
                    {piece.title}
                  </h3>
                </Link>

                <p className="font-sans text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {piece.subtitle}
                </p>

                <div className="border-l border-white/25 pl-6 py-2 my-4">
                  <p className="font-sans text-xs text-white/50 font-light leading-relaxed line-clamp-3">
                    {piece.narrative}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-6">
                  <Link
                    href={`/collection/${piece.slug}`}
                    className="inline-block rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
                  >
                    DISCOVER PIECE
                  </Link>

                  <Link
                    href={`/bespoke/configure?silhouette=${piece.silhouetteId}`}
                    className="font-sans text-[11px] tracking-[0.22em] uppercase text-white/50 hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-none"
                  >
                    <span>CONFIGURE</span>
                    <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
