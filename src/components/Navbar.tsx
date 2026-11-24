"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { VAULT_PIECES } from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

type SubMenuType = "collections" | "bespoke" | null;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuType>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { openVault } = useAtelier();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const pathname = usePathname();

  const vaultCountFormatted = String(VAULT_PIECES.length).padStart(2, "0");

  // Track scroll position for top bar frosted styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when curtain menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isMenuOpen, lockScroll, unlockScroll]);

  // Auto-close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubMenu(null);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const collectionsSubLinks = [
    { label: "VIEW ALL", href: "/collections" },
    { label: "THE AURELIA TOTE", href: "/collection/aurelia-evening-tote" },
    { label: "THE SOLSTICE CARDIGAN", href: "/collection/solstice-resort-cardigan" },
    { label: "THE NOCTURNE TAPESTRY", href: "/collection/nocturne-heirloom-tapestry" },
    { label: "THE VÉRIDIQUE FLORA", href: "/collection/veridique-botanical-sculpture" },
    { label: "CONFIGURE 3D", href: "/bespoke/configure" },
  ];

  const bespokeSubLinks = [
    { label: "DISCOVER BESPOKE", href: "/bespoke" },
    { label: "3D CONFIGURATOR", href: "/bespoke/configure" },
    { label: "BESPOKE CRAFT", href: "/bespoke/craft" },
    { label: "PRIVATE COMMISSIONS", href: "/bespoke#private-office" },
  ];

  return (
    <>
      {/* 1. Minimal Fixed Top Bar (h-20 / 80px) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-500 ease-out ${
          isScrolled || isMenuOpen
            ? "bg-black/85 backdrop-blur-2xl border-b border-white/15"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center justify-between">
          {/* Left: MENU trigger (2 thin lines + MENU or X CLOSE) */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                if (isMenuOpen) setActiveSubMenu(null);
              }}
              className="group flex items-center gap-3 text-white transition-opacity hover:opacity-75 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
              aria-label={isMenuOpen ? "Close Menu" : "Open Navigation Menu"}
            >
              {isMenuOpen ? (
                <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-light text-white">
                  X CLOSE
                </span>
              ) : (
                <>
                  <div className="flex flex-col gap-1 w-4.5">
                    <span className="w-4.5 h-[1px] bg-white transition-all duration-300" />
                    <span className="w-3 h-[1px] bg-white transition-all duration-300" />
                  </div>
                  <span className="font-sans text-[11px] tracking-[0.28em] uppercase font-light text-white">
                    MENU
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Center: Minimal pure-white geometric TWS Monogram Emblem (28px high, links to /, no subtitle text) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
              aria-label="The Weave Studio Homepage"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-white transition-transform duration-500 group-hover:scale-105"
              >
                <rect x="17.4" y="4" width="1.2" height="28" fill="currentColor" />
                <path
                  d="M8 12C8 7.58172 11.5817 4 16 4C20.4183 4 24 7.58172 24 12C24 16.4183 20.4183 20 16 20"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M28 24C28 28.4183 24.4183 32 20 32C15.5817 32 12 28.4183 12 24C12 19.5817 15.5817 16 20 16"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </Link>
          </div>

          {/* Right: Subtle CONCIERGE link & VAULT trigger with dynamic 03 count */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/patronage#concierge"
              className="hidden md:inline-block font-sans text-[11px] tracking-[0.25em] uppercase font-light text-white/80 hover:text-white transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              CONCIERGE
            </Link>

            <button
              onClick={openVault}
              className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
              aria-label="Open Private Vault Drawer"
            >
              <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-light hidden sm:inline">
                VAULT
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] font-light text-white/70 border border-white/30 px-1.5 py-0.5 group-hover:border-white transition-colors">
                {vaultCountFormatted}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Two-Column Frosted-Glass Curtain Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-30 pt-20 flex overflow-hidden"
          >
            {/* Dimmed backdrop on right so underlying live page remains subtly visible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />

            {/* Curtain Columns Container */}
            <div className="relative z-10 flex h-full max-h-[calc(100svh-80px)] w-full">
              {/* Primary Left Frosted Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-[40vw] max-w-[460px] h-full bg-black/75 backdrop-blur-3xl border-r border-white/15 flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
              >
                {/* Top Label */}
                <div className="text-right pb-6 border-b border-white/10">
                  <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 font-light">
                    ATELIER DIRECTORY
                  </span>
                </div>

                {/* Primary Navigation Links (Right-aligned, uppercase geometric light-300) */}
                <nav className="my-auto py-8 space-y-6 text-right">
                  {/* 1. THE ATELIER */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("atelier");
                      setActiveSubMenu(null);
                    }}
                    className="flex items-center justify-end gap-4 group"
                  >
                    {hoveredItem === "atelier" && (
                      <span className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block transition-all" />
                    )}
                    <Link
                      href="/atelier"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                    >
                      THE ATELIER
                    </Link>
                  </div>

                  {/* 2. COLLECTIONS (Expandable) */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("collections");
                      setActiveSubMenu("collections");
                    }}
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "collections" && (
                      <span className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block transition-all" />
                    )}
                    <button
                      onClick={() => setActiveSubMenu((prev) => (prev === "collections" ? null : "collections"))}
                      className="flex items-center gap-2 font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors focus-visible:outline-none"
                    >
                      <span>COLLECTIONS</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>

                  {/* 3. BESPOKE (Expandable) */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("bespoke");
                      setActiveSubMenu("bespoke");
                    }}
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "bespoke" && (
                      <span className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block transition-all" />
                    )}
                    <button
                      onClick={() => setActiveSubMenu((prev) => (prev === "bespoke" ? null : "bespoke"))}
                      className="flex items-center gap-2 font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors focus-visible:outline-none"
                    >
                      <span>BESPOKE</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>

                  {/* 4. PATRONAGE & CARE */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("patronage");
                      setActiveSubMenu(null);
                    }}
                    className="flex items-center justify-end gap-4 group"
                  >
                    {hoveredItem === "patronage" && (
                      <span className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block transition-all" />
                    )}
                    <Link
                      href="/patronage"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                    >
                      PATRONAGE &amp; CARE
                    </Link>
                  </div>

                  {/* 5. PROVENANCE */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("provenance");
                      setActiveSubMenu(null);
                    }}
                    className="flex items-center justify-end gap-4 group"
                  >
                    {hoveredItem === "provenance" && (
                      <span className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block transition-all" />
                    )}
                    <Link
                      href="/provenance"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                    >
                      PROVENANCE
                    </Link>
                  </div>

                  {/* 6. BOUTIQUE */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("boutique");
                      setActiveSubMenu(null);
                    }}
                    className="flex items-center justify-end gap-4 group"
                  >
                    {hoveredItem === "boutique" && (
                      <span className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block transition-all" />
                    )}
                    <Link
                      href="/boutique"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors"
                    >
                      BOUTIQUE
                    </Link>
                  </div>
                </nav>

                {/* Bottom Footer Info */}
                <div className="pt-6 border-t border-white/10 text-right text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                  <span>HYDERABAD / STRICTLY BESPOKE</span>
                </div>
              </motion.div>

              {/* Secondary Expandable Frosted Column (Desktop adjacent slide-out / Mobile overlay switch) */}
              <AnimatePresence>
                {activeSubMenu && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute sm:relative top-0 left-0 w-full sm:w-[320px] h-full bg-black/85 sm:bg-black/65 backdrop-blur-3xl border-r border-white/10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto z-20"
                  >
                    <div>
                      {/* Mobile Back Button */}
                      <button
                        onClick={() => setActiveSubMenu(null)}
                        className="sm:hidden flex items-center gap-2 text-white/60 hover:text-white text-[11px] tracking-[0.22em] uppercase font-light mb-6"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>BACK</span>
                      </button>

                      <div className="pb-4 border-b border-white/10 mb-6">
                        <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 font-light">
                          {activeSubMenu === "collections" ? "COLLECTIONS ARCHIVE" : "BESPOKE SERVICES"}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {(activeSubMenu === "collections" ? collectionsSubLinks : bespokeSubLinks).map((sub) => (
                          <div key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block py-1.5 font-sans text-xs tracking-[0.22em] uppercase font-light text-white/70 hover:text-white hover:translate-x-1 transition-all"
                            >
                              {sub.label}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <p className="text-[10px] font-light text-white/40 tracking-wider leading-relaxed">
                        Each bespoke creation is cataloged permanently in the Hyderabad atelier records.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
