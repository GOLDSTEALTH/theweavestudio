"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check, MessageSquare, Plus, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { BOUTIQUE_ITEMS, BoutiqueItem, createWhatsAppBoutiqueInquiryLink } from "@/data/atelier";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

type CategoryFilter = "ALL" | "FOR THE HOME" | "FOR EVENING" | "BOTANICAL OBJECTS";

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");
  const [inquiryItems, setInquiryItems] = useState<BoutiqueItem[]>([]);
  const [patronName, setPatronName] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { lockScroll, unlockScroll } = useSmoothScroll();

  // Lock scroll when drawer is open
  useEffect(() => {
    if (!isDrawerOpen) return;
    lockScroll();
    return () => unlockScroll();
  }, [isDrawerOpen, lockScroll, unlockScroll]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  const filteredItems =
    activeCategory === "ALL"
      ? BOUTIQUE_ITEMS
      : BOUTIQUE_ITEMS.filter((item) => item.category === activeCategory);

  const toggleItem = (item: BoutiqueItem) => {
    if (inquiryItems.some((i) => i.id === item.id)) {
      setInquiryItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      setInquiryItems((prev) => [...prev, item]);
    }
  };

  const isSelected = (itemId: string) => inquiryItems.some((i) => i.id === itemId);

  const whatsappInquiryUrl = createWhatsAppBoutiqueInquiryLink(inquiryItems, patronName);

  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
      <Navbar />
      <VaultDrawer />

      {/* Editorial Hero */}
      <section className="relative w-full h-[75svh] min-h-[560px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=2400&auto=format&fit=crop"
            alt="The Weave Studio Boutique"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.55] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/40 to-[#0E0D0C]/70" />
        </div>

        <div className="h-20" />

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-[#C8A87A]">
            OBJECTS OF CRAFT
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide uppercase text-[#F3EFE6] leading-tight max-w-4xl mx-auto">
            The Boutique
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-[#9C9488] max-w-xl mx-auto leading-relaxed">
            Curated ready-to-ship luxury crochet accessories and sculptural botanical objects. Compile your private inquiry list for immediate concierge handover.
          </p>
        </div>

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>NUMBERED ATELIER RELEASES</span>
          <span>NO COMMERCE CHECKOUT / CONCIERGE DIRECT</span>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="border-t border-b border-[#F3EFE6]/12 bg-[#0E0D0C]/80 backdrop-blur-md sticky top-20 z-20">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {(["ALL", "FOR THE HOME", "FOR EVENING", "BOTANICAL OBJECTS"] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] sm:text-[11px] font-light tracking-[0.22em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none ${
                  activeCategory === cat
                    ? "bg-[#F3EFE6] text-[#0E0D0C]"
                    : "border border-[#F3EFE6]/20 text-[#9C9488] hover:text-[#F3EFE6] hover:border-[#C8A87A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {inquiryItems.length > 0 && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-[11px] font-light tracking-[0.22em] uppercase text-[#C8A87A] hover:underline flex items-center gap-2"
            >
              <span>INQUIRY LIST ({inquiryItems.length})</span>
            </button>
          )}
        </div>
      </section>

      {/* Sparse 3-Column Hairline Gallery */}
      <section className="py-20 sm:py-32 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
          {filteredItems.map((item) => {
            const selected = isSelected(item.id);

            return (
              <article
                key={item.id}
                className="group border border-[#F3EFE6]/12 bg-[#171513] rounded-xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#201D1A]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#F3EFE6]/90 bg-[#0E0D0C]/80 backdrop-blur-md px-2.5 py-1 border border-[#F3EFE6]/15 font-light">
                        {item.edition}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C8A87A] font-light">
                          {item.category}
                        </span>
                        <span className="font-sans text-xs tracking-wider text-[#F3EFE6] font-light">
                          {item.priceINR}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl text-[#F3EFE6] font-light tracking-wide">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="border-t border-[#F3EFE6]/10 pt-4 space-y-2 text-[11px] font-light text-[#9C9488]">
                      <div className="flex justify-between">
                        <span className="text-[#9C9488]/70">DIMENSIONS</span>
                        <span className="text-[#F3EFE6]">{item.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9C9488]/70">FIBER SPECS</span>
                        <span className="text-[#F3EFE6] text-right truncate max-w-[200px]">{item.fiberSpecs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9C9488]/70">HANDCRAFT TIME</span>
                        <span className="text-[#F3EFE6]">{item.handcraftHours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-6 sm:p-8 pt-0">
                  <button
                    onClick={() => toggleItem(item)}
                    className={`w-full py-3 text-[11px] font-light tracking-[0.22em] uppercase rounded-full transition-all flex items-center justify-center gap-2 ${
                      selected
                        ? "bg-[#C8A87A] text-[#0E0D0C]"
                        : "border border-[#F3EFE6]/25 text-[#F3EFE6] hover:border-[#C8A87A] hover:bg-[#F3EFE6]/[0.05]"
                    }`}
                  >
                    {selected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>ADDED TO INQUIRY LIST</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD TO INQUIRY LIST</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Floating Inquiry Drawer Button when items are present */}
      {inquiryItems.length > 0 && !isDrawerOpen && (
        <div className="fixed bottom-8 right-8 z-30">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="rounded-full bg-[#F3EFE6] text-[#0E0D0C] hover:bg-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 py-4 flex items-center gap-3 text-xs tracking-[0.22em] uppercase font-light transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#0E0D0C]" />
            <span>VIEW INQUIRY LIST ({inquiryItems.length})</span>
          </button>
        </div>
      )}

      {/* Inquiry Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div data-lenis-prevent className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-[#0E0D0C]/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 w-full max-w-lg bg-[#171513] border-l border-[#F3EFE6]/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-6">
                  <div>
                    <span className="text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] font-light block">
                      THE BOUTIQUE
                    </span>
                    <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide uppercase">
                      Inquiry Dossier ({inquiryItems.length})
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-[#9C9488] hover:text-[#F3EFE6]"
                    aria-label="Close Inquiry Drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="py-6 space-y-4">
                  {inquiryItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-[#F3EFE6]/10 bg-[#201D1A] rounded-xl flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-sans text-xs tracking-[0.16em] uppercase text-[#F3EFE6] font-light">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-[#9C9488] font-light">
                          {item.priceINR} &bull; {item.dimensions}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleItem(item)}
                        className="p-2 text-[#9C9488] hover:text-[#F3EFE6]"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {inquiryItems.length === 0 && (
                    <p className="text-xs text-[#9C9488] font-light py-8 text-center">
                      Your inquiry list is empty. Add objects from the boutique catalogue.
                    </p>
                  )}
                </div>

                {/* Optional Patron Name */}
                <div className="space-y-2 pt-4 border-t border-[#F3EFE6]/10">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                    PATRON NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    placeholder="Enter patron name or initials"
                    className="w-full bg-[#201D1A] border border-[#F3EFE6]/15 rounded-xl px-4 py-3 text-xs text-[#F3EFE6] placeholder-[#9C9488]/40 focus-visible:outline-none focus-visible:border-[#C8A87A]"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-6 border-t border-[#F3EFE6]/15">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#F3EFE6] text-[#0E0D0C] hover:bg-white py-3.5 text-[11px] font-light tracking-[0.22em] uppercase transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#0E0D0C]" />
                  <span>SUBMIT LIST TO CONCIERGE (WHATSAPP)</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "THE COMMISSION TABLE",
            description: "Curate living fibers, hand-dyed palettes, and bespoke dimensions for custom commissions.",
            href: "/bespoke/commission",
            image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "HYDERABAD PROVENANCE & VAULT",
            description: "Discover singular 1-of-1 archive masterworks and historical studio serial seals.",
            href: "/provenance",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "CARE & PATRONAGE",
            description: "Read our comprehensive client FAQs, lifetime re-blocking terms, and salon appointments.",
            href: "/patronage",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
