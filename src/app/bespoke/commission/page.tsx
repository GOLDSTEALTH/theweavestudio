import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BespokeStudio } from "@/components/BespokeStudio";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { VaultDrawer } from "@/components/VaultDrawer";

export const metadata: Metadata = {
  title: "The Commission Table | Bespoke Atelier Dossier",
  description:
    "Curate living fibers, hand-dyed palettes, and bespoke dimensions for custom handcrafted commissions from The Weave Studio in Hyderabad.",
};

interface PageProps {
  searchParams: Promise<{
    silhouette?: string;
  }>;
}

async function CommissionContent({
  searchParams,
}: {
  searchParams: Promise<{ silhouette?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialSilhouetteId = resolvedParams?.silhouette;

  return (
    <BespokeStudio
      initialSilhouetteId={initialSilhouetteId}
      isFullScreenRoute={true}
    />
  );
}

export default function CommissionPage({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6] relative">
      <Navbar />

      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4 pt-32">
            <div className="w-8 h-8 rounded-full border border-[#C8A87A]/30 border-t-[#C8A87A] animate-spin" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#9C9488] font-light">
              PREPARING COMMISSION TABLE
            </span>
          </div>
        }
      >
        <CommissionContent searchParams={searchParams} />
      </Suspense>

      <ContinueYourJourney
        cards={[
          {
            title: "THE ATELIER",
            description: "Step inside our Hyderabad studio where every loop is tensioned by hand.",
            image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
            href: "/atelier",
          },
          {
            title: "ARCHIVE EDITIONS",
            description: "Explore the numbered permanent archive of couture wear and textiles.",
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
            href: "/collections",
          },
          {
            title: "PATRONAGE & CARE",
            description: "Learn about lifetime restoration, block-steaming, and private curation.",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
            href: "/patronage",
          },
        ]}
      />

      <Footer />
      <VaultDrawer />
    </main>
  );
}
