"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, MessageSquare, X } from "lucide-react";
import { VAULT_PIECES, VaultPiece, createWhatsAppVaultLink, ATELIER_CONFIG } from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { LUXURY_EASE } from "@/lib/motion";

export function VaultDrawer() {
  const { isVaultOpen, closeVault } = useAtelier();
  const { lockScroll, unlockScroll } = useSmoothScroll();

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVaultOpen) {
        closeVault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVaultOpen, closeVault]);

  // Lock scroll via lock-counter in SmoothScrollProvider
  useEffect(() => {
    if (isVaultOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isVaultOpen, lockScroll, unlockScroll]);

  return (
    <AnimatePresence>
      {isVaultOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            onClick={closeVault}
            className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-md cursor-pointer"
          />

          {/* Slide-over Architectural Panel with data-lenis-prevent */}
          <motion.div
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="absolute inset-y-0 right-0 w-full max-w-2xl bg-[#0A0A0B] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 bg-[#0A0A0B]/95 backdrop-blur-md p-6 sm:p-8 border-b border-white/10 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 text-[#C6A972]">
                  <Lock strokeWidth={1.25} className="w-3.5 h-3.5" />
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-medium">
                    PRIVATE VAULT ARCHIVE
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#F4F1EA] font-light">
                  Ready-to-Ship 1 of 1 Editions
                </h3>
              </div>

              <button
                onClick={closeVault}
                className="group flex items-center gap-2 p-2 text-[#9A968E] hover:text-[#F4F1EA] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                aria-label="Close Private Vault"
              >
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-light hidden sm:inline">
                  CLOSE
                </span>
                <X strokeWidth={1.25} className="w-4 h-4 transition-transform group-hover:rotate-90 duration-500" />
              </button>
            </div>

            {/* Pieces Listing */}
            <div className="p-6 sm:p-8 space-y-12 flex-1">
              <div className="p-4 bg-[#121214] border border-white/10 text-xs font-sans text-[#9A968E] font-light leading-relaxed">
                The pieces below represent completed atelier artworks currently resting in the Hyderabad vault. Each is a strictly singular 1 of 1 finished creation, dispatched within 48 hours in a cedar presentation case with hand-numbered provenance paperwork.
              </div>

              <div className="space-y-12">
                {VAULT_PIECES.map((piece: VaultPiece) => {
                  const reserveUrl = createWhatsAppVaultLink(piece);

                  return (
                    <article
                      key={piece.id}
                      className="border border-white/10 bg-[#121214] p-5 sm:p-6 space-y-5"
                    >
                      {/* Photo & Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                        <div className="sm:col-span-5 relative aspect-[4/5] bg-[#18181B] overflow-hidden border border-white/10">
                          <Image
                            src={piece.image}
                            alt={piece.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 220px"
                            className="object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-2 left-2 bg-[#0A0A0B]/85 px-2 py-0.5 border border-white/10">
                            <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-[#C6A972]">
                              {piece.status.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="sm:col-span-7 space-y-3">
                          <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#C6A972] block">
                            {piece.editionCode}
                          </span>

                          <h4 className="font-serif text-xl sm:text-2xl text-[#F4F1EA] font-light">
                            {piece.title}
                          </h4>

                          <p className="font-serif text-xs text-[#9A968E] italic">
                            {piece.subtitle}
                          </p>

                          <div className="space-y-1 pt-2 border-t border-white/10 text-[11px] font-sans">
                            <div className="flex justify-between">
                              <span className="text-[#9A968E] uppercase tracking-wider text-[9px]">DIMENSIONS</span>
                              <span className="text-[#F4F1EA] font-light">{piece.dimensions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#9A968E] uppercase tracking-wider text-[9px]">COMPOSITION</span>
                              <span className="text-[#F4F1EA] font-light truncate max-w-[180px]">{piece.fiber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#9A968E] uppercase tracking-wider text-[9px]">CRAFT HOURS</span>
                              <span className="text-[#C6A972] font-medium">{piece.handcraftHours}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed border-t border-white/10 pt-3">
                        {piece.description}
                      </p>

                      {/* Pricing & Reservation Handshake */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
                        <div>
                          <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-[#9A968E]">
                            ACQUISITION VALUE
                          </span>
                          <span className="font-serif text-2xl text-[#C6A972] font-normal">
                            {piece.priceINR}
                          </span>
                        </div>

                        <a
                          href={reserveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#C6A972] hover:bg-[#DFCA9B] text-[#0A0A0B] font-sans text-[10px] tracking-[0.25em] uppercase font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                        >
                          <MessageSquare strokeWidth={1.5} className="w-3.5 h-3.5" />
                          <span>RESERVE VIA CONCIERGE</span>
                          <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 bg-[#0A0A0B] border-t border-white/10 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9A968E]">
              <span>THE WEAVE STUDIO VAULT</span>
              <span>{ATELIER_CONFIG.location}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
