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
    if (!isVaultOpen) return;
    lockScroll();
    return () => unlockScroll();
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
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Slide-over Architectural Panel with data-lenis-prevent */}
          <motion.div
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="absolute inset-y-0 right-0 w-full max-w-2xl bg-[#000000] border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-md p-6 sm:p-8 border-b border-white/15 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white/60">
                  <Lock strokeWidth={1.25} className="w-3.5 h-3.5 text-white/80" />
                  <span className="font-sans text-[10px] tracking-[0.28em] uppercase font-light">
                    PRIVATE VAULT ARCHIVE
                  </span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl text-white font-light tracking-[0.18em] uppercase">
                  READY-TO-SHIP 1 OF 1 EDITIONS
                </h3>
              </div>

              <button
                onClick={closeVault}
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
                aria-label="Close Private Vault"
              >
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-light hidden sm:inline">
                  CLOSE
                </span>
                <X strokeWidth={1.25} className="w-4 h-4 transition-transform group-hover:rotate-90 duration-500 text-white" />
              </button>
            </div>

            {/* Pieces Listing */}
            <div className="p-6 sm:p-8 space-y-10 flex-1">
              <div className="p-4 bg-[#151515] border border-white/15 text-xs font-sans text-white/60 font-light leading-relaxed">
                The pieces below represent completed atelier artworks currently resting in the Hyderabad vault. Each is a strictly singular 1 of 1 finished creation, dispatched within 48 hours in a cedar presentation case with hand-numbered provenance paperwork.
              </div>

              <div className="space-y-10">
                {VAULT_PIECES.map((piece: VaultPiece) => {
                  const reserveUrl = createWhatsAppVaultLink(piece);

                  return (
                    <article
                      key={piece.id}
                      className="border border-white/15 bg-[#151515] p-5 sm:p-6 space-y-5"
                    >
                      {/* Photo & Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                        <div className="sm:col-span-5 relative aspect-[4/5] bg-[#1E1E1E] overflow-hidden border border-white/10">
                          <Image
                            src={piece.image}
                            alt={piece.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 220px"
                            className="object-cover object-center filter brightness-[0.92] hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-2 left-2 bg-black/85 px-2 py-0.5 border border-white/20">
                            <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/80 font-light">
                              {piece.status.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="sm:col-span-7 space-y-3">
                          <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-white/50 block font-light">
                            {piece.editionCode}
                          </span>

                          <h4 className="font-sans text-lg sm:text-xl text-white font-light tracking-[0.15em] uppercase">
                            {piece.title}
                          </h4>

                          <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
                            {piece.subtitle}
                          </p>

                          <div className="space-y-1.5 pt-3 border-t border-white/10 text-[11px] font-sans">
                            <div className="flex justify-between">
                              <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">DIMENSIONS</span>
                              <span className="text-white/90 font-light">{piece.dimensions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">COMPOSITION</span>
                              <span className="text-white/90 font-light truncate max-w-[180px]">{piece.fiber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">CRAFT HOURS</span>
                              <span className="text-white font-light">{piece.handcraftHours}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-white/60 font-light leading-relaxed border-t border-white/10 pt-3">
                        {piece.description}
                      </p>

                      {/* Pricing & Reservation Handshake */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
                        <div>
                          <span className="block font-sans text-[9px] tracking-[0.25em] uppercase text-white/50 font-light">
                            ACQUISITION VALUE
                          </span>
                          <span className="font-sans text-xl text-white font-light tracking-[0.1em]">
                            {piece.priceINR}
                          </span>
                        </div>

                        <a
                          href={reserveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-transparent px-6 py-3 text-[10px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
                        >
                          <MessageSquare strokeWidth={1.25} className="w-3.5 h-3.5" />
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
            <div className="p-6 bg-[#000000] border-t border-white/15 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
              <span>THE WEAVE STUDIO VAULT</span>
              <span>{ATELIER_CONFIG.location}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
