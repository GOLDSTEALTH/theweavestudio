"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { COLLECTIONS } from "@/data/atelier";

export default function CollectionsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePiece = COLLECTIONS[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? COLLECTIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === COLLECTIONS.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <Navbar />
      <VaultDrawer />

      {/* 1. Full-Bleed Interactive Showcase (Cycling through all 4 editions 01/04) */}
      <section className="relative w-full h-[100svh] min-h-[700px] flex flex-col justify-between overflow-hidden">
        {/* Full-Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            key={activePiece.slug}
            src={activePiece.heroImage}
            alt={activePiece.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.62] contrast-[1.08] transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        </div>

        {/* Top Spacer for Fixed Nav */}
        <div className="h-20" />

        {/* Active Piece Content */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 w-full my-auto">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-4 text-white/60 font-light text-xs tracking-[0.28em] uppercase">
              <span>{activePiece.editionIndex}</span>
              <span className="w-12 h-[1px] bg-white/20" />
              <span>{activePiece.editionTag}</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-7xl font-light tracking-[0.16em] uppercase text-white leading-tight">
              {activePiece.title}
            </h1>

            <p className="font-sans text-sm sm:text-base font-light text-white/80 max-w-2xl leading-relaxed tracking-wide">
              {activePiece.subtitle}
            </p>

            {/* Quick Specs Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/20 max-w-2xl">
              <div>
                <span className="block text-[9px] font-light tracking-[0.25em] text-white/40 uppercase">CRAFT TIME</span>
                <span className="text-xs tracking-wider text-white font-light">{activePiece.specs.handcraftHours}</span>
              </div>
              <div>
                <span className="block text-[9px] font-light tracking-[0.25em] text-white/40 uppercase">LEAD TIME</span>
                <span className="text-xs tracking-wider text-white font-light">{activePiece.specs.leadTime}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-[9px] font-light tracking-[0.25em] text-white/40 uppercase">ESTIMATE</span>
                <span className="text-xs tracking-wider text-white font-light">{activePiece.priceEstimate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href={`/collection/${activePiece.slug}`}
                className="rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
              >
                DISCOVER EDITION
              </Link>

              <Link
                href={`/bespoke/configure?silhouette=${activePiece.silhouetteId}`}
                className="rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white/70 transition-all duration-500 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 flex items-center gap-2"
              >
                <span>CONFIGURE 3D</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Carousel Controls & Counter Strip */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
              aria-label="Previous Collection Piece"
            >
              <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
              aria-label="Next Collection Piece"
            >
              <ArrowRight strokeWidth={1.25} className="w-4 h-4" />
            </button>
            <span className="font-sans text-[11px] tracking-[0.25em] text-white/60 uppercase font-light hidden sm:inline">
              SELECT SILHOUETTE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-light tracking-[0.28em] text-white/70">
            <span>0{activeIdx + 1}</span>
            <span className="w-8 h-[1px] bg-white/30" />
            <span className="text-white/40">0{COLLECTIONS.length}</span>
          </div>
        </div>
      </section>

      {/* 2. Architectural Index Grid (2-column layout with borderless edge-to-edge photos + left-hairline text blocks) */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-t border-white/15">
        <div className="border-b border-white/15 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              CATALOGUE ARCHIVE
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
              ALL FOUNDATIONAL SILHOUETTES
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-light">
            MADE TO ORDER
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {COLLECTIONS.map((piece) => (
            <div key={piece.slug} className="group space-y-6">
              {/* Edge-to-edge photo with zero box border */}
              <Link href={`/collection/${piece.slug}`} className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70">
                <div className="relative aspect-[16/10] w-full bg-[#151515] overflow-hidden">
                  <Image
                    src={piece.heroImage}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center filter brightness-[0.88] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </Link>

              {/* Left-hairline text block */}
              <div className="border-l border-white/25 pl-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-light tracking-[0.25em] uppercase text-white/40">
                  <span>{piece.editionIndex}</span>
                  <span>{piece.specs.handcraftHours}</span>
                </div>

                <Link href={`/collection/${piece.slug}`} className="block focus-visible:outline-none">
                  <h3 className="font-sans text-xl sm:text-2xl text-white font-light tracking-[0.16em] uppercase group-hover:text-white/80 transition-colors">
                    {piece.title}
                  </h3>
                </Link>

                <p className="font-sans text-xs text-white/60 font-light leading-relaxed line-clamp-2">
                  {piece.subtitle}
                </p>

                <div className="pt-3 flex items-center gap-6">
                  <Link
                    href={`/collection/${piece.slug}`}
                    className="font-sans text-[11px] tracking-[0.22em] uppercase text-white hover:underline focus-visible:outline-none"
                  >
                    EXPLORE PIECE
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
            </div>
          ))}
        </div>
      </section>

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "3D BESPOKE CONFIGURATOR",
            description: "Step into our full-viewport 3D studio to interact with fibers, palettes, and botanical vessels.",
            href: "/bespoke/configure",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "THE WORLD OF BESPOKE",
            description: "Understand the bespoke commissioning journey, swatch dispatch, and private salon appointments.",
            href: "/bespoke",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "HYDERABAD PROVENANCE & VAULT",
            description: "Inspect finished 1-of-1 ready-to-ship editions resting in the atelier vault.",
            href: "/provenance",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
