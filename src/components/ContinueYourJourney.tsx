import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WeaveReveal } from "@/components/motion/WeaveReveal";

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
    title: "THE COMMISSION TABLE",
    description: "Curate living fibers, hand-dyed palettes, and bespoke dimensions for custom single-thread commissions.",
    href: "/bespoke/commission",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=85&w=1200&auto=format&fit=crop",
    alt: "The Weave Studio Commission Table",
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
  const displayCards = cards.slice(0, 3).map((card) => ({
    ...card,
    href: card.href.replace("/bespoke/configure", "/bespoke/commission"),
  }));

  return (
    <section className="relative w-full bg-[#0E0D0C] border-t border-[#F3EFE6]/12 py-24 sm:py-32 lg:py-36 text-[#F3EFE6]">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <span className="block font-sans text-[10px] sm:text-[11px] font-light tracking-[0.28em] uppercase text-[#C8A87A]">
            EXPLORE FURTHER
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide uppercase text-[#F3EFE6]">
            Continue Your Journey
          </h2>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {displayCards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
            >
              {/* Borderless aspect-[4/3] photo with WeaveReveal */}
              <WeaveReveal delay={idx * 0.1} className="relative aspect-[4/3] w-full overflow-hidden bg-[#171513] rounded-xl border border-[#F3EFE6]/10">
                <Image
                  src={card.image}
                  alt={card.alt || card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </WeaveReveal>

              {/* Underlying border-l block */}
              <div className="border-l border-[#C8A87A]/50 pl-5 mt-6">
                <h3 className="text-xs tracking-[0.22em] font-light uppercase text-[#F3EFE6] transition-colors duration-300 group-hover:text-[#C8A87A]">
                  {card.title}
                </h3>
                <p className="text-xs font-light tracking-wide text-[#9C9488] mt-2 line-clamp-2 leading-relaxed">
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
