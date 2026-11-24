"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { VAULT_PIECES } from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ThreadProgress } from "@/components/motion/ThreadProgress";

type SubMenuType = "collections" | "bespoke" | null;

interface SubLinkItem {
  label: string;
  href: string;
  image: string;
  note: string;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuType>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSubLink, setHoveredSubLink] = useState<SubLinkItem | null>(null);

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

  const collectionsSubLinks: SubLinkItem[] = [
    {
      label: "VIEW ALL",
      href: "/collections",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
      note: "Complete catalog of archive editions",
    },
    {
      label: "THE AURELIA TOTE",
      href: "/collection/aurelia-evening-tote",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      note: "Organic Mulberry Silk and hand-turned bronze",
    },
    {
      label: "THE SOLSTICE CARDIGAN",
      href: "/collection/solstice-resort-cardigan",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      note: "Belgian Flax and combed cashmere open-gauge weave",
    },
    {
      label: "THE NOCTURNE TAPESTRY",
      href: "/collection/nocturne-heirloom-tapestry",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
      note: "Raw Japanese Spun Silk architectural textile",
    },
    {
      label: "THE VÉRIDIQUE FLORA",
      href: "/collection/veridique-botanical-sculpture",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
      note: "Hand-spun Mercerized Egyptian Cotton botanical form",
    },
    {
      label: "THE COMMISSION TABLE",
      href: "/bespoke/commission",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
      note: "Tailor fibers, palette, and personal atelier dedication",
    },
  ];

  const bespokeSubLinks: SubLinkItem[] = [
    {
      label: "DISCOVER BESPOKE",
      href: "/bespoke",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      note: "The philosophy of unhurried single-needle commissions",
    },
    {
      label: "THE COMMISSION TABLE",
      href: "/bespoke/commission",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
      note: "Interactive atelier moodboard and bespoke ledger slip",
    },
    {
      label: "BESPOKE CRAFT",
      href: "/bespoke/craft",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
      note: "Single-thread tension, block-blocking, and hand finish",
    },
    {
      label: "PRIVATE COMMISSIONS",
      href: "/bespoke#private-office",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      note: "Direct consultation with the master artisan",
    },
  ];

  const currentSubList = activeSubMenu === "collections" ? collectionsSubLinks : bespokeSubLinks;
  const currentPreview = hoveredSubLink || (currentSubList.length > 0 ? currentSubList[0] : null);

  return (
    <>
      {/* 1. Minimal Fixed Top Bar (h-20 / 80px) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-500 ease-out ${
          isScrolled || isMenuOpen
            ? "bg-[#0E0D0C]/90 backdrop-blur-2xl border-b border-[#F3EFE6]/12"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center justify-between">
          {/* Left: MENU trigger (2 thin lines + MENU or X CLOSE) */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                if (isMenuOpen) {
                  setActiveSubMenu(null);
                  setHoveredSubLink(null);
                }
              }}
              className="group flex items-center gap-3 text-[#F3EFE6] transition-opacity hover:opacity-75 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
              aria-label={isMenuOpen ? "Close Menu" : "Open Navigation Menu"}
            >
              {isMenuOpen ? (
                <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-light text-[#F3EFE6]">
                  CLOSE
                </span>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5 w-4.5">
                    <span className="w-4.5 h-[1px] bg-[#F3EFE6] transition-all duration-300 group-hover:bg-[#C8A87A]" />
                    <span className="w-3 h-[1px] bg-[#F3EFE6] transition-all duration-300 group-hover:w-4.5 group-hover:bg-[#C8A87A]" />
                  </div>
                  <span className="font-sans text-[11px] tracking-[0.28em] uppercase font-light text-[#F3EFE6] group-hover:text-[#C8A87A] transition-colors">
                    MENU
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Center: Minimal TWS Monogram Emblem with subtle stroke draw */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
              aria-label="The Weave Studio Homepage"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-[#F3EFE6] transition-all duration-500 group-hover:scale-105 group-hover:text-[#C8A87A]"
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

          {/* Right: Subtle CONCIERGE link & VAULT trigger with dynamic count */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/patronage#concierge"
              className="hidden md:inline-block font-sans text-[11px] tracking-[0.25em] uppercase font-light text-[#9C9488] hover:text-[#F3EFE6] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
            >
              CONCIERGE
            </Link>

            <button
              onClick={openVault}
              className="group flex items-center gap-2.5 text-[#F3EFE6]/90 hover:text-[#F3EFE6] transition-colors py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
              aria-label="Open Private Vault Drawer"
            >
              <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-light hidden sm:inline text-[#9C9488] group-hover:text-[#F3EFE6] transition-colors">
                VAULT
              </span>
              <span className="font-sans text-[10px] tracking-[0.2em] font-light text-[#F3EFE6]/70 border border-[#F3EFE6]/25 px-1.5 py-0.5 group-hover:border-[#C8A87A] group-hover:text-[#F3EFE6] transition-colors">
                {vaultCountFormatted}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Spun-thread scroll progress indicator */}
      <ThreadProgress />

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
              className="absolute inset-0 bg-[#0E0D0C]/65 backdrop-blur-sm"
            />

            {/* Curtain Columns Container */}
            <div className="relative z-10 flex h-full max-h-[calc(100svh-80px)] w-full">
              {/* Primary Left Frosted Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-[40vw] max-w-[460px] h-full bg-[#171513]/90 backdrop-blur-3xl border-r border-[#F3EFE6]/12 flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
              >
                {/* Top Label */}
                <div className="text-right pb-6 border-b border-[#F3EFE6]/10">
                  <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#9C9488] font-light">
                    ATELIER DIRECTORY
                  </span>
                </div>

                {/* Primary Navigation Links */}
                <nav className="my-auto py-8 space-y-6 text-right">
                  {/* 1. THE ATELIER */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("atelier");
                      setActiveSubMenu(null);
                    }}
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "atelier" && (
                      <motion.span
                        layoutId="navSpunDash"
                        className="w-3.5 h-[1.5px] bg-[#C8A87A]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <Link
                      href="/atelier"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-[#9C9488] hover:text-[#F3EFE6] transition-colors"
                    >
                      THE ATELIER
                    </Link>
                  </div>

                  {/* 2. COLLECTIONS (Expandable) */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("collections");
                      setActiveSubMenu("collections");
                      setHoveredSubLink(collectionsSubLinks[0]);
                    }}
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "collections" && (
                      <motion.span
                        layoutId="navSpunDash"
                        className="w-3.5 h-[1.5px] bg-[#C8A87A]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <button
                      onClick={() => {
                        setActiveSubMenu((prev) => (prev === "collections" ? null : "collections"));
                        setHoveredSubLink(collectionsSubLinks[0]);
                      }}
                      className="flex items-center gap-2 font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-[#9C9488] hover:text-[#F3EFE6] transition-colors focus-visible:outline-none"
                    >
                      <span>COLLECTIONS</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:text-[#C8A87A] transition-all" />
                    </button>
                  </div>

                  {/* 3. BESPOKE (Expandable) */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("bespoke");
                      setActiveSubMenu("bespoke");
                      setHoveredSubLink(bespokeSubLinks[0]);
                    }}
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "bespoke" && (
                      <motion.span
                        layoutId="navSpunDash"
                        className="w-3.5 h-[1.5px] bg-[#C8A87A]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <button
                      onClick={() => {
                        setActiveSubMenu((prev) => (prev === "bespoke" ? null : "bespoke"));
                        setHoveredSubLink(bespokeSubLinks[0]);
                      }}
                      className="flex items-center gap-2 font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-[#9C9488] hover:text-[#F3EFE6] transition-colors focus-visible:outline-none"
                    >
                      <span>BESPOKE</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:text-[#C8A87A] transition-all" />
                    </button>
                  </div>

                  {/* 4. PATRONAGE & CARE */}
                  <div
                    onMouseEnter={() => {
                      setHoveredItem("patronage");
                      setActiveSubMenu(null);
                    }}
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "patronage" && (
                      <motion.span
                        layoutId="navSpunDash"
                        className="w-3.5 h-[1.5px] bg-[#C8A87A]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <Link
                      href="/patronage"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-[#9C9488] hover:text-[#F3EFE6] transition-colors"
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
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "provenance" && (
                      <motion.span
                        layoutId="navSpunDash"
                        className="w-3.5 h-[1.5px] bg-[#C8A87A]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <Link
                      href="/provenance"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-[#9C9488] hover:text-[#F3EFE6] transition-colors"
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
                    className="flex items-center justify-end gap-3 group"
                  >
                    {hoveredItem === "boutique" && (
                      <motion.span
                        layoutId="navSpunDash"
                        className="w-3.5 h-[1.5px] bg-[#C8A87A]"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <Link
                      href="/boutique"
                      className="font-sans text-sm sm:text-[15px] font-light tracking-[0.22em] uppercase text-[#9C9488] hover:text-[#F3EFE6] transition-colors"
                    >
                      BOUTIQUE
                    </Link>
                  </div>
                </nav>

                {/* Bottom Footer Info */}
                <div className="pt-6 border-t border-[#F3EFE6]/10 text-right text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                  <span>HYDERABAD / STRICTLY HAND-CRAFTED</span>
                </div>
              </motion.div>

              {/* Secondary Expandable Column with Live Lookbook Preview */}
              <AnimatePresence>
                {activeSubMenu && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute sm:relative top-0 left-0 w-full sm:w-[360px] h-full bg-[#171513]/95 sm:bg-[#171513]/85 backdrop-blur-3xl border-r border-[#F3EFE6]/10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto z-20"
                  >
                    <div>
                      {/* Mobile Back Button */}
                      <button
                        onClick={() => setActiveSubMenu(null)}
                        className="sm:hidden flex items-center gap-2 text-[#9C9488] hover:text-[#F3EFE6] text-[11px] tracking-[0.22em] uppercase font-light mb-6"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>BACK</span>
                      </button>

                      <div className="pb-4 border-b border-[#F3EFE6]/10 mb-6">
                        <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#9C9488] font-light">
                          {activeSubMenu === "collections" ? "COLLECTIONS ARCHIVE" : "BESPOKE SERVICES"}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {currentSubList.map((sub) => {
                          const isHovered = hoveredSubLink?.href === sub.href;
                          return (
                            <div
                              key={sub.href}
                              onMouseEnter={() => setHoveredSubLink(sub)}
                            >
                              <Link
                                href={sub.href}
                                className={`group flex items-center justify-between py-1.5 font-sans text-xs tracking-[0.22em] uppercase font-light transition-all ${
                                  isHovered
                                    ? "text-[#F3EFE6] translate-x-1"
                                    : "text-[#9C9488] hover:text-[#F3EFE6]"
                                }`}
                              >
                                <span>{sub.label}</span>
                                {isHovered && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A87A]" />
                                )}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Live Lookbook Preview Card */}
                    <div className="pt-6 border-t border-[#F3EFE6]/10">
                      {currentPreview && (
                        <div className="space-y-3">
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#201D1A] border border-[#F3EFE6]/10">
                            <Image
                              src={currentPreview.image}
                              alt={currentPreview.label}
                              fill
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C]/80 via-transparent to-transparent" />
                          </div>
                          <p className="text-[10px] font-light text-[#9C9488] tracking-wider leading-relaxed">
                            {currentPreview.note}
                          </p>
                        </div>
                      )}
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
