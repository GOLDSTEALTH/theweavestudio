import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { ATELIER_STORIES, ATELIER_CONFIG } from "@/data/atelier";
import { WeaveReveal } from "@/components/motion/WeaveReveal";

export const metadata: Metadata = {
  title: "The Atelier — Inspiring Permanence",
  description:
    "Inside The Weave Studio's Hyderabad atelier. Uncompromising hand tension, long-staple Giza fiber provenance, and the immutable studio archive ledger.",
};

export default function AtelierPage() {
  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
      <Navbar />
      <VaultDrawer />

      {/* Hero: Inspiring Permanence */}
      <section className="relative w-full h-[85svh] min-h-[640px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop"
            alt="The Weave Studio Atelier Hyderabad"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.55] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/30 to-[#0E0D0C]/60" />
        </div>

        <div className="h-20" />

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-[#C8A87A]">
            THE ATELIER — INSPIRING PERMANENCE
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[70px] font-light tracking-tight text-[#F3EFE6] leading-tight max-w-4xl mx-auto">
            The Sanctuary of the Single Hook
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-[#9C9488] max-w-xl mx-auto leading-relaxed">
            Founded in Hyderabad, The Weave Studio preserves the unhurried discipline of haute crochet. A dedication to structural geometry, living natural fibers, and generational permanence.
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

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>{ATELIER_CONFIG.studioName} / {ATELIER_CONFIG.founded}</span>
          <span>HYDERABAD, INDIA</span>
        </div>
      </section>

      {/* Brand Manifesto Overview Section */}
      <section className="py-24 sm:py-32 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-[#F3EFE6]/12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              THE MANIFESTO
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase leading-snug">
              Why Crochet Remains Uncomputable
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm font-light leading-relaxed text-[#9C9488]">
            <p className="font-serif text-lg sm:text-xl text-[#F3EFE6] leading-relaxed">
              Every revolution in textiles over the past two centuries has been driven by automation—from the Jacquard loom to modern flatbed computerized knitting. Yet crochet stands solitary. No machine on Earth can execute a single double-crochet loop through an existing stitch.
            </p>
            <p>
              This computational impossibility is our greatest privilege. It ensures that every centimeter of fabric leaving The Weave Studio is an undivided document of human muscle memory. Over eighty to one hundred fifty hours, an artisan maintains unwavering tension tolerances, crafting objects of monumental architectural authority.
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetric Full-Width Feature Story Section (ATELIER SERIES) */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 space-y-28 sm:space-y-40">
        <div className="border-b border-[#F3EFE6]/12 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              ATELIER SERIES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase">
              Chronicles of Craft
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#9C9488] uppercase font-light">
            04 CHAPTERS
          </span>
        </div>

        {ATELIER_STORIES.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <article
              key={story.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                isEven ? "" : "lg:grid-flow-dense"
              }`}
            >
              {/* Photo Column */}
              <div
                className={`relative aspect-[4/3] sm:aspect-[16/10] w-full bg-[#171513] border border-[#F3EFE6]/12 overflow-hidden rounded-2xl ${
                  isEven ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-6"
                }`}
              >
                <WeaveReveal delay={idx * 0.1} className="w-full h-full">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center filter brightness-[0.92] hover:scale-105 transition-transform duration-700"
                  />
                </WeaveReveal>
              </div>

              {/* Editorial Text Column */}
              <div
                className={`space-y-6 ${
                  isEven ? "lg:col-span-5" : "lg:col-span-5 lg:col-start-1"
                }`}
              >
                <div className="flex items-center gap-3 text-[#C8A87A] font-light text-xs tracking-[0.28em] uppercase">
                  <span>CHAPTER {story.number}</span>
                  <span>/</span>
                  <span>{story.tag}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F3EFE6] font-light tracking-wide leading-snug">
                  {story.title}
                </h3>

                <p className="font-serif text-base font-light text-[#F3EFE6]/90 italic leading-relaxed">
                  {story.subtitle}
                </p>

                <div className="border-l border-[#C8A87A]/50 pl-6 py-2 my-6">
                  <p className="font-serif text-lg font-light tracking-wide text-[#F3EFE6] leading-relaxed italic">
                    &ldquo;{story.pullquote}&rdquo;
                  </p>
                </div>

                <div className="space-y-4 text-xs font-light text-[#9C9488] leading-relaxed">
                  {story.body.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "SIGNATURE EDITIONS SHOWROOM",
            description: "Explore the four foundational numbered silhouettes handcrafted to client commission.",
            href: "/collections",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "THE WORLD OF BESPOKE",
            description: "Step into our bespoke commissioning house and understand private one-on-one appointments.",
            href: "/bespoke",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "THE CRAFTSMANSHIP DISCIPLINE",
            description: "Examine our tactile material library, living fibers, and structural tension metrology.",
            href: "/bespoke/craft",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
