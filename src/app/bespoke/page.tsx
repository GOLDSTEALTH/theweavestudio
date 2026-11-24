import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { WeaveReveal } from "@/components/motion/WeaveReveal";

export const metadata: Metadata = {
  title: "The World of Bespoke — An Introduction to Possibility",
  description:
    "Private one-of-one commissions, bespoke proportioning, yarn swatch folios, and direct artisan collaboration at The Weave Studio.",
};

export default function BespokePage() {
  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
      <Navbar />
      <VaultDrawer />

      {/* Cinematic Hero */}
      <section className="hero-cinema relative w-full h-[90svh] min-h-[660px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=2400&auto=format&fit=crop"
            alt="The World of Bespoke - The Weave Studio"
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
            AN INTRODUCTION TO POSSIBILITY
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[72px] font-light tracking-tight text-[#F3EFE6] leading-tight max-w-4xl mx-auto">
            The World of Bespoke
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-[#9C9488] max-w-xl mx-auto leading-relaxed">
            In our private office, there are no predefined boundaries. Every commission begins with an open conversation, a blank folio, and unspun natural fibers.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/bespoke/commission"
              className="btn-stitched px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase"
            >
              <span className="stitch-dot" />
              <span>THE COMMISSION TABLE</span>
            </Link>
            <Link
              href="/patronage#concierge"
              className="rounded-full border border-[#F3EFE6]/30 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-[#9C9488] transition-all duration-500 hover:border-[#C8A87A] hover:text-[#F3EFE6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
            >
              REQUEST PRIVATE CONSULTATION
            </Link>
          </div>
        </div>

        <div className="hero-colophon relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>CHAPTER BESPOKE</span>
          <span>HYDERABAD PRIVATE OFFICE</span>
        </div>
      </section>

      {/* PRIVATE OFFICE Editorial Split Section */}
      <section id="private-office" className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-[#F3EFE6]/12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              THE PRIVATE OFFICE
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase leading-snug">
              One-on-One Artisan Consultations
            </h2>

            <div className="border-l border-[#C8A87A]/50 pl-6 py-2 my-6">
              <p className="font-serif text-lg font-light text-[#F3EFE6]/90 leading-relaxed italic">
                &ldquo;Bespoke is not a customization menu. It is an unhurried communion between a patron&apos;s spatial vision and an artisan&apos;s single hook.&rdquo;
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm font-light text-[#9C9488] leading-relaxed">
              When engaging The Weave Studio for a bespoke private commission, you are assigned a dedicated master artisan. We begin by dispatching our curated <strong>Yarn Swatch Box</strong> directly to your residence, featuring 5cm tactile fiber discs in raw Belgian linen, high-altitude merino, and mercerized Giza cotton.
            </p>

            <div className="space-y-4 pt-4 text-xs font-light text-[#9C9488]">
              <div className="flex items-start gap-4">
                <span className="text-[#C8A87A] font-normal">01 /</span>
                <div>
                  <strong className="text-[#F3EFE6] block font-normal uppercase tracking-wider mb-1">PROPORTION &amp; SCALE CALIBRATION</strong>
                  <span>Every wall tapestry, tote handle drop, and floral stem height is modified to your exact architectural space.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[#C8A87A] font-normal">02 /</span>
                <div>
                  <strong className="text-[#F3EFE6] block font-normal uppercase tracking-wider mb-1">BESPOKE COLOR MATCHING</strong>
                  <span>We formulate custom botanical and low-impact mineral dye vats to match residential finishes or private interior palettes.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[#C8A87A] font-normal">03 /</span>
                <div>
                  <strong className="text-[#F3EFE6] block font-normal uppercase tracking-wider mb-1">BOUND PROVENANCE LEDGER</strong>
                  <span>Each finished piece includes a registered certificate documenting the artisan, craft hours, and yarn harvest.</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/patronage#concierge"
                className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.22em] uppercase text-[#C8A87A] hover:underline focus-visible:outline-none"
              >
                <span>COMMISSION WITH PRIVATE CONCIERGE</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <WeaveReveal className="relative aspect-[4/5] w-full bg-[#171513] border border-[#F3EFE6]/15 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop"
                alt="Bespoke Yarn Swatch and Artisan Consultation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.92]"
              />
            </WeaveReveal>
          </div>
        </div>
      </section>

      {/* ONE-OF-ONE COMMISSIONS Full-Width Showcase */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-b border-[#F3EFE6]/12 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              ARCHIVE SHOWCASE
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase">
              One-of-One Commissions
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#9C9488] uppercase font-light">
            PRIVATE ARCHIVES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          <div className="space-y-6">
            <WeaveReveal className="relative aspect-[16/10] w-full bg-[#171513] rounded-xl overflow-hidden border border-[#F3EFE6]/10">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=85&w=1400&auto=format&fit=crop"
                alt="Bespoke Acoustic Tapestry Commission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.9] hover:scale-105 transition-transform duration-700"
              />
            </WeaveReveal>
            <div className="border-l border-[#C8A87A]/50 pl-6 space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8A87A] font-light block">
                COMMISSION NO. 08 — RESIDENTIAL WALLWORK
              </span>
              <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
                The Obsidian &amp; Alabaster Acoustic Diptych
              </h3>
              <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
                Hand-knotted from high-altitude Ladakhi merino over 160 hours to absorb resonant frequencies in a minimalist concrete gallery.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <WeaveReveal delay={0.2} className="relative aspect-[16/10] w-full bg-[#171513] rounded-xl overflow-hidden border border-[#F3EFE6]/10">
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1400&auto=format&fit=crop"
                alt="Bespoke Botanical Floral Commission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center filter brightness-[0.9] hover:scale-105 transition-transform duration-700"
              />
            </WeaveReveal>
            <div className="border-l border-[#C8A87A]/50 pl-6 space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8A87A] font-light block">
                COMMISSION NO. 14 — BOTANICAL SCULPTURE
              </span>
              <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
                The Véridique Grand Centrepiece
              </h3>
              <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
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
            title: "THE COMMISSION TABLE",
            description: "Curate living fibers, hand-dyed palettes, and bespoke dimensions at The Commission Table.",
            href: "/bespoke/commission",
            image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=85&w=1200&auto=format&fit=crop",
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
