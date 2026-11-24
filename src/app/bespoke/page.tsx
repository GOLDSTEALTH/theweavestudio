import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";

export const metadata: Metadata = {
  title: "The World of Bespoke — An Introduction to Possibility",
  description:
    "Private one-of-one commissions, bespoke proportioning, yarn swatch folios, and direct artisan collaboration at The Weave Studio.",
};

export default function BespokePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <Navbar />
      <VaultDrawer />

      {/* Cinematic Hero */}
      <section className="relative w-full h-[90svh] min-h-[660px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=2400&auto=format&fit=crop"
            alt="The World of Bespoke - The Weave Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.52] contrast-[1.10]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        </div>

        <div className="h-20" />

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-white/70">
            AN INTRODUCTION TO POSSIBILITY
          </span>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-[70px] font-light tracking-[0.18em] uppercase text-white leading-tight max-w-4xl mx-auto">
            THE WORLD OF BESPOKE
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-white/70 max-w-xl mx-auto leading-relaxed">
            In our private office, there are no predefined boundaries. Every commission begins with an open conversation, a blank folio, and unspun natural fibers.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/bespoke/configure"
              className="rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              ENTER 3D CONFIGURATOR
            </Link>
            <Link
              href="/patronage#concierge"
              className="rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white/70 transition-all duration-500 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              REQUEST PRIVATE CONSULTATION
            </Link>
          </div>
        </div>

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
          <span>CHAPTER BESPOKE / MMXXIV</span>
          <span>HYDERABAD PRIVATE OFFICE</span>
        </div>
      </section>

      {/* PRIVATE OFFICE Editorial Split Section */}
      <section id="private-office" className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              THE PRIVATE OFFICE
            </span>

            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase leading-snug">
              ONE-ON-ONE ARTISAN CONSULTATIONS
            </h2>

            <div className="border-l border-white/25 pl-6 py-2 my-6">
              <p className="font-sans text-xs sm:text-sm font-light text-white/80 leading-relaxed">
                &ldquo;Bespoke is not a customization menu. It is an unhurried communion between a patron&apos;s spatial vision and an artisan&apos;s single hook.&rdquo;
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm font-light text-white/60 leading-relaxed">
              When engaging The Weave Studio for a bespoke private commission, you are assigned a dedicated master artisan. We begin by dispatching our curated <strong>Yarn Swatch Box</strong> directly to your residence, featuring 5cm tactile fiber discs in raw Belgian linen, high-altitude merino, and mercerized Giza cotton.
            </p>

            <div className="space-y-4 pt-4 text-xs font-light text-white/70">
              <div className="flex items-start gap-4">
                <span className="text-white font-normal">01 /</span>
                <div>
                  <strong className="text-white block font-normal uppercase tracking-wider mb-1">PROPORTION &amp; SCALE CALIBRATION</strong>
                  <span>Every wall tapestry, tote handle drop, and floral stem height is modified to your exact architectural space.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-white font-normal">02 /</span>
                <div>
                  <strong className="text-white block font-normal uppercase tracking-wider mb-1">BESPOKE COLOR MATCHING</strong>
                  <span>We formulate custom botanical and low-impact mineral dye vats to match residential finishes or yacht palettes.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-white font-normal">03 /</span>
                <div>
                  <strong className="text-white block font-normal uppercase tracking-wider mb-1">BOUND PROVENANCE LEDGER</strong>
                  <span>Each finished piece includes a calfskin-bound certificate documenting the artisan, craft hours, and yarn harvest.</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/patronage#concierge"
                className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.22em] uppercase text-white hover:underline focus-visible:outline-none"
              >
                <span>COMMISSION WITH PRIVATE CONCIERGE</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full bg-[#151515] border border-white/15 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop"
                alt="Bespoke Yarn Swatch and Artisan Consultation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.88]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ONE-OF-ONE COMMISSIONS Full-Width Showcase */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-b border-white/15 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              ARCHIVE SHOWCASE
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
              ONE-OF-ONE COMMISSIONS
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-light">
            PRIVATE ARCHIVES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-6">
            <div className="relative aspect-[16/10] w-full bg-[#151515] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1400&auto=format&fit=crop"
                alt="Bespoke Acoustic Tapestry Commission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.85] hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="border-l border-white/25 pl-6 space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-light block">
                COMMISSION NO. 08 — RESIDENTIAL WALLWORK
              </span>
              <h3 className="font-sans text-xl text-white font-light tracking-[0.16em] uppercase">
                The Obsidian &amp; Alabaster Acoustic Diptych
              </h3>
              <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
                Hand-knotted from high-altitude Ladakhi merino over 160 hours to absorb resonant frequencies in a minimalist concrete gallery.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-[16/10] w-full bg-[#151515] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1400&auto=format&fit=crop"
                alt="Bespoke Botanical Floral Commission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.85] hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="border-l border-white/25 pl-6 space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-light block">
                COMMISSION NO. 14 — BOTANICAL SCULPTURE
              </span>
              <h3 className="font-sans text-xl text-white font-light tracking-[0.16em] uppercase">
                The Véridique Grand Centrepiece
              </h3>
              <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
                Immortalized botanicals hand-tensioned from Japanese washi bark yarn and fine brass armature, mounted in hand-thrown volcanic stoneware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "3D BOUQUET CONFIGURATOR",
            description: "Interact with living fiber swatches and reactive studio lighting in real-time 3D.",
            href: "/bespoke/configure",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "BESPOKE CRAFT DISCIPLINE",
            description: "Deep dive into 0.75mm steel gauge precision, tension metrology, and natural fibers.",
            href: "/bespoke/craft",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "HYDERABAD PROVENANCE & VAULT",
            description: "Inspect finished 1-of-1 creations resting in the atelier vault ready for immediate handover.",
            href: "/provenance",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
