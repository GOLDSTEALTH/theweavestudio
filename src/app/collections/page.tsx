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
import { WeaveReveal } from "@/components/motion/WeaveReveal";

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
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
      <Navbar />
      <VaultDrawer />

      {/* 1. Full-Bleed Interactive Showcase */}
      <section className="hero-cinema relative w-full h-[100svh] min-h-[700px] flex flex-col justify-between overflow-hidden">
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
          <div className="hero-vignette absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/35 to-[#0E0D0C]/60" />
        </div>

        {/* Top Spacer for Fixed Nav */}
        <div className="h-20" />

        {/* Active Piece Content */}
        <div className="hero-photo-text relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 w-full my-auto">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-4 text-[#C8A87A] font-light text-xs tracking-[0.28em] uppercase">
              <span>{activePiece.editionIndex}</span>
              <span className="w-12 h-[1px] bg-[#F3EFE6]/20" />
              <span className="text-[#9C9488]">{activePiece.editionTag}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-[#F3EFE6] leading-tight">
              {activePiece.title}
            </h1>

            <p className="font-sans text-sm sm:text-base font-light text-[#9C9488] max-w-2xl leading-relaxed tracking-wide">
              {activePiece.subtitle}
            </p>

            {/* Quick Specs Strip */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#F3EFE6]/20 max-w-2xl">
              <div>
                <span className="block text-[9px] font-light tracking-[0.25em] text-[#C8A87A] uppercase">CRAFT TIME</span>
                <span className="text-xs tracking-wider text-[#F3EFE6] font-light">{activePiece.specs.handcraftHours}</span>
              </div>
              <div>
                <span className="block text-[9px] font-light tracking-[0.25em] text-[#C8A87A] uppercase">LEAD TIME</span>
                <span className="text-xs tracking-wider text-[#F3EFE6] font-light">{activePiece.specs.leadTime}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-[9px] font-light tracking-[0.25em] text-[#C8A87A] uppercase">ESTIMATE</span>
                <span className="text-xs tracking-wider text-[#F3EFE6] font-light">{activePiece.priceEstimate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href={`/collection/${activePiece.slug}`}
                className="btn-stitched px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase"
              >
                <span className="stitch-dot" />
                <span>DISCOVER EDITION</span>
              </Link>

              <Link
                href={`/bespoke/commission?silhouette=${activePiece.silhouetteId}`}
                className="rounded-full border border-[#F3EFE6]/30 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-[#9C9488] transition-all duration-500 hover:border-[#C8A87A] hover:text-[#F3EFE6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A] flex items-center gap-2"
              >
                <span>THE COMMISSION TABLE</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Carousel Controls & Counter Strip */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between border-t border-[#F3EFE6]/10 pt-6">
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-[#F3EFE6]/20 hover:border-[#C8A87A] text-[#9C9488] hover:text-[#F3EFE6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
              aria-label="Previous Collection Piece"
            >
              <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-[#F3EFE6]/20 hover:border-[#C8A87A] text-[#9C9488] hover:text-[#F3EFE6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
              aria-label="Next Collection Piece"
            >
              <ArrowRight strokeWidth={1.25} className="w-4 h-4" />
            </button>
            <span className="font-sans text-[11px] tracking-[0.25em] text-[#9C9488] uppercase font-light hidden sm:inline">
              SELECT SILHOUETTE
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-light tracking-[0.28em] text-[#F3EFE6]">
            <span>0{activeIdx + 1}</span>
            <span className="w-8 h-[1px] bg-[#C8A87A]/50" />
            <span className="text-[#9C9488]">0{COLLECTIONS.length}</span>
          </div>
        </div>
      </section>

      {/* 2. Architectural Index Grid */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-t border-[#F3EFE6]/12">
        <div className="border-b border-[#F3EFE6]/12 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              CATALOGUE ARCHIVE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase">
              All Foundational Silhouettes
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#9C9488] uppercase font-light">
            MADE TO ORDER
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {COLLECTIONS.map((piece, idx) => (
            <div key={piece.slug} className="group space-y-6">
              {/* Photo with WeaveReveal */}
              <Link href={`/collection/${piece.slug}`} className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]">
                <WeaveReveal delay={idx * 0.1} className="relative aspect-[16/10] w-full bg-[#171513] rounded-2xl overflow-hidden border border-[#F3EFE6]/10">
                  <Image
                    src={piece.heroImage}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center filter brightness-[0.9] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </WeaveReveal>
              </Link>

              {/* Left-hairline text block */}
              <div className="border-l border-[#C8A87A]/50 pl-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-light tracking-[0.25em] uppercase text-[#9C9488]">
                  <span className="text-[#C8A87A]">{piece.editionIndex}</span>
                  <span>{piece.specs.handcraftHours}</span>
                </div>

                <Link href={`/collection/${piece.slug}`} className="block focus-visible:outline-none">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFE6] font-light tracking-wide group-hover:text-[#C8A87A] transition-colors">
                    {piece.title}
                  </h3>
                </Link>

                <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed line-clamp-2">
                  {piece.subtitle}
                </p>

                <div className="pt-3 flex items-center gap-6">
                  <Link
                    href={`/collection/${piece.slug}`}
                    className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#F3EFE6] hover:text-[#C8A87A] transition-colors focus-visible:outline-none"
                  >
                    EXPLORE PIECE
                  </Link>

                  <Link
                    href={`/bespoke/commission?silhouette=${piece.silhouetteId}`}
                    className="font-sans text-[11px] tracking-[0.22em] uppercase text-[#9C9488] hover:text-[#C8A87A] transition-colors flex items-center gap-1 focus-visible:outline-none"
                  >
                    <span>COMMISSION</span>
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
            title: "THE COMMISSION TABLE",
            description: "Step into our interactive workstation to curate living fibers, palettes, and personal dedications.",
            href: "/bespoke/commission",
            image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=85&w=1200&auto=format&fit=crop",
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
