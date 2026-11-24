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
    router.push(`/bespoke/commission?silhouette=${silhouetteId}`);
  };

  return (
    <button
      onClick={handleCommissionClick}
      className="btn-stitched w-full py-4 text-[11px] font-light tracking-[0.22em] uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A87A]"
    >
      <span className="stitch-dot" />
      <span>COMMISSION THIS SILHOUETTE</span>
      <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 ml-1" />
    </button>
  );
}
