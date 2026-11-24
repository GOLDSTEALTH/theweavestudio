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

export const metadata: Metadata = {
  title: "Provenance & Private Vault — Crafted Once. Coveted Forever.",
  description:
    "Explore The Weave Studio's authenticity registry, engraved metal seals, Hyderabad archive ledger, and immediately available 1-of-1 finished creations.",
};

export default function ProvenancePage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <Navbar />
      <VaultDrawer />

      {/* Editorial Hero */}
      <section className="relative w-full h-[85svh] min-h-[640px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop"
            alt="The Weave Studio Provenance and Vault"
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
            CRAFTED ONCE. COVETED FOREVER.
          </span>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-[70px] font-light tracking-[0.18em] uppercase text-white leading-tight max-w-4xl mx-auto">
            PROVENANCE &amp; VAULT
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-white/70 max-w-xl mx-auto leading-relaxed">
            Every edition that departs our Hyderabad atelier is cataloged permanently in our historical ledger. Here you will find singular 1-of-1 creations completed and preserved for immediate private acquisition.
          </p>

          <div className="pt-4">
            <Link
              href="#vault-gallery"
              className="inline-block rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              VIEW AVAILABLE 1-OF-1 PIECES
            </Link>
          </div>
        </div>

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
          <span>THE WEAVE STUDIO ARCHIVE</span>
          <span>HYDERABAD REGISTRY</span>
        </div>
      </section>

      {/* Studio Authenticity Section */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-white/15">
        <div className="border-b border-white/15 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              IMMUTABLE AUTHENTICITY
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
              THE THREE SEALS OF PROVENANCE
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-light">
            LIFETIME VERIFICATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="p-8 border border-white/15 bg-[#151515] space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-sans text-lg text-white font-light tracking-[0.16em] uppercase">
              Hand-Engraved Serial Plate
            </h3>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Every creation receives a solid brass or sterling silver seal hand-engraved with its unique edition number, stitched directly into the interior structural seam.
            </p>
          </div>

          <div className="p-8 border border-white/15 bg-[#151515] space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-sans text-lg text-white font-light tracking-[0.16em] uppercase">
              The Hyderabad Studio Ledger
            </h3>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              We maintain a calfskin ledger recording the artisan&apos;s signature, exact hours spent, yarn harvest lot code, and client dedication in permanent archival ink.
            </p>
          </div>

          <div className="p-8 border border-white/15 bg-[#151515] space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
              <Key className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-sans text-lg text-white font-light tracking-[0.16em] uppercase">
              Cedar Presentation Vault
            </h3>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Finished editions are dispatched in custom-crafted cedarwood presentation boxes lined with unbleached organic muslin for generational moisture and moth defense.
            </p>
          </div>
        </div>
      </section>

      {/* Full-Page Gallery of All VAULT_PIECES */}
      <section id="vault-gallery" className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-b border-white/15 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              FINISHED 1-OF-1 CREATIONS
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
              THE PRIVATE VAULT EDITIONS
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-light">
            READY FOR DISPATCH
          </span>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {VAULT_PIECES.map((piece, idx) => {
            const reserveUrl = createWhatsAppVaultLink(piece);
            const isEven = idx % 2 === 0;

            return (
              <article
                key={piece.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border border-white/15 bg-[#151515] p-6 sm:p-10 ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Large Portrait Photography */}
                <div
                  className={`relative aspect-[4/5] w-full bg-[#1E1E1E] overflow-hidden ${
                    isEven ? "lg:col-span-5" : "lg:col-span-5 lg:col-start-8"
                  }`}
                >
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center filter brightness-[0.92] hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 px-3 py-1 border border-white/20">
                    <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/80 font-light">
                      {piece.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Narrative, Specs & Acquisition Actions */}
                <div
                  className={`space-y-6 ${
                    isEven ? "lg:col-span-7" : "lg:col-span-7 lg:col-start-1"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-light tracking-[0.28em] uppercase text-white/40 block">
                      {piece.editionCode}
                    </span>
                    <h3 className="font-sans text-2xl sm:text-3xl text-white font-light tracking-[0.16em] uppercase">
                      {piece.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-white/70 font-light italic">
                      {piece.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {piece.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-[11px] font-sans">
                    <div className="p-3 bg-black/40 border border-white/5 space-y-1">
                      <span className="text-white/40 block uppercase tracking-wider text-[9px] font-light">DIMENSIONS</span>
                      <span className="text-white font-light">{piece.dimensions}</span>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 space-y-1">
                      <span className="text-white/40 block uppercase tracking-wider text-[9px] font-light">FIBER MATRICES</span>
                      <span className="text-white font-light truncate block">{piece.fiber}</span>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 space-y-1">
                      <span className="text-white/40 block uppercase tracking-wider text-[9px] font-light">HANDCRAFT HOURS</span>
                      <span className="text-white font-light">{piece.handcraftHours}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
                    <div>
                      <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-white/40 font-light">
                        ACQUISITION VALUE
                      </span>
                      <span className="font-sans text-2xl text-white font-light tracking-wide">
                        {piece.priceINR}
                      </span>
                    </div>

                    <a
                      href={reserveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
                    >
                      <MessageSquare strokeWidth={1.25} className="w-4 h-4" />
                      <span>RESERVE VIA CONCIERGE</span>
                      <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
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
