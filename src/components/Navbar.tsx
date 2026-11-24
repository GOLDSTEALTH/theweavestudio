"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, Menu, X } from "lucide-react";
import { ATELIER_CONFIG, VAULT_PIECES } from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { LUXURY_EASE } from "@/lib/motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openVault } = useAtelier();
  const { scrollTo, lockScroll, unlockScroll } = useSmoothScroll();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const vaultCountFormatted = String(VAULT_PIECES.length).padStart(2, "0");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    // Call immediately on mount so refreshing mid-page sets state accurately
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll via lock-counter in SmoothScrollProvider
  useEffect(() => {
    if (isMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isMenuOpen, lockScroll, unlockScroll]);

  // Handle Escape key to dismiss overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (targetId: string) => {
    setIsMenuOpen(false);
    if (isHome) {
      scrollTo(targetId);
    } else {
      router.push(`/${targetId}`);
    }
  };

  const navMenuItems = [
    { label: "SIGNATURE EDITIONS", href: "#collections", id: "#collections", num: "01" },
    { label: "THE CRAFTSMANSHIP", href: "#craftsmanship", id: "#craftsmanship", num: "02" },
    { label: "BESPOKE STUDIO", href: "#bespoke", id: "#bespoke", num: "03" },
    { label: "HYDERABAD PROVENANCE", href: "#provenance", id: "#provenance", num: "04" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-700 ease-out ${
          isScrolled
            ? "bg-[#0A0A0B]/85 backdrop-blur-md border-b border-[#F4F1EA]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
          {/* Left: Minimal Menu Trigger */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-2.5 text-[#F4F1EA] hover:text-[#C6A972] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
              aria-label="Open Navigation Menu"
            >
              <Menu strokeWidth={1.25} className="w-4 h-4 transition-transform group-hover:scale-105" />
              <span className="font-sans text-[11px] tracking-[0.28em] uppercase font-light">
                MENU
              </span>
            </button>
          </div>

          {/* Center: Wide-tracked Wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link
              href="/"
              className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            >
              <span className="font-sans text-[11px] sm:text-xs tracking-[0.35em] uppercase font-medium text-[#F4F1EA] transition-colors group-hover:text-[#C6A972]">
                {ATELIER_CONFIG.studioName}
              </span>
              <span className="block text-[8px] tracking-[0.45em] text-[#9A968E] uppercase -mt-0.5">
                {ATELIER_CONFIG.location.toUpperCase()}
              </span>
            </Link>
          </div>

          {/* Right: Private Vault & Commission Anchor */}
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={openVault}
              className="group flex items-center gap-2 text-[#C6A972] hover:text-[#DFCA9B] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
              aria-label="Open Private Vault"
            >
              <Lock strokeWidth={1.25} className="w-3.5 h-3.5 text-[#C6A972]" />
              <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-light hidden sm:inline">
                PRIVATE VAULT
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] group-hover:text-[#C6A972] transition-colors border border-[#C6A972]/30 px-1.5 py-0.5">
                {vaultCountFormatted}
              </span>
            </button>

            <button
              onClick={() => handleNavClick("#bespoke")}
              className="hidden md:inline-flex items-center font-sans text-[11px] tracking-[0.25em] uppercase text-[#F4F1EA] hover:text-[#C6A972] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            >
              COMMISSION
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="fixed inset-0 z-50 bg-[#0A0A0B]/95 flex flex-col justify-between p-6 sm:p-12 lg:p-20 overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between w-full max-w-[1720px] mx-auto border-b border-white/10 pb-8">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#9A968E]">
                ATELIER DIRECTORY
              </span>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-2 text-[#F4F1EA] hover:text-[#C6A972] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                aria-label="Close Menu"
              >
                <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-light">
                  CLOSE
                </span>
                <X strokeWidth={1.25} className="w-4 h-4 transition-transform group-hover:rotate-90 duration-500" />
              </button>
            </div>

            {/* Menu Links with Staggered Clip-Path Reveals */}
            <div className="w-full max-w-[1720px] mx-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                {navMenuItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.08 * idx,
                      ease: LUXURY_EASE,
                    }}
                    className="overflow-hidden group"
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="text-left w-full flex items-baseline gap-4 sm:gap-8 group py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                    >
                      <span className="font-sans text-xs tracking-[0.3em] text-[#C6A972]/60 group-hover:text-[#C6A972] transition-colors">
                        {item.num}
                      </span>
                      <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] group-hover:text-[#C6A972] transition-colors italic tracking-wide group-hover:translate-x-3 duration-500 inline-block">
                        {item.label}
                      </span>
                    </button>
                  </motion.div>
                ))}

                {/* Private Vault Menu Link */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.36,
                    ease: LUXURY_EASE,
                  }}
                  className="overflow-hidden group pt-4"
                >
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openVault();
                    }}
                    className="text-left w-full flex items-baseline gap-4 sm:gap-8 group py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                  >
                    <span className="font-sans text-xs tracking-[0.3em] text-[#C6A972]">
                      05
                    </span>
                    <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#C6A972] group-hover:text-[#DFCA9B] transition-colors italic tracking-wide group-hover:translate-x-3 duration-500 inline-flex items-center gap-4">
                      PRIVATE VAULT ({vaultCountFormatted})
                      <ArrowUpRight strokeWidth={1.25} className="w-8 h-8 opacity-75 inline" />
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Right Side Editorial Column */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: LUXURY_EASE }}
                className="lg:col-span-4 border-l border-white/10 lg:pl-12 space-y-8"
              >
                <div>
                  <h4 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#9A968E] mb-2">
                    CONCIERGE & APPOINTMENTS
                  </h4>
                  <p className="font-serif text-lg text-[#F4F1EA] font-light leading-relaxed">
                    Private consultations available by request for tailored commissions, architectural tapestries, and bespoke sizing.
                  </p>
                </div>

                <div className="space-y-3 font-sans text-[11px] tracking-[0.25em] uppercase text-[#9A968E]">
                  <div>
                    <span className="block text-[#F4F1EA]">LOCATION</span>
                    {ATELIER_CONFIG.location}
                  </div>
                  <div>
                    <span className="block text-[#F4F1EA]">INSTAGRAM ARCHIVE</span>
                    <a
                      href={ATELIER_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C6A972] hover:underline inline-flex items-center gap-1 mt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                    >
                      {ATELIER_CONFIG.instagramHandle}
                      <ArrowUpRight strokeWidth={1.25} className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="font-serif text-sm italic text-[#9A968E]">
                    &ldquo;{ATELIER_CONFIG.colophon}&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Colophon inside Overlay */}
            <div className="w-full max-w-[1720px] mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9A968E] gap-4">
              <span>{ATELIER_CONFIG.studioName} / {ATELIER_CONFIG.founded}</span>
              <span>STRICTLY BESPOKE EDITIONS / HYDERABAD</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
