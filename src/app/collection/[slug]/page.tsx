import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, Compass, Layers, ShieldCheck } from "lucide-react";
import { COLLECTIONS, getPieceBySlug } from "@/data/atelier";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VaultDrawer } from "@/components/VaultDrawer";
import { PieceCommissionButton } from "@/components/PieceCommissionButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((piece) => ({
    slug: piece.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);

  if (!piece) {
    return {
      title: "Piece Not Found",
    };
  }

  return {
    title: piece.title,
    description: `${piece.subtitle} Handcrafted in Hyderabad over ${piece.specs.handcraftHours}.`,
    openGraph: {
      title: `${piece.title} | The Weave Studio`,
      description: piece.narrative,
      images: [{ url: piece.heroImage }],
    },
  };
}

export default async function CollectionPiecePage({ params }: PageProps) {
  const { slug } = await params;
  const piece = getPieceBySlug(slug);

  if (!piece) {
    notFound();
  }

  // Find adjacent pieces for navigation
  const currentIndex = COLLECTIONS.findIndex((p) => p.slug === piece.slug);
  const nextPiece = COLLECTIONS[(currentIndex + 1) % COLLECTIONS.length];

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-[#F4F1EA]">
      <Navbar />
      <VaultDrawer />

      {/* Top Breadcrumb & Return Bar */}
      <div className="pt-28 sm:pt-32 pb-8 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/#collections"
            className="group inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.25em] uppercase text-[#9A968E] hover:text-[#C6A972] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
          >
            <ArrowLeft strokeWidth={1.25} className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO ARCHIVE</span>
          </Link>

          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C6A972]">
            {piece.editionTag}
          </span>
        </div>
      </div>

      {/* Hero Product Chapter Presentation */}
      <section className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-32">
        <div className="space-y-6 sm:space-y-8 max-w-4xl mb-12 sm:mb-16">
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs tracking-[0.3em] text-[#C6A972]">
              {piece.editionIndex}
            </span>
            <span className="w-12 h-[1px] bg-white/20" />
            <span className="font-sans text-[11px] tracking-[0.25em] text-[#9A968E] uppercase">
              {piece.priceEstimate}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F4F1EA] font-light leading-tight">
            {piece.title}
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#C6A972] italic font-light max-w-2xl">
            {piece.subtitle}
          </p>
        </div>

        {/* Full-Bleed Silhouette Showcase Visual */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#121214] border border-white/10 overflow-hidden mb-16 sm:mb-24">
          <Image
            src={piece.heroImage}
            alt={piece.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Craft Narrative & Commission Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-b border-white/10 pb-20 sm:pb-28">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#9A968E] block">
              THE ARCHITECTURAL NARRATIVE
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#F4F1EA] font-light leading-relaxed">
              {piece.narrative}
            </p>
            <div className="p-6 bg-[#121214] border border-white/10 mt-6">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C6A972] block mb-2">
                ATELIER CRAFT SPECIFICATION
              </span>
              <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed">
                {piece.craftNote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#121214] border border-white/10 p-8 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#C6A972] block">
                COMMISSION THIS SILHOUETTE
              </span>
              <h3 className="font-serif text-2xl text-[#F4F1EA] font-light">
                Initiate Bespoke Configuration
              </h3>
            </div>

            <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed">
              Pre-load this foundational silhouette into our Bespoke Commission Studio to curate custom yarn compositions, measurements, and personalized inscriptions.
            </p>

            <PieceCommissionButton silhouetteId={piece.silhouetteId} />
          </div>
        </div>
      </section>

      {/* Split-Screen The Stitch & Fiber Macro Section */}
      <section className="bg-[#121214] border-t border-b border-white/10 py-24 sm:py-36">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-16 border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C6A972]">
                MACRO RESOLUTION & TACTILITY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA] font-light">
                The Stitch & Fiber
              </h2>
            </div>
            <span className="font-sans text-[10px] tracking-[0.25em] text-[#9A968E] uppercase">
              STUDIO ARCHIVE RESOLUTION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Macro Angle 1 */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-[#0A0A0B] border border-white/10 overflow-hidden">
                <Image
                  src={piece.detailImage}
                  alt={`${piece.title} Detail Weave`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#C6A972] uppercase block">
                  MACRO DETAIL 01
                </span>
                <h4 className="font-serif text-xl text-[#F4F1EA] font-light">
                  Tensile Stitch Matrix
                </h4>
                <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed">
                  Notice the unbroken continuous gauge. Each knot reinforces adjacent loops, producing exceptional dimensional stability.
                </p>
              </div>
            </div>

            {/* Macro Angle 2 */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-[#0A0A0B] border border-white/10 overflow-hidden">
                <Image
                  src={piece.macroImage}
                  alt={`${piece.title} Fiber Macro`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#C6A972] uppercase block">
                  MACRO DETAIL 02
                </span>
                <h4 className="font-serif text-xl text-[#F4F1EA] font-light">
                  Living Fiber Texture
                </h4>
                <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed">
                  Pure natural unbleached or mineral-dyed threads that interact dynamically with ambient natural light.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Provenance Specification Grid */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-16 border-b border-white/10 pb-8">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C6A972] block mb-2">
            PROVENANCE LEDGER
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F4F1EA] font-light">
            Architectural Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-8 border border-white/10 bg-[#121214] space-y-3">
            <div className="flex items-center gap-3 text-[#C6A972]">
              <Clock strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E]">
                HANDCRAFT TIME
              </span>
            </div>
            <span className="font-serif text-3xl text-[#F4F1EA] font-light block">
              {piece.specs.handcraftHours}
            </span>
            <p className="font-sans text-xs text-[#9A968E] font-light">
              Calculated single-hook artisan time devoted solely to loop tension and structure.
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-[#121214] space-y-3">
            <div className="flex items-center gap-3 text-[#C6A972]">
              <Layers strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E]">
                FIBER COMPOSITION
              </span>
            </div>
            <span className="font-serif text-2xl text-[#F4F1EA] font-light block">
              {piece.specs.fiberComposition}
            </span>
            <p className="font-sans text-xs text-[#9A968E] font-light">
              Zero synthetic fillers. Verified single-origin organic or mercerized raw threads.
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-[#121214] space-y-3">
            <div className="flex items-center gap-3 text-[#C6A972]">
              <Compass strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E]">
                STITCH TECHNIQUE
              </span>
            </div>
            <span className="font-serif text-2xl text-[#F4F1EA] font-light block">
              {piece.specs.stitchTechnique}
            </span>
            <p className="font-sans text-xs text-[#9A968E] font-light">
              Proprietary atelier tensions guaranteeing shape memory through decades of use.
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-[#121214] space-y-3">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E] block">
              DIMENSIONS
            </span>
            <span className="font-serif text-2xl text-[#F4F1EA] font-light block">
              {piece.specs.dimensions}
            </span>
            <p className="font-sans text-xs text-[#9A968E] font-light">
              Measured at resting state. Bespoke modifications available via consultation.
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-[#121214] space-y-3">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E] block">
              COMMISSION LEAD TIME
            </span>
            <span className="font-serif text-2xl text-[#C6A972] font-light block">
              {piece.specs.leadTime}
            </span>
            <p className="font-sans text-xs text-[#9A968E] font-light">
              From yarn conditioning through final hand-finishing and cedar packing.
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-[#121214] space-y-3">
            <div className="flex items-center gap-3 text-[#C6A972]">
              <ShieldCheck strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E]">
                AUTHENTICITY SEAL
              </span>
            </div>
            <span className="font-serif text-2xl text-[#F4F1EA] font-light block">
              Numbered Archive Plate
            </span>
            <p className="font-sans text-xs text-[#9A968E] font-light">
              Hand-engraved provenance seal and bound atelier certificate of origin.
            </p>
          </div>
        </div>

        {/* Next Piece Chapter Link */}
        <div className="mt-20 pt-12 border-t border-white/10 flex items-center justify-between">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E]">
            NEXT ARCHITECTURAL PIECE
          </span>

          <Link
            href={`/collection/${nextPiece.slug}`}
            className="group flex items-center gap-3 font-serif text-xl sm:text-2xl text-[#F4F1EA] hover:text-[#C6A972] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
          >
            <span className="italic">{nextPiece.title}</span>
            <ArrowRight strokeWidth={1.25} className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-500" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
