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
import { ContinueYourJourney } from "@/components/ContinueYourJourney";

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
    title: `${piece.title} | The Weave Studio`,
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

  const currentIndex = COLLECTIONS.findIndex((p) => p.slug === piece.slug);
  const nextPiece = COLLECTIONS[(currentIndex + 1) % COLLECTIONS.length];

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <Navbar />
      <VaultDrawer />

      {/* Top Breadcrumb & Return Bar */}
      <div className="pt-28 sm:pt-32 pb-8 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between border-b border-white/15 pb-6">
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2.5 font-sans text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          >
            <ArrowLeft strokeWidth={1.25} className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO COLLECTIONS</span>
          </Link>

          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 font-light">
            {piece.editionTag}
          </span>
        </div>
      </div>

      {/* Hero Product Chapter Presentation */}
      <section className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-32">
        <div className="space-y-6 sm:space-y-8 max-w-4xl mb-12 sm:mb-16">
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs tracking-[0.25em] text-white/50 font-light">
              {piece.editionIndex}
            </span>
            <span className="w-12 h-[1px] bg-white/20" />
            <span className="font-sans text-[11px] tracking-[0.25em] text-white/70 uppercase font-light">
              {piece.priceEstimate}
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-[0.16em] uppercase leading-tight">
            {piece.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/70 font-light tracking-wide max-w-2xl leading-relaxed">
            {piece.subtitle}
          </p>
        </div>

        {/* Full-Bleed Silhouette Showcase Visual */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#151515] border border-white/15 overflow-hidden mb-16 sm:mb-24">
          <Image
            src={piece.heroImage}
            alt={piece.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Craft Narrative & Commission Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start border-b border-white/15 pb-20 sm:pb-28">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              THE ARCHITECTURAL NARRATIVE
            </span>
            <p className="font-sans text-lg sm:text-xl text-white font-light tracking-wide leading-relaxed">
              {piece.narrative}
            </p>
            <div className="border-l border-white/25 pl-6 mt-8 py-2">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 block mb-2 font-light">
                ATELIER CRAFT SPECIFICATION
              </span>
              <p className="font-sans text-xs text-white/70 font-light leading-relaxed">
                {piece.craftNote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#151515] border border-white/15 p-8 sm:p-10 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-5">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
                COMMISSION THIS SILHOUETTE
              </span>
              <h3 className="font-sans text-xl text-white font-light tracking-[0.18em] uppercase">
                INITIATE BESPOKE CONFIGURATION
              </h3>
            </div>

            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Pre-load this foundational silhouette into our 3D Bespoke Studio to curate custom yarn compositions, measurements, and personalized inscriptions.
            </p>

            <PieceCommissionButton silhouetteId={piece.silhouetteId} />
          </div>
        </div>
      </section>

      {/* Split-Screen The Stitch & Fiber Macro Section */}
      <section className="bg-[#151515] border-t border-b border-white/15 py-24 sm:py-36">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-16 border-b border-white/15 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 font-light">
                MACRO RESOLUTION &amp; TACTILITY
              </span>
              <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
                THE STITCH &amp; FIBER
              </h2>
            </div>
            <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-light">
              STUDIO ARCHIVE RESOLUTION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Macro Angle 1 */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-[#000000] border border-white/10 overflow-hidden">
                <Image
                  src={piece.detailImage}
                  alt={`${piece.title} Detail Weave`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="border-l border-white/25 pl-5">
                <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase block font-light">
                  MACRO DETAIL 01
                </span>
                <h4 className="font-sans text-sm tracking-[0.18em] uppercase text-white font-light mt-1">
                  Tensile Stitch Matrix
                </h4>
                <p className="font-sans text-xs text-white/60 font-light leading-relaxed mt-2">
                  Notice the unbroken continuous gauge. Each knot reinforces adjacent loops, producing exceptional dimensional stability.
                </p>
              </div>
            </div>

            {/* Macro Angle 2 */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-[#000000] border border-white/10 overflow-hidden">
                <Image
                  src={piece.macroImage}
                  alt={`${piece.title} Fiber Macro`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="border-l border-white/25 pl-5">
                <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase block font-light">
                  MACRO DETAIL 02
                </span>
                <h4 className="font-sans text-sm tracking-[0.18em] uppercase text-white font-light mt-1">
                  Living Fiber Texture
                </h4>
                <p className="font-sans text-xs text-white/60 font-light leading-relaxed mt-2">
                  Pure natural unbleached or mineral-dyed threads that interact dynamically with ambient natural light.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Provenance Specification Grid */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-16 border-b border-white/15 pb-8">
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block mb-2 font-light">
            PROVENANCE LEDGER
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
            ARCHITECTURAL SPECIFICATIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-8 border border-white/15 bg-[#151515] space-y-3">
            <div className="flex items-center gap-3 text-white/60">
              <Clock strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                HANDCRAFT TIME
              </span>
            </div>
            <span className="font-sans text-2xl text-white font-light tracking-wide block">
              {piece.specs.handcraftHours}
            </span>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Calculated single-hook artisan time devoted solely to loop tension and structure.
            </p>
          </div>

          <div className="p-8 border border-white/15 bg-[#151515] space-y-3">
            <div className="flex items-center gap-3 text-white/60">
              <Layers strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                FIBER COMPOSITION
              </span>
            </div>
            <span className="font-sans text-lg text-white font-light tracking-wide block leading-snug">
              {piece.specs.fiberComposition}
            </span>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Zero synthetic fillers. Verified single-origin organic or mercerized raw threads.
            </p>
          </div>

          <div className="p-8 border border-white/15 bg-[#151515] space-y-3">
            <div className="flex items-center gap-3 text-white/60">
              <Compass strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                STITCH TECHNIQUE
              </span>
            </div>
            <span className="font-sans text-lg text-white font-light tracking-wide block leading-snug">
              {piece.specs.stitchTechnique}
            </span>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Proprietary atelier tensions guaranteeing shape memory through decades of use.
            </p>
          </div>

          <div className="p-8 border border-white/15 bg-[#151515] space-y-3">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 block font-light">
              DIMENSIONS
            </span>
            <span className="font-sans text-xl text-white font-light tracking-wide block">
              {piece.specs.dimensions}
            </span>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Measured at resting state. Bespoke modifications available via private consultation.
            </p>
          </div>

          <div className="p-8 border border-white/15 bg-[#151515] space-y-3">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 block font-light">
              COMMISSION LEAD TIME
            </span>
            <span className="font-sans text-xl text-white font-light tracking-wide block">
              {piece.specs.leadTime}
            </span>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              From yarn conditioning through final hand-finishing and cedar packing.
            </p>
          </div>

          <div className="p-8 border border-white/15 bg-[#151515] space-y-3">
            <div className="flex items-center gap-3 text-white/60">
              <ShieldCheck strokeWidth={1.25} className="w-4 h-4" />
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                AUTHENTICITY SEAL
              </span>
            </div>
            <span className="font-sans text-xl text-white font-light tracking-wide block">
              Numbered Archive Plate
            </span>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Hand-engraved provenance seal and bound atelier certificate of origin.
            </p>
          </div>
        </div>

        {/* Next Piece Chapter Link */}
        <div className="mt-20 pt-12 border-t border-white/15 flex items-center justify-between">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
            NEXT ARCHITECTURAL PIECE
          </span>

          <Link
            href={`/collection/${nextPiece.slug}`}
            className="group flex items-center gap-3 font-sans text-sm sm:text-base tracking-[0.18em] uppercase text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          >
            <span>{nextPiece.title}</span>
            <ArrowRight strokeWidth={1.25} className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-500" />
          </Link>
        </div>
      </section>

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "3D BOUQUET CONFIGURATOR",
            description: "Customize botanical blooms, vessels, and tactile fibers live in our reactive 3D studio.",
            href: `/bespoke/configure?silhouette=${piece.silhouetteId}`,
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "BESPOKE CRAFT DISCIPLINE",
            description: "Explore the tension of 0.75mm steel, natural fiber origins, and unyielding hand accuracy.",
            href: "/bespoke/craft",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "ALL SIGNATURE EDITIONS",
            description: "Browse the complete showroom of numbered haute crochet totes, cardigans, and tapestries.",
            href: "/collections",
            image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
