import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#000000] text-white flex items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-6">
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/40 block font-light">
          ARCHIVE NOT FOUND / 404
        </span>

        <h1 className="font-sans text-3xl sm:text-5xl text-white font-light tracking-[0.16em] uppercase leading-tight">
          THE REQUESTED EDITION DOES NOT EXIST IN THE LEDGER
        </h1>

        <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
          The piece or chapter you are seeking may have been retired or cataloged under a different provenance reference.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          >
            <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
            <span>RETURN TO THE ATELIER</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
