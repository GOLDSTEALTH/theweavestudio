"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { BespokeStudio } from "@/components/BespokeStudio";

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const silhouetteId = searchParams.get("silhouette") || undefined;

  return (
    <BespokeStudio
      initialSilhouetteId={silhouetteId}
      isFullScreenRoute={true}
    />
  );
}

export default function BespokeConfigurePage() {
  return (
    <main className="h-[100svh] w-full overflow-hidden bg-[#000000] text-white flex flex-col justify-between">
      {/* Fixed Navigation Bar */}
      <Navbar />
      <VaultDrawer />

      {/* Top Spacer for Fixed Nav (80px / h-20) */}
      <div className="h-20 flex-shrink-0" />

      {/* Full-Screen 3D Configurator Stage */}
      <div className="flex-1 w-full overflow-hidden">
        <Suspense
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#000000] space-y-4">
              <div className="w-8 h-8 rounded-full border border-white/30 border-t-white animate-spin" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 font-light">
                INITIALIZING 3D CONFIGURATOR
              </span>
            </div>
          }
        >
          <ConfiguratorContent />
        </Suspense>
      </div>
    </main>
  );
}
