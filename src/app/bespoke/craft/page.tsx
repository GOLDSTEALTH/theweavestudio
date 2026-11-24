import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { CraftsmanshipSection } from "@/components/CraftsmanshipSection";
import { BESPOKE_OPTIONS } from "@/data/atelier";

export const metadata: Metadata = {
  title: "Bespoke Craft — Unburdened by Limitations",
  description:
    "Explore the tactile material library, 0.75mm steel tolerances, and unbroken single-hook tension metrology at The Weave Studio.",
};

export default function BespokeCraftPage() {
  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
      <Navbar />
      <VaultDrawer />

      {/* Editorial Hero */}
      <section className="hero-cinema relative w-full h-[85svh] min-h-[640px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=2400&auto=format&fit=crop"
            alt="Bespoke Craft at The Weave Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.52] contrast-[1.08]"
          />
          <div className="hero-vignette absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/35 to-[#0E0D0C]/60" />
        </div>

        <div className="h-20" />

        <div className="hero-photo-text relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-[#C8A87A]">
            UNBURDENED BY LIMITATIONS
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[72px] font-light tracking-tight text-[#F3EFE6] leading-tight max-w-4xl mx-auto">
            Bespoke Craft
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-[#9C9488] max-w-xl mx-auto leading-relaxed">
            Every stitch is an immutable tensile calculation. Explore the raw materiality, hook tolerances, and permanent archival records that define our atelier.
          </p>

          <div className="pt-4">
            <Link
              href="/bespoke/commission"
              className="btn-stitched px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase"
            >
              <span className="stitch-dot" />
              <span>THE COMMISSION TABLE</span>
            </Link>
          </div>
        </div>

        <div className="hero-colophon relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>THE WEAVE STUDIO</span>
          <span>METROLOGY &amp; MATERIALS</span>
        </div>
      </section>

      {/* Sticky Split-Screen Craftsmanship Section (3 Pillars) */}
      <CraftsmanshipSection />

      {/* Material Library 4-Column Hairline Grid */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-b border-[#F3EFE6]/12 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              MATERIAL ARCHIVE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase">
              The Material Library
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#9C9488] uppercase font-light">
            04 CURATED FIBERS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BESPOKE_OPTIONS.fibers.map((fiber) => (
            <div
              key={fiber.id}
              className="p-8 border border-[#F3EFE6]/12 bg-[#171513] rounded-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Fiber Swatch Disc Tone */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-7 h-7 rounded-full border border-[#F3EFE6]/25 shadow-sm"
                    style={{ backgroundColor: fiber.swatchTone }}
                  />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#C8A87A] font-light">
                    RAW SKEIN
                  </span>
                </div>

                <h3 className="font-sans text-base text-[#F3EFE6] font-light tracking-[0.16em] uppercase">
                  {fiber.name}
                </h3>

                <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
                  {fiber.description}
                </p>
              </div>

              {/* Origin & Tactile Notes */}
              <div className="pt-4 border-t border-[#F3EFE6]/10 space-y-2 text-[11px] font-sans">
                <div>
                  <span className="text-[#9C9488]/60 block uppercase tracking-wider text-[9px] font-light">ORIGIN</span>
                  <span className="text-[#F3EFE6] font-light">{fiber.origin}</span>
                </div>
                <div>
                  <span className="text-[#9C9488]/60 block uppercase tracking-wider text-[9px] font-light">TACTILE HAND</span>
                  <span className="text-[#F3EFE6] font-light">{fiber.feel}</span>
                </div>
                <div>
                  <span className="text-[#9C9488]/60 block uppercase tracking-wider text-[9px] font-light">DRAPE DYNAMICS</span>
                  <span className="text-[#F3EFE6] font-light">{fiber.drape}</span>
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
            description: "Curate living fibers, hand-dyed palettes, and bespoke dimensions at The Commission Table.",
            href: "/bespoke/commission",
            image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "SIGNATURE EDITIONS SHOWROOM",
            description: "Review all four foundational silhouettes crafted to order in our Hyderabad studio.",
            href: "/collections",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "PATRONAGE & HEIRLOOM CARE",
            description: "Learn about lifetime restoration, cedar storage cases, and international white-glove transport.",
            href: "/patronage",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
