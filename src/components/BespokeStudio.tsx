"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Check, Copy, MessageSquare, Layers, Sparkles, Box, Palette as PaletteIcon } from "lucide-react";
import { BESPOKE_OPTIONS, ATELIER_CONFIG, createWhatsAppCommissionLink } from "@/data/atelier";
import { useAtelier } from "@/context/AtelierContext";

// Dynamically load the 3D Stage on client-side only with Obsidian Gallery skeleton loader
const BespokeBouquet3D = dynamic(
  () => import("@/components/BespokeBouquet3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#0D0D0F] border border-white/10 space-y-4">
        <div className="w-8 h-8 rounded-full border border-[#C6A972]/30 border-t-[#C6A972] animate-spin" />
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#9A968E]">
          INITIALIZING 3D BESPOKE STAGE
        </span>
      </div>
    ),
  }
);

type QuickCategory = "palette" | "fiber" | "vessel" | "accent";

export function BespokeStudio() {
  const { selectedSilhouette, setSelectedSilhouette } = useAtelier();

  const [activeFiberId, setActiveFiberId] = useState(BESPOKE_OPTIONS.fibers[0].id);
  const [activePaletteId, setActivePaletteId] = useState(BESPOKE_OPTIONS.palettes[0].id);
  const [activeVesselId, setActiveVesselId] = useState(BESPOKE_OPTIONS.vessels[0].id);
  const [activeAccentId, setActiveAccentId] = useState(BESPOKE_OPTIONS.accents[0].id);
  const [quickCategory, setQuickCategory] = useState<QuickCategory>("palette");

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

  const whatsappUrl = createWhatsAppCommissionLink({
    silhouetteName: currentSilhouette.name,
    fiberName: currentFiber.name,
    paletteName: currentPalette.name,
    clientName,
    notes: customNotes,
    leadTime: currentSilhouette.leadTime,
    vesselName: currentVessel.name,
    accentName: currentAccent.name,
  });

  const generateBriefText = () => {
    return (
      `THE WEAVE STUDIO — BESPOKE COMMISSION DOSSIER\n` +
      `========================================\n` +
      `Patron Name: ${clientName.trim() || "Anonymous Patron"}\n` +
      `Selected Silhouette: ${currentSilhouette.name} (${currentSilhouette.subtitle})\n` +
      `Estimated Lead Time: ${currentSilhouette.leadTime}\n` +
      `Selected Fiber: ${currentFiber.name} [Origin: ${currentFiber.origin}]\n` +
      `Curated Palette: ${currentPalette.name} (${currentPalette.editorialLabel})\n` +
      `Presentation Vessel: ${currentVessel.name}\n` +
      `Botanical Accents: ${currentAccent.name}\n` +
      `Estimated Craft Hours: ${currentSilhouette.startingHours}\n` +
      `Special Sizing / Inscription Notes:\n` +
      `${customNotes.trim() || "Standard Atelier Proportions"}\n` +
      `========================================\n` +
      `Atelier Location: Hyderabad, India\n` +
      `Direct Concierge: ${ATELIER_CONFIG.whatsappConciergeNumber}`
    );
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

  return (
    <section id="bespoke" className="relative w-full bg-[#0A0A0B] py-28 sm:py-36 lg:py-44">
      {/* Section Header */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="border-b border-white/10 pb-10 space-y-3">
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#C6A972]">
            CHAPTER III — BESPOKE COMMISSIONING
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F4F1EA] font-light">
            The Commission Studio
          </h2>
          <p className="font-sans text-xs text-[#9A968E] font-light max-w-2xl leading-relaxed tracking-wide pt-2">
            Configure your bespoke floral sculpture in real time. Manipulate tactile fibers, curated dual-tone palettes, presentation vessels, and accents on the live interactive atelier stage.
          </p>
        </div>
      </div>

      {/* Rolls-Royce Bespoke Live 3D Stage */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 mb-16 sm:mb-24">
        <div className="border border-white/10 bg-[#0D0D0F] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Top Bar above 3D Canvas */}
          <div className="px-6 py-4 border-b border-white/10 bg-[#0A0A0B]/90 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C6A972] animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#F4F1EA] font-medium">
                LIVE 3D BESPOKE STAGE — CROCHETED BOTANICAL BOUQUET
              </span>
            </div>
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9A968E] hidden sm:inline">
              DRAG TO ROTATE &bull; DEDICATED ZOOM &bull; ZERO SCROLL INTERFERENCE
            </span>
          </div>

          {/* 3D Viewport Frame */}
          <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px]">
            <BespokeBouquet3D
              palette={currentPalette}
              fiber={currentFiber}
              vessel={currentVessel}
              accent={currentAccent}
            />
          </div>

          {/* Inline Quick-Switcher Bar (Rolls-Royce Bespoke Bar) */}
          <div className="border-t border-white/10 bg-[#121214] p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Selector Tabs */}
              <div className="flex items-center gap-1 sm:gap-2 border-b lg:border-b-0 border-white/10 pb-3 lg:pb-0">
                <button
                  onClick={() => setQuickCategory("palette")}
                  className={`flex items-center gap-2 px-3 py-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                    quickCategory === "palette"
                      ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                      : "text-[#9A968E] hover:text-[#F4F1EA] bg-[#0A0A0B]"
                  }`}
                >
                  <PaletteIcon className="w-3 h-3" />
                  <span>PALETTES</span>
                </button>

                <button
                  onClick={() => setQuickCategory("fiber")}
                  className={`flex items-center gap-2 px-3 py-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                    quickCategory === "fiber"
                      ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                      : "text-[#9A968E] hover:text-[#F4F1EA] bg-[#0A0A0B]"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>FIBERS</span>
                </button>

                <button
                  onClick={() => setQuickCategory("vessel")}
                  className={`flex items-center gap-2 px-3 py-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                    quickCategory === "vessel"
                      ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                      : "text-[#9A968E] hover:text-[#F4F1EA] bg-[#0A0A0B]"
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>VESSEL / WRAP</span>
                </button>

                <button
                  onClick={() => setQuickCategory("accent")}
                  className={`flex items-center gap-2 px-3 py-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                    quickCategory === "accent"
                      ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                      : "text-[#9A968E] hover:text-[#F4F1EA] bg-[#0A0A0B]"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>ACCENTS</span>
                </button>
              </div>

              {/* Active Category Options Row */}
              <div className="flex flex-wrap items-center gap-2">
                {quickCategory === "palette" &&
                  BESPOKE_OPTIONS.palettes.map((p) => {
                    const isSelected = p.id === activePaletteId;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActivePaletteId(p.id)}
                        className={`group flex items-center gap-2.5 px-3 py-2 border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                          isSelected
                            ? "border-[#C6A972] bg-[#0A0A0B]"
                            : "border-white/10 bg-[#0A0A0B]/60 hover:border-white/25"
                        }`}
                        title={p.name}
                      >
                        <div className="flex items-center overflow-hidden border border-white/20 w-6 h-3.5">
                          <span className="w-1/2 h-full" style={{ backgroundColor: p.primaryHex }} />
                          <span className="w-1/2 h-full" style={{ backgroundColor: p.secondaryHex }} />
                        </div>
                        <span className={`font-sans text-[10px] tracking-wider uppercase font-light ${
                          isSelected ? "text-[#C6A972] font-medium" : "text-[#F4F1EA]"
                        }`}>
                          {p.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}

                {quickCategory === "fiber" &&
                  BESPOKE_OPTIONS.fibers.map((f) => {
                    const isSelected = f.id === activeFiberId;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setActiveFiberId(f.id)}
                        className={`flex items-center gap-2 px-3 py-2 border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                          isSelected
                            ? "border-[#C6A972] bg-[#0A0A0B] text-[#C6A972]"
                            : "border-white/10 bg-[#0A0A0B]/60 text-[#F4F1EA] hover:border-white/25"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 border border-white/20"
                          style={{ backgroundColor: f.swatchTone }}
                        />
                        <span className="font-sans text-[10px] tracking-wider uppercase font-light">
                          {f.name.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}

                {quickCategory === "vessel" &&
                  BESPOKE_OPTIONS.vessels.map((v) => {
                    const isSelected = v.id === activeVesselId;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setActiveVesselId(v.id)}
                        className={`px-3 py-2 border font-sans text-[10px] tracking-wider uppercase font-light transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                          isSelected
                            ? "border-[#C6A972] bg-[#0A0A0B] text-[#C6A972] font-medium"
                            : "border-white/10 bg-[#0A0A0B]/60 text-[#F4F1EA] hover:border-white/25"
                        }`}
                      >
                        {v.name}
                      </button>
                    );
                  })}

                {quickCategory === "accent" &&
                  BESPOKE_OPTIONS.accents.map((a) => {
                    const isSelected = a.id === activeAccentId;
                    return (
                      <button
                        key={a.id}
                        onClick={() => setActiveAccentId(a.id)}
                        className={`px-3 py-2 border font-sans text-[10px] tracking-wider uppercase font-light transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                          isSelected
                            ? "border-[#C6A972] bg-[#0A0A0B] text-[#C6A972] font-medium"
                            : "border-white/10 bg-[#0A0A0B]/60 text-[#F4F1EA] hover:border-white/25"
                        }`}
                      >
                        {a.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Configurator & Live Dossier */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: 6-Step Deep Configurator */}
          <div className="lg:col-span-7 space-y-16 sm:space-y-24">
            {/* Step 1: Silhouette */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.25em] text-[#C6A972]">STEP 01</span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Select Foundational Silhouette</span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] uppercase hidden sm:inline">
                  GEOMETRY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BESPOKE_OPTIONS.silhouettes.map((sil) => {
                  const isSelected = sil.id === selectedSilhouette;
                  return (
                    <button
                      key={sil.id}
                      onClick={() => setSelectedSilhouette(sil.id)}
                      className={`group relative text-left p-4 sm:p-5 border transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                        isSelected
                          ? "border-[#C6A972] bg-[#121214]"
                          : "border-white/10 bg-[#0A0A0B] hover:border-white/20"
                      }`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-[#18181B]">
                        <Image
                          src={sil.image}
                          alt={sil.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover object-center filter brightness-[0.85] group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-2 right-2 font-sans text-[9px] tracking-[0.2em] text-[#C6A972] bg-[#0A0A0B]/80 px-2 py-0.5">
                          {sil.startingHours}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-lg text-[#F4F1EA] font-light">
                            {sil.name}
                          </h4>
                          <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] uppercase block mt-0.5">
                            {sil.subtitle}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-none border border-[#C6A972] flex items-center justify-center text-[#C6A972]">
                            <Check strokeWidth={1.5} className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <p className="font-sans text-xs text-[#9A968E] font-light mt-3 line-clamp-2">
                        {sil.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Tactile Fiber */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.25em] text-[#C6A972]">STEP 02</span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Choose Tactile Fiber</span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] uppercase hidden sm:inline">
                  PROVENANCE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BESPOKE_OPTIONS.fibers.map((fiber) => {
                  const isSelected = fiber.id === activeFiberId;
                  return (
                    <button
                      key={fiber.id}
                      onClick={() => setActiveFiberId(fiber.id)}
                      className={`group relative text-left p-5 border transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                        isSelected
                          ? "border-[#C6A972] bg-[#121214]"
                          : "border-white/10 bg-[#0A0A0B] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-4 h-4 border border-white/20 inline-block"
                            style={{ backgroundColor: fiber.swatchTone }}
                          />
                          <h4 className="font-serif text-lg text-[#F4F1EA] font-light">
                            {fiber.name}
                          </h4>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-none border border-[#C6A972] flex items-center justify-center text-[#C6A972]">
                            <Check strokeWidth={1.5} className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      <span className="font-sans text-[9px] tracking-[0.25em] text-[#C6A972] uppercase block mb-2">
                        ORIGIN: {fiber.origin}
                      </span>

                      <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed mb-3">
                        {fiber.description}
                      </p>

                      <div className="pt-2 border-t border-white/10 text-[10px] space-y-1">
                        <div>
                          <span className="text-[#9A968E] uppercase tracking-wider">Tactile Hand: </span>
                          <span className="text-[#F4F1EA] font-light">{fiber.feel}</span>
                        </div>
                        <div>
                          <span className="text-[#9A968E] uppercase tracking-wider">Drape Behavior: </span>
                          <span className="text-[#F4F1EA] font-light">{fiber.drape}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Curate Palette */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.25em] text-[#C6A972]">STEP 03</span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Curate Designer Palette</span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] uppercase hidden sm:inline">
                  5 CURATED DUO-TONES
                </span>
              </div>

              <div className="space-y-3">
                {BESPOKE_OPTIONS.palettes.map((palette) => {
                  const isSelected = palette.id === activePaletteId;
                  return (
                    <button
                      key={palette.id}
                      onClick={() => setActivePaletteId(palette.id)}
                      className={`w-full group text-left p-4 sm:p-5 border transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                        isSelected
                          ? "border-[#C6A972] bg-[#121214]"
                          : "border-white/10 bg-[#0A0A0B] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center overflow-hidden border border-white/20 w-14 h-8 shrink-0">
                          <span
                            className="w-1/2 h-full inline-block"
                            style={{ backgroundColor: palette.primaryHex }}
                          />
                          <span
                            className="w-1/2 h-full inline-block"
                            style={{ backgroundColor: palette.secondaryHex }}
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-serif text-lg text-[#F4F1EA] font-light">
                              {palette.name}
                            </h4>
                            <span className="font-sans text-[9px] tracking-[0.22em] text-[#C6A972] uppercase border border-[#C6A972]/30 px-1.5 py-0.5">
                              {palette.editorialLabel}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-[#9A968E] font-light mt-1">
                            {palette.narrative}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end sm:shrink-0">
                        {isSelected ? (
                          <div className="w-5 h-5 border border-[#C6A972] flex items-center justify-center text-[#C6A972]">
                            <Check strokeWidth={1.5} className="w-3 h-3" />
                          </div>
                        ) : (
                          <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E]/60 uppercase group-hover:text-[#F4F1EA] transition-colors">
                            SELECT
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Presentation Vessel / Wrapping Style */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.25em] text-[#C6A972]">STEP 04</span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Select Presentation Vessel</span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] uppercase hidden sm:inline">
                  3 BESPOKE STYLES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BESPOKE_OPTIONS.vessels.map((v) => {
                  const isSelected = v.id === activeVesselId;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVesselId(v.id)}
                      className={`text-left p-4 sm:p-5 border transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                        isSelected
                          ? "border-[#C6A972] bg-[#121214]"
                          : "border-white/10 bg-[#0A0A0B] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[9px] tracking-[0.25em] text-[#C6A972] uppercase">
                          {v.subtitle}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 border border-[#C6A972] flex items-center justify-center text-[#C6A972]">
                            <Check strokeWidth={1.5} className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-serif text-base text-[#F4F1EA] font-light mb-2">
                        {v.name}
                      </h4>
                      <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed">
                        {v.description}
                      </p>
                      <span className="font-sans text-[9px] text-[#9A968E]/70 block mt-2 pt-2 border-t border-white/10 italic">
                        {v.finishNote}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Botanical & Hardware Accents */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.25em] text-[#C6A972]">STEP 05</span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Curate Botanical Accents</span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] uppercase hidden sm:inline">
                  FLORAL EMBELLISHMENTS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BESPOKE_OPTIONS.accents.map((a) => {
                  const isSelected = a.id === activeAccentId;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setActiveAccentId(a.id)}
                      className={`text-left p-4 sm:p-5 border transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                        isSelected
                          ? "border-[#C6A972] bg-[#121214]"
                          : "border-white/10 bg-[#0A0A0B] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[9px] tracking-[0.25em] text-[#C6A972] uppercase">
                          {a.subtitle}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 border border-[#C6A972] flex items-center justify-center text-[#C6A972]">
                            <Check strokeWidth={1.5} className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-serif text-base text-[#F4F1EA] font-light mb-2">
                        {a.name}
                      </h4>
                      <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed">
                        {a.description}
                      </p>
                      <span className="font-sans text-[9px] text-[#9A968E]/70 block mt-2 pt-2 border-t border-white/10 italic">
                        {a.materialNote}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Personal Inscription & Sizing Notes */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs tracking-[0.25em] text-[#C6A972]">STEP 06</span>
                  <span className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">Patron Inscription & Specifications</span>
                </div>
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#9A968E] uppercase hidden sm:inline">
                  PROVENANCE
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="patron-name" className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E] mb-2 cursor-pointer">
                    PATRON NAME / MONOGRAM DEDICATION
                  </label>
                  <input
                    id="patron-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Lady Catherine S. / Initials 'CS'"
                    className="w-full bg-[#121214] border border-white/15 px-4 py-3.5 text-sm text-[#F4F1EA] placeholder-[#9A968E]/50 font-sans focus:outline-none focus:border-[#C6A972] focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="custom-notes" className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A968E] mb-2 cursor-pointer">
                    CUSTOM SIZING & ARCHITECTURAL NOTES
                  </label>
                  <textarea
                    id="custom-notes"
                    rows={4}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Provide specific dimensions, handle drop preference, wall space requirements, or event deadline."
                    className="w-full bg-[#121214] border border-white/15 px-4 py-3.5 text-sm text-[#F4F1EA] placeholder-[#9A968E]/50 font-sans focus:outline-none focus:border-[#C6A972] focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Sticky Commission Dossier */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 bg-[#121214] border border-white/10 p-6 sm:p-8 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Dossier Header */}
              <div className="border-b border-white/10 pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C6A972]">
                    COMMISSION DOSSIER
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#9A968E]">
                    {ATELIER_CONFIG.founded} / {ATELIER_CONFIG.monogram}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#F4F1EA] font-light">
                  {currentSilhouette.name}
                </h3>
                <p className="font-sans text-[11px] tracking-[0.2em] text-[#9A968E] uppercase">
                  {currentSilhouette.subtitle}
                </p>
              </div>

              {/* Real-time Dossier Specs Table */}
              <div className="space-y-4 font-sans text-xs">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">PATRON</span>
                  <span className="text-[#F4F1EA] font-light">
                    {clientName.trim() || "Anonymous Patron"}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">MATERIAL FIBER</span>
                  <span className="text-[#F4F1EA] font-light text-right">
                    {currentFiber.name}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">PALETTE</span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-3 border border-white/20 flex overflow-hidden">
                      <span className="w-1/2 h-full" style={{ backgroundColor: currentPalette.primaryHex }} />
                      <span className="w-1/2 h-full" style={{ backgroundColor: currentPalette.secondaryHex }} />
                    </div>
                    <span className="text-[#F4F1EA] font-light">{currentPalette.name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">VESSEL / WRAP</span>
                  <span className="text-[#F4F1EA] font-light text-right">
                    {currentVessel.name}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">BOTANICAL ACCENT</span>
                  <span className="text-[#F4F1EA] font-light text-right">
                    {currentAccent.name}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">ESTIMATED CRAFT</span>
                  <span className="text-[#C6A972] font-medium tracking-wider">
                    {currentSilhouette.startingHours}
                  </span>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">LEAD TIME</span>
                  <span className="text-[#F4F1EA] font-light">{currentSilhouette.leadTime} Handcraft</span>
                </div>

                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-[#9A968E] uppercase text-[10px] tracking-[0.2em]">ORIGIN DISPATCH</span>
                  <span className="text-[#F4F1EA] font-light">{ATELIER_CONFIG.location}</span>
                </div>
              </div>

              {/* Inscription Note Preview */}
              {customNotes.trim() && (
                <div className="p-3 bg-[#0A0A0B] border border-white/10 text-xs">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C6A972] block mb-1">
                    CLIENT SPECIFICATION
                  </span>
                  <p className="text-[#9A968E] font-light italic truncate">
                    &ldquo;{customNotes.trim()}&rdquo;
                  </p>
                </div>
              )}

              {/* Actions & WhatsApp Handshake */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#C6A972] hover:bg-[#DFCA9B] text-[#0A0A0B] font-sans text-[11px] tracking-[0.28em] uppercase font-medium transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                >
                  <MessageSquare strokeWidth={1.5} className="w-4 h-4" />
                  <span>REQUEST PRIVATE CONSULTATION</span>
                </a>

                <button
                  onClick={handleCopyBrief}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 border border-white/20 bg-transparent hover:border-[#C6A972] hover:text-[#C6A972] text-[#F4F1EA] font-sans text-[11px] tracking-[0.25em] uppercase font-light transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
                >
                  {isCopied ? (
                    <>
                      <Check strokeWidth={1.5} className="w-3.5 h-3.5 text-[#C6A972]" />
                      <span className="text-[#C6A972]">BRIEF COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy strokeWidth={1.25} className="w-3.5 h-3.5 text-[#9A968E]" />
                      <span>COPY COMMISSION BRIEF</span>
                    </>
                  )}
                </button>
              </div>

              <div className="border-t border-white/10 pt-4 text-center">
                <p className="font-serif text-xs text-[#9A968E] italic">
                  Private consultations include direct fabric swatch dispatch and video conference with the lead artisan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
