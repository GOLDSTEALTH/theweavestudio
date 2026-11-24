import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { CraftsmanshipSection } from "@/components/CraftsmanshipSection";
import { BespokeStudio } from "@/components/BespokeStudio";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-[#F4F1EA] selection:bg-[#C6A972] selection:text-[#0A0A0B]">
      {/* Top Architectural Navigation Bar */}
      <Navbar />

      {/* Slide-over Private Vault Drawer for 1-of-1 available pieces */}
      <VaultDrawer />

      {/* 100svh Cinematic Full-Bleed Hero */}
      <Hero />

      {/* Signature Collection Chapters (Alternating Asymmetric Luxury Spreads) */}
      <CollectionShowcase />

      {/* Sticky Split-Screen Craftsmanship Deep-Dive (3 Tactile Pillars) */}
      <CraftsmanshipSection />

      {/* Interactive Bespoke Commission Studio (4-Step Configurator & Live Dossier) */}
      <BespokeStudio />

      {/* Editorial Luxury Footer with Provenance Colophon */}
      <Footer />
    </main>
  );
}
