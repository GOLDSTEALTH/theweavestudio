import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MessageSquare, ArrowUpRight, ShieldCheck, BookOpen, Key } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { VAULT_PIECES, createWhatsAppVaultLink } from "@/data/atelier";
import { WeaveReveal } from "@/components/motion/WeaveReveal";

export const metadata: Metadata = {
  title: "Provenance & Private Vault — Crafted Once. Coveted Forever.",
  description:
    "Explore The Weave Studio's authenticity registry, engraved metal seals, Hyderabad archive ledger, and immediately available 1-of-1 finished creations.",
};

export default function ProvenancePage() {
  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
      <Navbar />
      <VaultDrawer />

      {/* Editorial Hero */}
      <section className="hero-cinema relative w-full h-[85svh] min-h-[640px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop"
            alt="The Weave Studio Provenance and Vault"
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
            CRAFTED ONCE. COVETED FOREVER.
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[70px] font-light tracking-tight uppercase text-[#F3EFE6] leading-tight max-w-4xl mx-auto">
            Provenance &amp; Vault
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-[#9C9488] max-w-xl mx-auto leading-relaxed">
            Every edition that departs our Hyderabad atelier is cataloged permanently in our historical ledger. Here you will find singular 1-of-1 creations completed and preserved for immediate private acquisition.
          </p>

          <div className="pt-4">
            <Link
              href="#vault-gallery"
              className="btn-stitched px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase"
            >
              <span className="stitch-dot" />
              <span>VIEW AVAILABLE 1-OF-1 PIECES</span>
            </Link>
          </div>
        </div>

        <div className="hero-colophon relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>THE WEAVE STUDIO ARCHIVE</span>
          <span>HYDERABAD REGISTRY</span>
        </div>
      </section>

      {/* Studio Authenticity Section */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-[#F3EFE6]/12">
        <div className="border-b border-[#F3EFE6]/12 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              IMMUTABLE AUTHENTICITY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase">
              The Three Seals of Provenance
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#9C9488] uppercase font-light">
            LIFETIME VERIFICATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="p-8 border border-[#F3EFE6]/12 bg-[#171513] rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-full border border-[#C8A87A]/40 flex items-center justify-center text-[#C8A87A]">
              <ShieldCheck className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
              Hand-Engraved Serial Plate
            </h3>
            <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
              Every creation receives a solid brass or sterling silver seal hand-engraved with its unique edition number, stitched directly into the interior structural seam.
            </p>
          </div>

          <div className="p-8 border border-[#F3EFE6]/12 bg-[#171513] rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-full border border-[#C8A87A]/40 flex items-center justify-center text-[#C8A87A]">
              <BookOpen className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
              The Hyderabad Studio Ledger
            </h3>
            <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
              We maintain an archival ledger recording the artisan&apos;s signature, exact hours spent, yarn harvest lot code, and client dedication in permanent archival ink.
            </p>
          </div>

          <div className="p-8 border border-[#F3EFE6]/12 bg-[#171513] rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-full border border-[#C8A87A]/40 flex items-center justify-center text-[#C8A87A]">
              <Key className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
              Cedar Presentation Vault
            </h3>
            <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
              Finished editions are dispatched in custom-crafted cedarwood presentation boxes lined with unbleached organic muslin for generational moisture and moth defense.
            </p>
          </div>
        </div>
      </section>

      {/* Full-Page Gallery of All VAULT_PIECES */}
      <section id="vault-gallery" className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-b border-[#F3EFE6]/12 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              FINISHED 1-OF-1 CREATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase">
              The Studio Vault Collection
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#9C9488] uppercase font-light">
            03 MASTERWORKS RESTING IN HYDERABAD
          </span>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {VAULT_PIECES.map((piece, idx) => {
            const isEven = idx % 2 === 0;
            const reserveUrl = createWhatsAppVaultLink(piece);

            return (
              <article
                key={piece.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border border-[#F3EFE6]/12 bg-[#171513] rounded-2xl p-6 sm:p-10 ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Visual */}
                <div
                  className={`relative aspect-[4/3] w-full bg-[#201D1A] overflow-hidden rounded-xl border border-[#F3EFE6]/10 ${
                    isEven ? "lg:col-span-6" : "lg:col-span-6 lg:col-start-7"
                  }`}
                >
                  <WeaveReveal delay={idx * 0.1} className="w-full h-full">
                    <Image
                      src={piece.image}
                      alt={piece.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center filter brightness-[0.92] hover:scale-105 transition-transform duration-700"
                    />
                  </WeaveReveal>
                  <div className="absolute top-4 left-4">
                    <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#F3EFE6] bg-[#0E0D0C]/80 backdrop-blur-md px-3 py-1 border border-[#F3EFE6]/15 font-light">
                      {piece.editionCode}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div
                  className={`space-y-6 ${
                    isEven ? "lg:col-span-6" : "lg:col-span-6 lg:col-start-1"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#C8A87A] text-[10px] tracking-[0.25em] uppercase font-light">
                      <span>STATUS: {piece.status}</span>
                      <span>HYDERABAD VAULT</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFE6] font-light tracking-wide">
                      {piece.title}
                    </h3>
                    <p className="font-sans text-xs text-[#9C9488] font-light">
                      {piece.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
                    {piece.description}
                  </p>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 gap-3 text-xs border-t border-[#F3EFE6]/10 pt-4">
                    <div className="p-3 bg-[#0E0D0C]/40 border border-[#F3EFE6]/5 rounded-lg space-y-1">
                      <span className="text-[#9C9488] block uppercase tracking-wider text-[9px] font-light">DIMENSIONS</span>
                      <span className="text-[#F3EFE6] font-light">{piece.dimensions}</span>
                    </div>
                    <div className="p-3 bg-[#0E0D0C]/40 border border-[#F3EFE6]/5 rounded-lg space-y-1">
                      <span className="text-[#9C9488] block uppercase tracking-wider text-[9px] font-light">TECHNIQUE</span>
                      <span className="text-[#F3EFE6] font-light">{piece.technique}</span>
                    </div>
                    <div className="p-3 bg-[#0E0D0C]/40 border border-[#F3EFE6]/5 rounded-lg space-y-1">
                      <span className="text-[#9C9488] block uppercase tracking-wider text-[9px] font-light">FIBER MATRICES</span>
                      <span className="text-[#F3EFE6] font-light truncate block">{piece.fiber}</span>
                    </div>
                    <div className="p-3 bg-[#0E0D0C]/40 border border-[#F3EFE6]/5 rounded-lg space-y-1">
                      <span className="text-[#9C9488] block uppercase tracking-wider text-[9px] font-light">HANDCRAFT HOURS</span>
                      <span className="text-[#F3EFE6] font-light">{piece.handcraftHours}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#F3EFE6]/10">
                    <div>
                      <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                        ACQUISITION VALUE
                      </span>
                      <span className="font-serif text-2xl text-[#F3EFE6] font-light tracking-wide">
                        {piece.priceINR}
                      </span>
                    </div>

                    <a
                      href={reserveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-[#F3EFE6] text-[#0E0D0C] hover:bg-white px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase transition-all shadow-md"
                    >
                      <MessageSquare strokeWidth={1.25} className="w-4 h-4 text-[#0E0D0C]" />
                      <span>RESERVE VIA CONCIERGE</span>
                      <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5 text-[#0E0D0C]" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "ATELIER BOUTIQUE",
            description: "Explore ready-to-ship luxury objects and accessories across home, evening, and botanical lines.",
            href: "/boutique",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "THE WORLD OF BESPOKE",
            description: "Initiate a tailored one-on-one commission engineered to your exact interior measurements.",
            href: "/bespoke",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "CARE & PATRONAGE",
            description: "Review lifetime preservation protocols, international courier handling, and studio visits.",
            href: "/patronage",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
