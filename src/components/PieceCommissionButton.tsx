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
    router.push("/#bespoke");
  };

  return (
    <button
      onClick={handleCommissionClick}
      className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#C6A972] hover:bg-[#DFCA9B] text-[#0A0A0B] font-sans text-[11px] tracking-[0.28em] uppercase font-medium transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
    >
      <span>COMMISSION THIS SILHOUETTE</span>
      <ArrowUpRight strokeWidth={1.25} className="w-4 h-4" />
    </button>
  );
}
