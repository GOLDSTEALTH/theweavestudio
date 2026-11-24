"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useAtelier } from "@/context/AtelierContext";

interface Props {
  silhouetteId: string;
}

export function PieceCommissionButton({ silhouetteId }: Props) {
  const router = useRouter();
  const { setSelectedSilhouette } = useAtelier();

  const handleCommissionClick = () => {
    setSelectedSilhouette(silhouetteId);
    router.push(`/bespoke/configure?silhouette=${silhouetteId}`);
  };

  return (
    <button
      onClick={handleCommissionClick}
      className="w-full flex items-center justify-center gap-3 rounded-full border border-white/60 bg-transparent px-8 py-4 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
    >
      <span>COMMISSION THIS SILHOUETTE</span>
      <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
    </button>
  );
}
