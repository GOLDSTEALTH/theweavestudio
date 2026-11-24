import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { HERO_IMAGE } from "@/data/atelier";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      {/* Top Architectural Navigation Bar */}
      <Navbar />

      {/* Slide-over Private Vault Drawer */}
      <VaultDrawer />

      {/* Campaign Fold 01 (100svh) */}
      <section className="relative w-full h-[100svh] flex flex-col justify-between overflow-hidden">
        {/* Full-Bleed Editorial Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="The Weave Studio Luxury Atelier"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-100"
          />
          {/* Subtle Top & Bottom Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />
        </div>

        {/* Spacer for Fixed Top Navbar */}
        <div className="h-20" />

        {/* Centered Monolithic Typography */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 sm:space-y-8 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-white/70">
            THE WEAVE STUDIO PRESENTS
          </span>

          <h1 className="font-sans text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[0.18em] uppercase text-white leading-tight max-w-5xl mx-auto">
            ARCHITECTURE IN EVERY LOOP
          </h1>

          <div className="pt-4">
            <Link
              href="/collections"
              className="inline-block rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              DISCOVER COLLECTIONS
            </Link>
          </div>
        </div>

        {/* Bottom Colophon Indicator */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
          <span>CHAPTER 01 / EDITIONS</span>
          <span>HYDERABAD BESPOKE ATELIER</span>
        </div>
      </section>

      {/* Campaign Fold 02 (100svh) */}
      <section className="relative w-full h-[100svh] flex flex-col justify-between overflow-hidden border-t border-white/10">
        {/* Full-Bleed Dark Editorial Spread Highlighting Bespoke */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=2400&auto=format&fit=crop"
            alt="The World of Bespoke at The Weave Studio"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.45] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        </div>

        {/* Spacer */}
        <div className="h-20" />

        {/* Centered Bespoke Headline & Dual Ghost-Pill CTAs */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 sm:space-y-8 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-white/70">
            THE WORLD OF BESPOKE
          </span>

          <h2 className="font-sans text-4xl sm:text-6xl lg:text-[72px] font-light tracking-[0.18em] uppercase text-white leading-tight max-w-4xl mx-auto">
            CRAFT AN ORIGINAL
          </h2>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-white/70 max-w-xl mx-auto leading-relaxed">
            Collaborate directly with our master artisans in Hyderabad. Configure living fibers, dimensional silhouettes, and personal inscriptions in full 3D.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/bespoke/configure"
              className="w-full sm:w-auto inline-block rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              CONFIGURE IN 3D
            </Link>

            <Link
              href="/bespoke"
              className="w-full sm:w-auto inline-block rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white/70 transition-all duration-500 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              DISCOVER BESPOKE
            </Link>
          </div>
        </div>

        {/* Bottom Colophon Indicator */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
          <span>CHAPTER 02 / BESPOKE</span>
          <span>1-OF-1 PRIVATE COMMISSIONS</span>
        </div>
      </section>

      {/* Continue Your Journey Strip */}
      <ContinueYourJourney />

      {/* Pure Monochrome Footer */}
      <Footer />
    </main>
  );
}
