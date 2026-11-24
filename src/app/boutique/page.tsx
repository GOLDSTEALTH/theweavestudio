"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, MessageSquare, Plus, Trash2, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { BOUTIQUE_ITEMS, BoutiqueItem, createWhatsAppBoutiqueInquiryLink } from "@/data/atelier";

type CategoryFilter = "ALL" | "FOR THE HOME" | "FOR EVENING" | "BOTANICAL OBJECTS";

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");
  const [inquiryItems, setInquiryItems] = useState<BoutiqueItem[]>([]);
  const [patronName, setPatronName] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    <main className="min-h-screen bg-[#000000] text-white">
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
            className="object-cover object-center filter brightness-[0.52] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        </div>

        <div className="h-20" />

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-white/70">
            OBJECTS OF CRAFT
          </span>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-[70px] font-light tracking-[0.18em] uppercase text-white leading-tight max-w-4xl mx-auto">
            THE BOUTIQUE
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-white/70 max-w-xl mx-auto leading-relaxed">
            Curated ready-to-ship luxury crochet accessories and sculptural botanical objects. Compile your private inquiry list for immediate concierge handover.
          </p>
        </div>

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
          <span>NUMBERED ATELIER RELEASES</span>
          <span>NO COMMERCE CHECKOUT / CONCIERGE DIRECT</span>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="border-t border-b border-white/15 bg-black/60 backdrop-blur-md sticky top-20 z-20">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {(["ALL", "FOR THE HOME", "FOR EVENING", "BOTANICAL OBJECTS"] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] sm:text-[11px] font-light tracking-[0.22em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/60 hover:text-white hover:border-white/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {inquiryItems.length > 0 && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-[11px] font-light tracking-[0.22em] uppercase text-white hover:underline flex items-center gap-2"
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
                className="group border border-white/15 bg-[#151515] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Photo */}
                  <div className="relative aspect-[4/3] w-full bg-[#1E1E1E] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center filter brightness-[0.92] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 px-2.5 py-1 border border-white/20">
                      <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-white/80 font-light">
                        {item.edition}
                      </span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-light tracking-[0.25em] uppercase text-white/40">
                      <span>{item.category}</span>
                      <span>{item.handcraftHours}</span>
                    </div>

                    <h3 className="font-sans text-lg sm:text-xl text-white font-light tracking-[0.16em] uppercase">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-white/60 font-light leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>

                    <div className="pt-4 border-t border-white/10 space-y-1.5 text-[11px] font-sans">
                      <div className="flex justify-between">
                        <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">DIMENSIONS</span>
                        <span className="text-white font-light">{item.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">FIBER</span>
                        <span className="text-white font-light truncate max-w-[180px]">{item.fiberSpecs}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Add Action */}
                <div className="p-6 sm:p-8 pt-0 border-t border-white/10 mt-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[8px] tracking-[0.25em] uppercase text-white/40 font-light">
                      ACQUISITION
                    </span>
                    <span className="font-sans text-lg text-white font-light tracking-wide">
                      {item.priceINR}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleItem(item)}
                    className={`rounded-full px-5 py-2.5 text-[10px] font-light tracking-[0.22em] uppercase transition-all duration-300 flex items-center gap-2 focus-visible:outline-none ${
                      selected
                        ? "bg-white text-black font-normal"
                        : "border border-white/60 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {selected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>IN INQUIRY LIST</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD TO LIST</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Floating Inquiry List Bottom Bar */}
      {inquiryItems.length > 0 && (
        <aside aria-label="Boutique inquiry list summary" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92vw] max-w-2xl bg-black/90 backdrop-blur-2xl border border-white/20 p-4 sm:p-5 rounded-full shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 pl-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="font-sans text-xs tracking-[0.22em] uppercase font-light text-white">
              {inquiryItems.length} {inquiryItems.length === 1 ? "OBJECT" : "OBJECTS"} SELECTED
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-[10px] sm:text-[11px] font-light tracking-[0.22em] uppercase text-white/70 hover:text-white px-3 py-2"
            >
              REVIEW
            </button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white text-black hover:bg-white/85 px-6 py-2.5 text-[10px] sm:text-[11px] font-light tracking-[0.22em] uppercase transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SUBMIT TO CONCIERGE</span>
            </a>
          </div>
        </aside>
      )}

      {/* Slide-over Inquiry List Summary Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="absolute inset-y-0 right-0 w-full max-w-lg bg-[#000000] border-l border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-6">
                <div>
                  <span className="text-[10px] tracking-[0.28em] uppercase text-white/40 font-light block">
                    THE BOUTIQUE
                  </span>
                  <h3 className="font-sans text-xl text-white font-light tracking-[0.18em] uppercase">
                    INQUIRY DOSSIER ({inquiryItems.length})
                  </h3>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-white/60 hover:text-white"
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
                    className="p-4 border border-white/10 bg-[#151515] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-sans text-xs tracking-[0.16em] uppercase text-white font-light">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-white/60 font-light">
                        {item.priceINR} &bull; {item.dimensions}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleItem(item)}
                      className="p-2 text-white/40 hover:text-white"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {inquiryItems.length === 0 && (
                  <p className="text-xs text-white/40 font-light py-8 text-center">
                    Your inquiry list is empty. Add objects from the boutique catalogue.
                  </p>
                )}
              </div>

              {/* Optional Patron Name */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                  PATRON NAME (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  placeholder="e.g. Lady Katherine Sterling"
                  className="w-full bg-[#151515] border border-white/15 px-4 py-3 text-xs text-white placeholder-white/30 focus-visible:outline-none focus-visible:border-white"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-white/15">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-white text-black hover:bg-white/85 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>SUBMIT LIST TO CONCIERGE (WHATSAPP)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "3D BOUQUET CONFIGURATOR",
            description: "Explore the live botanical study stage, curated dual-tones, and presentation vessels.",
            href: "/bespoke/configure",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
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
