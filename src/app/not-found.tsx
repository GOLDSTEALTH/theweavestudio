import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-[#F4F1EA] flex items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-6">
        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C6A972] block">
          ARCHIVE NOT FOUND / 404
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#F4F1EA] font-light">
          The requested edition does not exist in the atelier ledger.
        </h1>

        <p className="font-sans text-xs text-[#9A968E] font-light leading-relaxed">
          The piece or chapter you are seeking may have been retired or cataloged under a different provenance reference.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-[#C6A972] text-[#F4F1EA] hover:text-[#C6A972] transition-colors font-sans text-[11px] tracking-[0.25em] uppercase font-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
          >
            <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
            <span>RETURN TO THE ATELIER</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
