"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Copy, MessageSquare } from "lucide-react";
import {
  BESPOKE_OPTIONS,
  ATELIER_CONFIG,
  createWhatsAppCommissionLink,
} from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";

interface BespokeStudioProps {
  initialSilhouetteId?: string;
  isFullScreenRoute?: boolean;
}

export function BespokeStudio({
  initialSilhouetteId,
  isFullScreenRoute = false,
}: BespokeStudioProps) {
  const { selectedSilhouette, setSelectedSilhouette } = useAtelier();

  // Sync initial silhouette from URL query if provided
  useEffect(() => {
    if (initialSilhouetteId) {
      setSelectedSilhouette(initialSilhouetteId);
    }
  }, [initialSilhouetteId, setSelectedSilhouette]);

  const [activeFiberId, setActiveFiberId] = useState(BESPOKE_OPTIONS.fibers[0].id);
  const [activePaletteId, setActivePaletteId] = useState(BESPOKE_OPTIONS.palettes[0].id);
  const [activeVesselId, setActiveVesselId] = useState(BESPOKE_OPTIONS.vessels[0].id);
  const [activeAccentId, setActiveAccentId] = useState(BESPOKE_OPTIONS.accents[0].id);

  const [clientName, setClientName] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const currentSilhouette =
    BESPOKE_OPTIONS.silhouettes.find((s) => s.id === selectedSilhouette) ||
    BESPOKE_OPTIONS.silhouettes[0];

  const currentFiber =
    BESPOKE_OPTIONS.fibers.find((f) => f.id === activeFiberId) ||
    BESPOKE_OPTIONS.fibers[0];

  const currentPalette =
    BESPOKE_OPTIONS.palettes.find((p) => p.id === activePaletteId) ||
    BESPOKE_OPTIONS.palettes[0];

  const currentVessel =
    BESPOKE_OPTIONS.vessels.find((v) => v.id === activeVesselId) ||
    BESPOKE_OPTIONS.vessels[0];

  const currentAccent =
    BESPOKE_OPTIONS.accents.find((a) => a.id === activeAccentId) ||
    BESPOKE_OPTIONS.accents[0];

  const isBotanical = currentSilhouette.id === "botanical-study";

  const ledgerSerial = `TWS-HYD-${currentSilhouette.id.toUpperCase().slice(0, 4)}-${activePaletteId.toUpperCase().slice(0, 3)}`;

  const whatsappUrl = createWhatsAppCommissionLink({
    silhouetteName: currentSilhouette.name,
    fiberName: currentFiber.name,
    paletteName: currentPalette.name,
    clientName,
    notes: customNotes,
    leadTime: currentSilhouette.leadTime,
    vesselName: isBotanical ? currentVessel.name : undefined,
    accentName: isBotanical ? currentAccent.name : undefined,
    isBotanical,
  });

  const generateDossierText = () => {
    let text =
      `THE WEAVE STUDIO — BESPOKE COMMISSION DOSSIER\n` +
      `========================================\n` +
      `Ledger Serial: ${ledgerSerial}\n` +
      `Patron Name: ${clientName.trim() || "Anonymous Patron"}\n` +
      `Selected Silhouette: ${currentSilhouette.name} (${currentSilhouette.subtitle})\n` +
      `Estimated Lead Time: ${currentSilhouette.leadTime}\n` +
      `Artisan Time: ${currentSilhouette.startingHours}\n` +
      `Tactile Living Fiber: ${currentFiber.name} [Origin: ${currentFiber.origin}]\n` +
      `Curated Palette: ${currentPalette.name} (${currentPalette.editorialLabel})\n`;

    if (isBotanical) {
      text +=
        `Presentation Vessel: ${currentVessel.name}\n` +
        `Botanical Accents: ${currentAccent.name}\n`;
    }

    text +=
      `Special Sizing / Inscription Notes:\n` +
      `${customNotes.trim() || "Standard Atelier Proportions"}\n` +
      `========================================\n` +
      `Atelier Location: Hyderabad, India\n` +
      `Direct Concierge: ${ATELIER_CONFIG.whatsappConciergeNumber}`;

    return text;
  };

  const handleCopyDossier = async () => {
    const text = generateDossierText();
    let copied = false;

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied && typeof document !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <div className={`w-full ${isFullScreenRoute ? "min-h-screen pt-28 pb-24" : "py-16"}`}>
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header Title */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] block mb-3 font-light">
            THE COMMISSION TABLE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3EFE6] tracking-tight">
            Curate Your Bespoke Commission
          </h1>
          <p className="mt-4 font-sans text-xs sm:text-sm font-light text-[#9C9488] tracking-wider leading-relaxed">
            Every edition is hand-formed with a single continuous thread in our Hyderabad atelier. Select your silhouette, living fiber composition, and curated palette to generate your bespoke dossier.
          </p>
        </div>

        {/* Studio Grid: Left Tactile Moodboard + Right Progressive Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Sticky Tactile Moodboard */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div className="relative rounded-2xl overflow-hidden bg-[#171513] border border-[#F3EFE6]/12 p-6 sm:p-8">
              {/* Dynamic Ambient Palette Radial Wash */}
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-1000 blur-3xl opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${currentPalette.primaryHex} 0%, transparent 70%)`,
                }}
              />

              {/* Silhouette Editorial Visual */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#201D1A] border border-[#F3EFE6]/10 mb-6">
                <Image
                  src={currentSilhouette.image}
                  alt={currentSilhouette.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs tracking-widest text-[#F3EFE6]">
                  <span className="font-sans text-[10px] tracking-[0.22em] uppercase font-light text-[#C8A87A]">
                    {currentSilhouette.name}
                  </span>
                  <span className="font-sans text-[10px] tracking-[0.2em] font-light text-[#9C9488]">
                    {currentSilhouette.startingHours}
                  </span>
                </div>
              </div>

              {/* Procedural Interlocking Crochet Stitch Matrix */}
              <div className="p-5 rounded-xl bg-[#0E0D0C]/80 border border-[#F3EFE6]/10 space-y-3">
                <div className="flex items-center justify-between border-b border-[#F3EFE6]/10 pb-2">
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                    INTERLOCKING CROCHET STITCH MATRIX
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A87A] font-light">
                    LIVE TENSION
                  </span>
                </div>

                {/* SVG Crochet Loop Mesh */}
                <svg
                  viewBox="0 0 320 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-12"
                >
                  {/* Top Row: Primary Color Loops */}
                  {[0, 32, 64, 96, 128, 160, 192, 224, 256, 288].map((x, i) => (
                    <path
                      key={`r1-${i}`}
                      d={`M${x} 12 C${x + 8} 0, ${x + 24} 0, ${x + 32} 12 C${x + 24} 24, ${x + 8} 24, ${x} 12`}
                      stroke={currentPalette.primaryHex}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                  {/* Bottom Row: Interlocking Secondary Color Loops */}
                  {[16, 48, 80, 112, 144, 176, 208, 240, 272].map((x, i) => (
                    <path
                      key={`r2-${i}`}
                      d={`M${x} 28 C${x + 8} 16, ${x + 24} 16, ${x + 32} 28 C${x + 24} 40, ${x + 8} 40, ${x} 28`}
                      stroke={currentPalette.secondaryHex}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </svg>

                <div className="flex items-center justify-between text-[10px] text-[#9C9488] font-light pt-1">
                  <span>WARP: {currentPalette.name}</span>
                  <span>WEFT: {currentFiber.name}</span>
                </div>
              </div>

              {/* Tactile Living Fiber Disc */}
              <div className="mt-6 pt-6 border-t border-[#F3EFE6]/10 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full border border-[#F3EFE6]/25 shadow-inner flex items-center justify-center shrink-0"
                  style={{ backgroundColor: currentFiber.swatchTone }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#0E0D0C]/40" />
                </div>
                <div>
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#F3EFE6] font-light">
                    {currentFiber.name}
                  </h4>
                  <p className="font-sans text-[11px] text-[#9C9488] font-light tracking-wider">
                    Origin: {currentFiber.origin}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Progressive Configuration Sections */}
          <div className="lg:col-span-7 space-y-12">
            {/* Section 01: SILHOUETTES */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-3">
                <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] font-light">
                  01 / SILHOUETTE
                </span>
                <span className="font-sans text-[11px] tracking-[0.2em] text-[#9C9488] font-light">
                  SELECT BASE FORM
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BESPOKE_OPTIONS.silhouettes.map((sil) => {
                  const isSelected = sil.id === currentSilhouette.id;
                  return (
                    <button
                      key={sil.id}
                      type="button"
                      onClick={() => setSelectedSilhouette(sil.id)}
                      className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#171513] border-[#C8A87A] shadow-[0_0_20px_rgba(200,168,122,0.12)]"
                          : "bg-[#171513]/40 border-[#F3EFE6]/10 hover:border-[#F3EFE6]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-xs tracking-[0.2em] uppercase font-light text-[#F3EFE6]">
                          {sil.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#C8A87A]" />
                        )}
                      </div>
                      <p className="font-sans text-[11px] text-[#9C9488] font-light mb-3">
                        {sil.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-[#9C9488]/80 border-t border-[#F3EFE6]/10 pt-2 font-light">
                        <span>{sil.startingHours}</span>
                        <span>{sil.leadTime}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section 02: CURATED PALETTES */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-3">
                <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] font-light">
                  02 / CURATED PALETTE
                </span>
                <span className="font-sans text-[11px] tracking-[0.2em] text-[#9C9488] font-light">
                  HAND-DYED SHADES
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BESPOKE_OPTIONS.palettes.map((pal) => {
                  const isSelected = pal.id === currentPalette.id;
                  return (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => setActivePaletteId(pal.id)}
                      className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#171513] border-[#C8A87A] shadow-[0_0_20px_rgba(200,168,122,0.12)]"
                          : "bg-[#171513]/40 border-[#F3EFE6]/10 hover:border-[#F3EFE6]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full border border-[#F3EFE6]/30 shadow-sm"
                            style={{ backgroundColor: pal.primaryHex }}
                          />
                          <span
                            className="w-5 h-5 rounded-full border border-[#F3EFE6]/30 shadow-sm -ml-2"
                            style={{ backgroundColor: pal.secondaryHex }}
                          />
                        </div>
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-light text-[#C8A87A]">
                          {pal.editorialLabel}
                        </span>
                      </div>
                      <h4 className="font-sans text-xs tracking-[0.18em] uppercase text-[#F3EFE6] font-light mb-1">
                        {pal.name}
                      </h4>
                      <p className="font-sans text-[11px] text-[#9C9488] font-light line-clamp-2">
                        {pal.narrative}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section 03: LIVING FIBERS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-3">
                <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] font-light">
                  03 / LIVING FIBER
                </span>
                <span className="font-sans text-[11px] tracking-[0.2em] text-[#9C9488] font-light">
                  SUSTAINABLE HARVEST
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BESPOKE_OPTIONS.fibers.map((fib) => {
                  const isSelected = fib.id === currentFiber.id;
                  return (
                    <button
                      key={fib.id}
                      type="button"
                      onClick={() => setActiveFiberId(fib.id)}
                      className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#171513] border-[#C8A87A] shadow-[0_0_20px_rgba(200,168,122,0.12)]"
                          : "bg-[#171513]/40 border-[#F3EFE6]/10 hover:border-[#F3EFE6]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-xs tracking-[0.18em] uppercase font-light text-[#F3EFE6]">
                          {fib.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#C8A87A]" />
                        )}
                      </div>
                      <span className="block font-sans text-[10px] text-[#C8A87A] tracking-wider uppercase font-light mb-2">
                        {fib.origin}
                      </span>
                      <p className="font-sans text-[11px] text-[#9C9488] font-light line-clamp-2">
                        {fib.feel}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Section 04: PRESENTATION & ACCENTS (For Botanical Studies) */}
            {isBotanical && (
              <section className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-3">
                    <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] font-light">
                      04 / PRESENTATION VESSEL
                    </span>
                    <span className="font-sans text-[11px] tracking-[0.2em] text-[#9C9488] font-light">
                      MOUNTING
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BESPOKE_OPTIONS.vessels.map((v) => {
                      const isSelected = v.id === currentVessel.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setActiveVesselId(v.id)}
                          className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#171513] border-[#C8A87A]"
                              : "bg-[#171513]/40 border-[#F3EFE6]/10 hover:border-[#F3EFE6]/30"
                          }`}
                        >
                          <h5 className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#F3EFE6] font-light mb-1">
                            {v.name}
                          </h5>
                          <p className="font-sans text-[10px] text-[#9C9488] font-light">
                            {v.finishNote}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-3">
                    <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] font-light">
                      BOTANICAL ACCENTS
                    </span>
                    <span className="font-sans text-[11px] tracking-[0.2em] text-[#9C9488] font-light">
                      FOLIAGE DETAIL
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BESPOKE_OPTIONS.accents.map((a) => {
                      const isSelected = a.id === currentAccent.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setActiveAccentId(a.id)}
                          className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#171513] border-[#C8A87A]"
                              : "bg-[#171513]/40 border-[#F3EFE6]/10 hover:border-[#F3EFE6]/30"
                          }`}
                        >
                          <h5 className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#F3EFE6] font-light mb-1">
                            {a.name}
                          </h5>
                          <p className="font-sans text-[10px] text-[#9C9488] font-light">
                            {a.materialNote}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Section 05: PERSONAL DEDICATION & SIZING NOTES */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3EFE6]/15 pb-3">
                <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C8A87A] font-light">
                  {isBotanical ? "05 / DEDICATION & NOTES" : "04 / DEDICATION & NOTES"}
                </span>
                <span className="font-sans text-[11px] tracking-[0.2em] text-[#9C9488] font-light">
                  ATELIER INSCRIPTION
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="clientName"
                    className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light mb-2"
                  >
                    PATRON NAME / EMBROIDERY INITIALS
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter patron name or initials"
                    className="w-full bg-[#171513] border border-[#F3EFE6]/15 rounded-xl px-4 py-3 text-xs tracking-wider text-[#F3EFE6] focus:outline-none focus:border-[#C8A87A] transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customNotes"
                    className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light mb-2"
                  >
                    CUSTOM DIMENSIONS / FIBER INQUIRIES
                  </label>
                  <textarea
                    id="customNotes"
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Specify sizing preferences, private residential palette references, or gifting deadlines..."
                    className="w-full bg-[#171513] border border-[#F3EFE6]/15 rounded-xl p-4 text-xs tracking-wider text-[#F3EFE6] focus:outline-none focus:border-[#C8A87A] transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            {/* PHYSICAL HAND-NUMBERED ATELIER LEDGER SLIP */}
            <section className="rounded-2xl bg-[#171513] border border-[#F3EFE6]/15 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
              {/* Perforated top hairline */}
              <div className="border-b border-dashed border-[#F3EFE6]/20 pb-4 flex items-center justify-between">
                <div>
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#C8A87A] block font-light">
                    OFFICIAL COMMISSION DOSSIER
                  </span>
                  <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#F3EFE6] font-light">
                    {ledgerSerial}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9C9488] block font-light">
                    ATELIER
                  </span>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#F3EFE6] font-light">
                    HYDERABAD, INDIA
                  </span>
                </div>
              </div>

              {/* Commission Ledger Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-light">
                <div>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9C9488] block mb-1">
                    SILHOUETTE
                  </span>
                  <span className="text-[#F3EFE6] tracking-wider block">
                    {currentSilhouette.name}
                  </span>
                </div>
                <div>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9C9488] block mb-1">
                    LIVING FIBER
                  </span>
                  <span className="text-[#F3EFE6] tracking-wider block">
                    {currentFiber.name}
                  </span>
                </div>
                <div>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9C9488] block mb-1">
                    PALETTE
                  </span>
                  <span className="text-[#F3EFE6] tracking-wider block">
                    {currentPalette.name}
                  </span>
                </div>
                <div>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9C9488] block mb-1">
                    LEAD TIME
                  </span>
                  <span className="text-[#F3EFE6] tracking-wider block">
                    {currentSilhouette.leadTime}
                  </span>
                </div>
              </div>

              {/* Actions: Primary WhatsApp submission + Secondary Copy dossier */}
              <div className="pt-4 border-t border-[#F3EFE6]/10 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-[#F3EFE6] text-[#0E0D0C] hover:bg-white px-8 py-4 text-xs font-light tracking-[0.22em] uppercase font-sans flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_24px_rgba(243,239,230,0.12)]"
                >
                  <MessageSquare className="w-4 h-4 text-[#0E0D0C]" />
                  <span>CONFIRM COMMISSION VIA WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyDossier}
                  className="btn-stitched px-6 py-4"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C8A87A]" />
                      <span>DOSSIER COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY BRIEF</span>
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
