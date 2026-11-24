"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Check, Copy, MessageSquare, X, FileText } from "lucide-react";
import {
  BESPOKE_OPTIONS,
  ATELIER_CONFIG,
  createWhatsAppCommissionLink,
} from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";

// Dynamically load the 3D Stage on client-side only with pure monochrome skeleton loader
const BespokeBouquet3D = dynamic(
  () => import("@/components/BespokeBouquet3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#000000] border border-white/10 space-y-4">
        <div className="w-8 h-8 rounded-full border border-white/30 border-t-white animate-spin" />
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 font-light">
          INITIALIZING 3D BESPOKE STAGE
        </span>
      </div>
    ),
  }
);

type ConfigTab = "PALETTE" | "FIBER" | "VESSEL" | "ACCENTS" | "COMMISSION SUMMARY";

interface BespokeStudioProps {
  initialSilhouetteId?: string;
  isFullScreenRoute?: boolean;
}

export function BespokeStudio({ initialSilhouetteId, isFullScreenRoute = false }: BespokeStudioProps) {
  const { selectedSilhouette, setSelectedSilhouette } = useAtelier();

  // If initialSilhouetteId passed from route query, sync it
  useEffect(() => {
    if (initialSilhouetteId) {
      setSelectedSilhouette(initialSilhouetteId);
    }
  }, [initialSilhouetteId, setSelectedSilhouette]);

  const [activeTab, setActiveTab] = useState<ConfigTab>("PALETTE");
  const [activeFiberId, setActiveFiberId] = useState(BESPOKE_OPTIONS.fibers[0].id);
  const [activePaletteId, setActivePaletteId] = useState(BESPOKE_OPTIONS.palettes[0].id);
  const [activeVesselId, setActiveVesselId] = useState(BESPOKE_OPTIONS.vessels[0].id);
  const [activeAccentId, setActiveAccentId] = useState(BESPOKE_OPTIONS.accents[0].id);

  const [clientName, setClientName] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const isBotanical = selectedSilhouette === "botanical-study";

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

  const generateBriefText = () => {
    let text =
      `THE WEAVE STUDIO — BESPOKE COMMISSION DOSSIER\n` +
      `========================================\n` +
      `Patron Name: ${clientName.trim() || "Anonymous Patron"}\n` +
      `Selected Silhouette: ${currentSilhouette.name} (${currentSilhouette.subtitle})\n` +
      `Estimated Lead Time: ${currentSilhouette.leadTime}\n` +
      `Selected Fiber: ${currentFiber.name} [Origin: ${currentFiber.origin}]\n` +
      `Curated Palette: ${currentPalette.name} (${currentPalette.editorialLabel})\n` +
      `Stage Atmosphere: ${currentPalette.stageTheme.atmosphereLabel}\n`;

    if (isBotanical) {
      text +=
        `Presentation Vessel: ${currentVessel.name}\n` +
        `Botanical Accents: ${currentAccent.name}\n`;
    }

    text +=
      `Estimated Craft Hours: ${currentSilhouette.startingHours}\n` +
      `Special Sizing / Inscription Notes:\n` +
      `${customNotes.trim() || "Standard Atelier Proportions"}\n` +
      `========================================\n` +
      `Atelier Location: Hyderabad, India\n` +
      `Direct Concierge: ${ATELIER_CONFIG.whatsappConciergeNumber}`;

    return text;
  };

  const handleCopyBrief = async () => {
    const text = generateBriefText();
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
      setTimeout(() => setIsCopied(false), 2400);
    }
  };

  const handleTabClick = (tab: ConfigTab) => {
    setActiveTab(tab);
    if (tab === "COMMISSION SUMMARY") {
      setIsDossierOpen(true);
    }
  };

  return (
    <div
      className={`relative w-full ${
        isFullScreenRoute
          ? "h-[calc(100svh-80px)] min-h-[640px] overflow-hidden"
          : "min-h-[76vh] lg:h-[calc(100svh-80px)]"
      } bg-[#000000] flex flex-col justify-between`}
    >
      {/* Main 3D Canvas Viewport */}
      <div className="relative w-full flex-1 h-full overflow-hidden">
        <BespokeBouquet3D
          palette={currentPalette}
          fiber={currentFiber}
          vessel={currentVessel}
          accent={currentAccent}
          isBotanical={isBotanical}
        />
      </div>

      {/* Sleek Frosted-Glass Bottom Configurator Bar (5 clean tabs) */}
      <div className="relative z-30 w-full bg-black/85 backdrop-blur-2xl border-t border-white/15">
        {/* Tab Selection Row */}
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-2 overflow-x-auto border-b border-white/10">
          <div className="flex items-center gap-1 sm:gap-2">
            {(["PALETTE", "FIBER", "VESSEL", "ACCENTS"] as ConfigTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-3 sm:px-5 py-2 text-[10px] sm:text-[11px] font-light tracking-[0.22em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none whitespace-nowrap ${
                  activeTab === tab && !isDossierOpen
                    ? "bg-white text-black font-normal"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("COMMISSION SUMMARY");
                setIsDossierOpen(true);
              }}
              className="rounded-full border border-white/60 bg-transparent px-4 sm:px-6 py-2 text-[10px] sm:text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all hover:bg-white hover:text-black flex items-center gap-2 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>COMMISSION SUMMARY</span>
            </button>
          </div>
        </div>

        {/* Dynamic Configurator Options Drawer (Updates live without scrolling away) */}
        {!isDossierOpen && (
          <div className="max-w-[1720px] mx-auto px-4 sm:px-8 py-4 sm:py-5 overflow-x-auto">
            {/* 1. PALETTES TAB */}
            {activeTab === "PALETTE" && (
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1">
                {BESPOKE_OPTIONS.palettes.map((pal) => {
                  const isSelected = pal.id === activePaletteId;
                  return (
                    <button
                      key={pal.id}
                      onClick={() => setActivePaletteId(pal.id)}
                      className={`flex-shrink-0 p-3 sm:p-4 rounded-lg border text-left transition-all duration-300 flex items-center gap-3.5 focus-visible:outline-none ${
                        isSelected
                          ? "bg-white/10 border-white"
                          : "bg-black/40 border-white/10 hover:border-white/40"
                      }`}
                    >
                      {/* Dual-Tone Swatch Rings */}
                      <div className="flex -space-x-2">
                        <span
                          className="w-5 h-5 rounded-full border border-white/30"
                          style={{ backgroundColor: pal.primaryHex }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border border-white/30"
                          style={{ backgroundColor: pal.secondaryHex }}
                        />
                      </div>
                      <div>
                        <span className="block font-sans text-xs tracking-wider text-white uppercase font-light">
                          {pal.name}
                        </span>
                        <span className="block font-sans text-[9px] tracking-[0.2em] text-white/50 uppercase font-light">
                          {pal.stageTheme.atmosphereLabel}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. FIBERS TAB */}
            {activeTab === "FIBER" && (
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1">
                {BESPOKE_OPTIONS.fibers.map((fib) => {
                  const isSelected = fib.id === activeFiberId;
                  return (
                    <button
                      key={fib.id}
                      onClick={() => setActiveFiberId(fib.id)}
                      className={`flex-shrink-0 p-3 sm:p-4 rounded-lg border text-left transition-all duration-300 flex items-center gap-3.5 focus-visible:outline-none ${
                        isSelected
                          ? "bg-white/10 border-white"
                          : "bg-black/40 border-white/10 hover:border-white/40"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/30 flex-shrink-0"
                        style={{ backgroundColor: fib.swatchTone }}
                      />
                      <div>
                        <span className="block font-sans text-xs tracking-wider text-white uppercase font-light">
                          {fib.name}
                        </span>
                        <span className="block font-sans text-[9px] tracking-[0.2em] text-white/50 uppercase font-light">
                          {fib.origin}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. VESSELS TAB */}
            {activeTab === "VESSEL" && (
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1">
                {BESPOKE_OPTIONS.vessels.map((v) => {
                  const isSelected = v.id === activeVesselId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVesselId(v.id)}
                      className={`flex-shrink-0 p-3 sm:p-4 rounded-lg border text-left transition-all duration-300 focus-visible:outline-none ${
                        isSelected
                          ? "bg-white/10 border-white"
                          : "bg-black/40 border-white/10 hover:border-white/40"
                      }`}
                    >
                      <span className="block font-sans text-xs tracking-wider text-white uppercase font-light">
                        {v.name}
                      </span>
                      <span className="block font-sans text-[9px] tracking-[0.2em] text-white/50 uppercase font-light mt-0.5">
                        {v.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. ACCENTS TAB */}
            {activeTab === "ACCENTS" && (
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1">
                {BESPOKE_OPTIONS.accents.map((acc) => {
                  const isSelected = acc.id === activeAccentId;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => setActiveAccentId(acc.id)}
                      className={`flex-shrink-0 p-3 sm:p-4 rounded-lg border text-left transition-all duration-300 focus-visible:outline-none ${
                        isSelected
                          ? "bg-white/10 border-white"
                          : "bg-black/40 border-white/10 hover:border-white/40"
                      }`}
                    >
                      <span className="block font-sans text-xs tracking-wider text-white uppercase font-light">
                        {acc.name}
                      </span>
                      <span className="block font-sans text-[9px] tracking-[0.2em] text-white/50 uppercase font-light mt-0.5">
                        {acc.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right-Side Monochrome Dossier Drawer */}
      {isDossierOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsDossierOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="absolute inset-y-0 right-0 w-full max-w-xl bg-[#000000] border-l border-white/15 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-6">
                <div>
                  <span className="text-[10px] tracking-[0.28em] uppercase text-white/40 font-light block">
                    THE WEAVE STUDIO
                  </span>
                  <h3 className="font-sans text-2xl text-white font-light tracking-[0.16em] uppercase">
                    COMMISSION DOSSIER
                  </h3>
                </div>

                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="p-2 text-white/60 hover:text-white"
                  aria-label="Close Dossier Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Silhouette Switcher */}
              <div className="py-6 border-b border-white/10 space-y-3">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                  BASE SILHOUETTE
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BESPOKE_OPTIONS.silhouettes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSilhouette(s.id)}
                      className={`p-3 text-left border rounded transition-all text-xs font-light tracking-wide uppercase ${
                        selectedSilhouette === s.id
                          ? "bg-white text-black border-white font-normal"
                          : "bg-[#151515] text-white/70 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className="block truncate">{s.name}</span>
                      <span className="block text-[8px] text-white/40 tracking-wider">
                        {s.startingHours}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Curated Specifications Breakdown */}
              <div className="py-6 border-b border-white/10 space-y-3 text-xs font-sans">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                  COMMISSION SPECIFICATIONS
                </label>
                <div className="p-4 bg-[#151515] border border-white/10 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">TACTILE FIBER</span>
                    <span className="text-white font-light">{currentFiber.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">CURATED PALETTE</span>
                    <span className="text-white font-light">{currentPalette.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">ATMOSPHERE</span>
                    <span className="text-white font-light">{currentPalette.stageTheme.atmosphereLabel}</span>
                  </div>
                  {isBotanical && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">VESSEL</span>
                        <span className="text-white font-light">{currentVessel.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">ACCENTS</span>
                        <span className="text-white font-light">{currentAccent.name}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white/40 uppercase tracking-wider text-[9px] font-light">LEAD TIME</span>
                    <span className="text-white font-light">{currentSilhouette.leadTime}</span>
                  </div>
                </div>
              </div>

              {/* Optional Patron Name & Notes Inputs */}
              <div className="py-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                    PATRON NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sir Alistair Vance"
                    className="w-full bg-[#151515] border border-white/15 px-4 py-3 text-xs text-white placeholder-white/30 focus-visible:outline-none focus-visible:border-white font-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
                    CUSTOM MEASUREMENTS / INSCRIPTIONS
                  </label>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Enter custom dimensions, monogram initials, or spatial placement notes..."
                    className="w-full bg-[#151515] border border-white/15 p-4 text-xs text-white placeholder-white/30 focus-visible:outline-none focus-visible:border-white font-light resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/15 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-white text-black hover:bg-white/85 py-4 text-[11px] font-light tracking-[0.22em] uppercase transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>REQUEST PRIVATE CONSULTATION (WHATSAPP)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-transparent py-3 text-[11px] font-light tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-all"
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? "COPIED COMMISSION DOSSIER" : "COPY COMMISSION BRIEF"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
