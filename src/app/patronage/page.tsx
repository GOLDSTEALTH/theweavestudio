"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MessageSquare, ShieldCheck, Sparkles, Home, Copy, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { VaultDrawer } from "@/components/VaultDrawer";
import { Footer } from "@/components/Footer";
import { ContinueYourJourney } from "@/components/ContinueYourJourney";
import { PATRONAGE_FAQS, createWhatsAppConciergeLink, ATELIER_CONFIG } from "@/data/atelier";

export default function PatronagePage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Bespoke Silhouette Consultation");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  const whatsappUrl = createWhatsAppConciergeLink({
    name,
    email,
    topic,
    message,
  });

  const handleCopyInquiry = async () => {
    const text =
      `THE WEAVE STUDIO — PRIVATE CONCIERGE INQUIRY\n` +
      `----------------------------------------\n` +
      `Patron: ${name.trim() || "Anonymous Patron"}\n` +
      `Email: ${email.trim() || "Not provided"}\n` +
      `Topic: ${topic}\n` +
      `Message: ${message.trim() || "I would like to request a private consultation."}\n` +
      `----------------------------------------\n` +
      `Atelier: Hyderabad, India`;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <Navbar />
      <VaultDrawer />

      {/* Editorial Hero */}
      <section className="relative w-full h-[85svh] min-h-[640px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop"
            alt="Care and Patronage at The Weave Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.52] contrast-[1.10]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
        </div>

        <div className="h-20" />

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-white/70">
            AN EFFORTLESS JOURNEY
          </span>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-[70px] font-light tracking-[0.18em] uppercase text-white leading-tight max-w-4xl mx-auto">
            CARE &amp; PATRONAGE
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-white/70 max-w-xl mx-auto leading-relaxed">
            Acquiring an edition from The Weave Studio is the genesis of a lifelong relationship. Discover our lifetime restoration commitments, preservation standards, and private salon appointments.
          </p>

          <div className="pt-4">
            <Link
              href="#concierge"
              className="inline-block rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase text-white transition-all duration-500 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            >
              CONTACT PRIVATE CONCIERGE
            </Link>
          </div>
        </div>

        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-white/40 font-light">
          <span>PATRON PRIVILEGES</span>
          <span>LIFETIME RESTORATION ASSURANCE</span>
        </div>
      </section>

      {/* Three Minimalist Care Pillars */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-white/15">
        <div className="border-b border-white/15 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              STEWARDSHIP PILLARS
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
              HEIRLOOM PRESERVATION
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-light">
            REGISTERED PATRONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Pillar 1 */}
          <div className="p-8 sm:p-10 border border-white/15 bg-[#151515] space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-sans text-lg text-white font-light tracking-[0.16em] uppercase">
              Hand Blocking &amp; Restoration
            </h3>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Living natural fibers breathe with climate. Registered patrons enjoy complimentary lifetime steam-blocking, shape alignment, and stitch re-tensioning at our Hyderabad atelier.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 sm:p-10 border border-white/15 bg-[#151515] space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-sans text-lg text-white font-light tracking-[0.16em] uppercase">
              Cedar &amp; Muslin Storage
            </h3>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Every commission departs in a custom-built, aromatic red cedar presentation case lined with unbleached organic muslin, establishing a permanent microclimate for generational defense.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 sm:p-10 border border-white/15 bg-[#151515] space-y-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
              <Home className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-sans text-lg text-white font-light tracking-[0.16em] uppercase">
              Private Studio Appointments
            </h3>
            <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
              Patrons receive priority private salon access at our Banjara Hills studio to inspect ongoing commissions, review yarn harvest archives, or initiate custom color-matched projects.
            </p>
          </div>
        </div>
      </section>

      {/* Expandable Monochrome FAQ Accordion */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-white/15">
        <div className="border-b border-white/15 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              QUESTIONS &amp; PROTOCOLS
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase">
              PATRONAGE FAQS
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-white/40 uppercase font-light">
            06 CHAPTERS
          </span>
        </div>

        <div className="divide-y divide-white/10 max-w-4xl">
          {PATRONAGE_FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;

            return (
              <div key={idx} className="py-6 sm:py-8">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-6 group focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[10px] tracking-[0.25em] text-white/40 font-light">
                      0{idx + 1}
                    </span>
                    <h3 className="font-sans text-base sm:text-lg text-white font-light tracking-wide group-hover:text-white/80 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-4 pl-8 sm:pl-12 text-xs sm:text-sm font-light text-white/60 leading-relaxed max-w-3xl">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct #concierge Private Consultation Form */}
      <section id="concierge" className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/40 block font-light">
              DIRECT APPOINTMENTS
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-light tracking-[0.18em] uppercase leading-snug">
              REQUEST A PRIVATE SALON CONSULTATION
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Complete the inquiry form to open a direct dialogue with our Hyderabad Concierge via verified WhatsApp. Swatch folios and private showroom visits are scheduled upon review.
            </p>

            <div className="pt-6 border-t border-white/10 space-y-3 text-xs font-sans text-white/60">
              <div>
                <span className="text-white uppercase tracking-wider text-[10px] block font-light">ATELIER DIRECT WHATSAPP:</span>
                <span className="font-light">{ATELIER_CONFIG.whatsappConciergeNumber}</span>
              </div>
              <div>
                <span className="text-white uppercase tracking-wider text-[10px] block font-light">STUDIO LOCATION:</span>
                <span className="font-light">Banjara Hills, Hyderabad, India</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#151515] border border-white/15 p-8 sm:p-12 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/50 font-light">
                  PATRON NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lady Katherine Sterling"
                  className="w-full bg-[#1E1E1E] border border-white/15 px-4 py-3.5 text-xs text-white placeholder-white/30 focus-visible:outline-none focus-visible:border-white font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-white/50 font-light">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full bg-[#1E1E1E] border border-white/15 px-4 py-3.5 text-xs text-white placeholder-white/30 focus-visible:outline-none focus-visible:border-white font-light"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-white/50 font-light">
                INQUIRY TOPIC
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-white/15 px-4 py-3.5 text-xs text-white focus-visible:outline-none focus-visible:border-white font-light"
              >
                <option value="Bespoke Silhouette Consultation">Bespoke Silhouette Consultation</option>
                <option value="Yarn Swatch Box Dispatch">Yarn Swatch Box Dispatch</option>
                <option value="Architectural Tapestry Commission">Architectural Tapestry Commission</option>
                <option value="Private Salon Viewing (Hyderabad)">Private Salon Viewing (Hyderabad)</option>
                <option value="Heirloom Restoration & Re-Blocking">Heirloom Restoration & Re-Blocking</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-white/50 font-light">
                SPECIFICATIONS / NOTES
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail preferred palettes, room dimensions, or bespoke architectural requirements..."
                className="w-full bg-[#1E1E1E] border border-white/15 p-4 text-xs text-white placeholder-white/30 focus-visible:outline-none focus-visible:border-white font-light resize-none"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 rounded-full bg-white text-black hover:bg-white/85 py-3.5 px-6 text-[11px] font-light tracking-[0.22em] uppercase transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>OPEN CONCIERGE WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={handleCopyInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-transparent py-3.5 px-6 text-[11px] font-light tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED BRIEF" : "COPY BRIEF"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Your Journey */}
      <ContinueYourJourney
        cards={[
          {
            title: "SIGNATURE EDITIONS SHOWROOM",
            description: "Explore our numbered archival silhouettes handcrafted to order.",
            href: "/collections",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "3D BOUQUET CONFIGURATOR",
            description: "Interact with living fiber swatches and reactive studio lighting in real-time 3D.",
            href: "/bespoke/configure",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
          },
          {
            title: "THE ATELIER MANIFESTO",
            description: "Learn why fine crochet cannot be automated by any commercial loom on Earth.",
            href: "/atelier",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop",
          },
        ]}
      />

      <Footer />
    </main>
  );
}
