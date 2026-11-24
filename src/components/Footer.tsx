"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ATELIER_CONFIG, VAULT_PIECES } from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function Footer() {
  const { openVault } = useAtelier();
  const { scrollTo } = useSmoothScroll();

  const vaultCountFormatted = String(VAULT_PIECES.length).padStart(2, "0");

  const directoryLinks = [
    { label: "THE ATELIER", href: "/atelier" },
    { label: "SIGNATURE EDITIONS", href: "/collections" },
    { label: "BESPOKE OVERVIEW", href: "/bespoke" },
    { label: "THE COMMISSION TABLE", href: "/bespoke/commission" },
    { label: "THE CRAFTSMANSHIP", href: "/bespoke/craft" },
    { label: "HYDERABAD PROVENANCE", href: "/provenance" },
    { label: "ATELIER BOUTIQUE", href: "/boutique" },
    { label: "CARE & PATRONAGE", href: "/patronage" },
  ];

  return (
    <footer className="relative w-full bg-[#0E0D0C] border-t border-[#F3EFE6]/12 text-[#F3EFE6]">
      {/* Upper Grand Editorial Band */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 border-b border-[#F3EFE6]/12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#C8A87A] font-light">
              {ATELIER_CONFIG.eyebrow}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase leading-tight">
              Architecture in <br />
              Every Loop
            </h3>

            <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed max-w-md">
              Constructed by hand in Hyderabad, India. Specializing in bespoke haute crochet commissions, sculptural wall tapestries, and ready-to-ship numbered editions.
            </p>

            <div className="pt-2">
              <a
                href="https://instagram.com/theweave_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-[#C8A87A] hover:text-[#F3EFE6] transition-colors"
              >
                <span>INSTAGRAM / @THEWEAVE_STUDIO</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Directory Navigation Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#9C9488] block font-light">
              ATELIER DIRECTORY
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs tracking-[0.18em] uppercase font-light text-[#9C9488]">
              {directoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F3EFE6] transition-colors py-1 inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={openVault}
                  className="hover:text-[#F3EFE6] transition-colors py-1 flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A] uppercase"
                >
                  <span>PRIVATE VAULT</span>
                  <span className="text-[10px] border border-[#F3EFE6]/30 px-1 py-0.5 text-[#F3EFE6]">{vaultCountFormatted}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Direct Inquiries */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#9C9488] block font-light">
              PRIVATE CONCIERGE
            </span>

            <div className="space-y-2 text-xs font-sans font-light">
              <p className="text-[#9C9488]">
                Direct consultations and private salon viewings:
              </p>
              <Link
                href="/patronage#concierge"
                className="inline-flex items-center gap-2 text-[#F3EFE6] hover:text-[#C8A87A] transition-colors pt-1 tracking-wider uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
              >
                <span>REQUEST CONSULTATION</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="pt-4 border-t border-[#F3EFE6]/10 text-[11px] font-sans text-[#9C9488] space-y-1">
              <div>
                <span className="text-[#F3EFE6] uppercase tracking-wider font-light">LOCATION: </span>
                <span className="font-light">{ATELIER_CONFIG.location}</span>
              </div>
              <div>
                <span className="text-[#F3EFE6] uppercase tracking-wider font-light">FOUNDED: </span>
                <span className="font-light">{ATELIER_CONFIG.founded}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Monumental Wordmark */}
      <div className="py-12 sm:py-16 text-center border-b border-[#F3EFE6]/12">
        <Link
          href="/"
          className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
        >
          <span className="font-serif text-3xl sm:text-5xl lg:text-7xl tracking-wide uppercase text-[#F3EFE6] font-light block transition-opacity group-hover:opacity-85">
            {ATELIER_CONFIG.studioName}
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.45em] text-[#C8A87A] uppercase block mt-3 font-light">
            BESPOKE HANDCRAFTED ATELIER / HYDERABAD
          </span>
        </Link>
      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.25em] text-[#9C9488] uppercase gap-4 font-sans font-light">
        <div>
          <span>&copy; {new Date().getFullYear()} {ATELIER_CONFIG.studioName}. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollTo(0)}
            className="group flex items-center gap-2 hover:text-[#F3EFE6] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp strokeWidth={1.25} className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
