import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { HERO_IMAGE } from "@/data/atelier";
import { ThreadDivider } from "@/components/motion/ThreadDivider";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
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
            className="object-cover object-center filter brightness-[0.7] contrast-[1.05] scale-100"
          />
          {/* Subtle Top & Bottom Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/25 to-[#0E0D0C]/60" />
        </div>

        {/* Spacer for Fixed Top Navbar */}
        <div className="h-20" />

        {/* Centered Monolithic Typography */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 sm:space-y-8 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-[#C8A87A]">
            THE WEAVE STUDIO PRESENTS
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[76px] font-light tracking-tight text-[#F3EFE6] leading-tight max-w-5xl mx-auto">
            Architecture in Every Loop
          </h1>

          <div className="pt-4">
            <Link
              href="/collections"
              className="btn-stitched px-10 py-4 text-[11px] font-light tracking-[0.24em] uppercase"
            >
              <span className="stitch-dot" />
              <span>DISCOVER COLLECTIONS</span>
            </Link>
          </div>
        </div>

        {/* Bottom Colophon Indicator */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>CHAPTER 01 / EDITIONS</span>
          <span>HYDERABAD BESPOKE ATELIER</span>
        </div>
      </section>

      {/* Atelier Signature Strip between Fold 01 and Fold 02 */}
      <section className="relative w-full bg-[#171513] border-t border-b border-[#F3EFE6]/12 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 text-center space-y-6">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C8A87A] block font-light">
            THE ATELIER CREED
          </span>

          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#F3EFE6] leading-relaxed tracking-wide italic">
            &ldquo;Every piece begins as a single slip knot—pulled by hand in Hyderabad, never hurried by a machine.&rdquo;
          </blockquote>

          <div className="pt-4">
            <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
              THE WEAVE STUDIO &bull; HYDERABAD, INDIA
            </span>
          </div>

          <ThreadDivider className="max-w-xs mx-auto mt-6" />
        </div>
      </section>

      {/* Campaign Fold 02 (100svh) */}
      <section className="relative w-full h-[100svh] flex flex-col justify-between overflow-hidden border-t border-[#F3EFE6]/10">
        {/* Full-Bleed Dark Editorial Spread Highlighting Bespoke */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=2400&auto=format&fit=crop"
            alt="The World of Bespoke at The Weave Studio"
            fill
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/40 to-[#0E0D0C]/65" />
        </div>

        {/* Spacer */}
        <div className="h-20" />

        {/* Centered Bespoke Headline & Dual Stitched CTAs */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 sm:space-y-8 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-[#C8A87A]">
            THE WORLD OF BESPOKE
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-[72px] font-light tracking-tight text-[#F3EFE6] leading-tight max-w-4xl mx-auto">
            Craft an Original
          </h2>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-[#9C9488] max-w-xl mx-auto leading-relaxed">
            Collaborate directly with our master artisans in Hyderabad. Curate living fibers, dimensional silhouettes, and personal inscriptions at The Commission Table.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/bespoke/commission"
              className="btn-stitched px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase"
            >
              <span className="stitch-dot" />
              <span>THE COMMISSION TABLE</span>
            </Link>

            <Link
              href="/bespoke"
              className="w-full sm:w-auto inline-block rounded-full border border-[#F3EFE6]/30 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-[#9C9488] transition-all duration-500 hover:border-[#C8A87A] hover:text-[#F3EFE6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
            >
              DISCOVER BESPOKE
            </Link>
          </div>
        </div>

        {/* Bottom Colophon Indicator */}
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>CHAPTER 02 / BESPOKE</span>
          <span>1-OF-1 PRIVATE COMMISSIONS</span>
        </div>
      </section>

      {/* Continue Your Journey Strip */}
      <ContinueYourJourney />

      {/* Footer */}
      <Footer />
    </main>
  );
}
