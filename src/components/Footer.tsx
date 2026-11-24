"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ATELIER_CONFIG, VAULT_PIECES } from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function Footer() {
  const { openVault } = useAtelier();
  const { scrollTo } = useSmoothScroll();
  const pathname = usePathname();
  const router = useRouter();

  const vaultCountFormatted = String(VAULT_PIECES.length).padStart(2, "0");

  const handleNavClick = (targetId: string) => {
    if (pathname === "/") {
      scrollTo(targetId);
    } else {
      router.push(`/${targetId}`);
    }
  };

  return (
    <footer className="relative w-full bg-[#0A0A0B] border-t border-white/10 text-[#F4F1EA]">
      {/* Upper Grand Editorial Band */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#C6A972]">
              {ATELIER_CONFIG.eyebrow}
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F1EA] font-light leading-snug">
              Every loop is an <br />
              <span className="italic">immutable architectural record.</span>
            </h3>

            <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed max-w-md">
              Constructed by hand in Hyderabad, India. Specializing in bespoke haute crochet commissions, sculptural wall tapestries, and ready-to-ship numbered editions.
            </p>
          </div>

          {/* Quick Chapters Column */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#9A968E] block">
              ATELIER NAVIGATION
            </span>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F4F1EA] font-light">
              <li>
                <button
                  onClick={() => handleNavClick("#collections")}
                  className="hover:text-[#C6A972] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 text-left"
                >
                  SIGNATURE EDITIONS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#craftsmanship")}
                  className="hover:text-[#C6A972] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 text-left"
                >
                  THE CRAFTSMANSHIP
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("#bespoke")}
                  className="hover:text-[#C6A972] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 text-left"
                >
                  BESPOKE STUDIO
                </button>
              </li>
              <li>
                <button
                  onClick={openVault}
                  className="text-[#C6A972] hover:text-[#DFCA9B] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 flex items-center gap-1.5 text-left"
                >
                  <span>PRIVATE VAULT</span>
                  <span className="text-[10px] border border-[#C6A972]/30 px-1">{vaultCountFormatted}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Direct Inquiries */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#9A968E] block">
              PRIVATE CONCIERGE
            </span>

            <div className="space-y-2 text-xs font-sans font-light">
              <p className="text-[#9A968E]">
                Direct consultations and swatch appointments:
              </p>
              <a
                href={ATELIER_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C6A972] hover:underline pt-1 text-sm font-serif italic focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
              >
                <span>{ATELIER_CONFIG.instagramHandle}</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-sans text-[#9A968E] space-y-1">
              <div>
                <span className="text-[#F4F1EA] uppercase tracking-wider">ATELIER LOCATION: </span>
                <span>{ATELIER_CONFIG.location}</span>
              </div>
              <div>
                <span className="text-[#F4F1EA] uppercase tracking-wider">FOUNDED: </span>
                <span>{ATELIER_CONFIG.founded}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Monumental Wordmark */}
      <div className="py-12 sm:py-16 text-center border-b border-white/10">
        <span className="font-serif text-3xl sm:text-5xl lg:text-7xl tracking-[0.2em] uppercase text-[#F4F1EA]/80 font-light block">
          {ATELIER_CONFIG.studioName}
        </span>
        <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C6A972] uppercase block mt-3">
          BESPOKE HANDCRAFTED ATELIER / HYDERABAD
        </span>
      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.25em] text-[#9A968E] uppercase gap-4 font-sans">
        <div>
          <span>&copy; {new Date().getFullYear()} {ATELIER_CONFIG.studioName}. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollTo(0)}
            className="group flex items-center gap-2 hover:text-[#C6A972] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
          >
            <span>BACK TO TOP</span>
            <ArrowUp strokeWidth={1.25} className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
