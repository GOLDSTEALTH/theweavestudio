"use client";

import React, { createContext, useContext, useState } from "react";

interface AtelierContextType {
  isVaultOpen: boolean;
  openVault: () => void;
  closeVault: () => void;
  toggleVault: () => void;
  selectedSilhouette: string;
  setSelectedSilhouette: (id: string) => void;
}

const AtelierContext = createContext<AtelierContextType>({
  isVaultOpen: false,
  openVault: () => {},
  closeVault: () => {},
  toggleVault: () => {},
  selectedSilhouette: "structured-tote",
  setSelectedSilhouette: () => {},
});

export function useAtelier() {
  return useContext(AtelierContext);
}

export function AtelierProvider({ children }: { children: React.ReactNode }) {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [selectedSilhouette, setSelectedSilhouette] = useState("structured-tote");

  const openVault = () => setIsVaultOpen(true);
  const closeVault = () => setIsVaultOpen(false);
  const toggleVault = () => setIsVaultOpen((prev) => !prev);

  return (
    <AtelierContext.Provider
      value={{
        isVaultOpen,
        openVault,
        closeVault,
        toggleVault,
        selectedSilhouette,
        setSelectedSilhouette,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
}
