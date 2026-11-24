import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface JourneyCard {
  title: string;
  description: string;
  href: string;
  image: string;
  alt?: string;
}

interface ContinueYourJourneyProps {
  cards?: JourneyCard[];
}

export const DEFAULT_JOURNEY_CARDS: JourneyCard[] = [
  {
    title: "THE DISCIPLINE OF THE SINGLE STITCH",
    description: "Discover our uncompromising structural methodology, natural fibers, and 0.75mm steel gauge precision.",
    href: "/bespoke/craft",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop",
    alt: "The Weave Studio Craftsmanship",
  },
  {
    title: "PROVENANCE & 1-OF-1 EDITIONS",
    description: "Explore the permanent Hyderabad studio ledger, numbered serial engravings, and immediately available acquisitions.",
    href: "/provenance",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1200&auto=format&fit=crop",
    alt: "The Weave Studio Provenance",
  },
  {
    title: "ATELIER BOUTIQUE",
    description: "Curated objects of craft and ready-to-ship numbered creations available for bespoke concierge handover.",
    href: "/boutique",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1200&auto=format&fit=crop",
    alt: "The Weave Studio Boutique",
  },
];

export function ContinueYourJourney({ cards = DEFAULT_JOURNEY_CARDS }: ContinueYourJourneyProps) {
  const displayCards = cards.slice(0, 3);

  return (
    <section className="relative w-full bg-[#000000] border-t border-white/15 py-24 sm:py-32 lg:py-36 text-white">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <span className="block font-sans text-[10px] sm:text-[11px] font-light tracking-[0.28em] uppercase text-white/50">
            EXPLORE FURTHER
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.22em] uppercase text-white">
            CONTINUE YOUR JOURNEY
          </h2>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {displayCards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              {/* Borderless aspect-[4/3] photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#151515]">
                <Image
                  src={card.image}
                  alt={card.alt || card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Underlying border-l block */}
              <div className="border-l border-white/25 pl-5 mt-6">
                <h3 className="text-xs tracking-[0.22em] font-light uppercase text-white transition-colors duration-300 group-hover:text-white/80">
                  {card.title}
                </h3>
                <p className="text-xs font-light tracking-wide text-white/60 mt-2 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
