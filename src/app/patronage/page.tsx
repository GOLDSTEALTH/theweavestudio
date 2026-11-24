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
    <main className="min-h-screen bg-[#0E0D0C] text-[#F3EFE6]">
      <Navbar />
      <VaultDrawer />

      {/* Editorial Hero */}
      <section className="hero-cinema relative w-full h-[85svh] min-h-[640px] flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop"
            alt="Care and Patronage at The Weave Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.52] contrast-[1.08]"
          />
          <div className="hero-vignette absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/35 to-[#0E0D0C]/60" />
        </div>

        <div className="h-20" />

        <div className="hero-photo-text relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6 my-auto">
          <span className="block font-sans text-[11px] sm:text-xs font-light tracking-[0.28em] uppercase text-[#C8A87A]">
            AN EFFORTLESS JOURNEY
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[70px] font-light tracking-tight uppercase text-[#F3EFE6] leading-tight max-w-4xl mx-auto">
            Care &amp; Patronage
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light tracking-wide text-[#9C9488] max-w-xl mx-auto leading-relaxed">
            Acquiring an edition from The Weave Studio is the genesis of a lifelong relationship. Discover our lifetime restoration commitments, preservation standards, and private salon appointments.
          </p>

          <div className="pt-4">
            <Link
              href="#concierge"
              className="btn-stitched px-8 py-3.5 text-[11px] font-light tracking-[0.22em] uppercase"
            >
              <span className="stitch-dot" />
              <span>CONTACT PRIVATE CONCIERGE</span>
            </Link>
          </div>
        </div>

        <div className="hero-colophon relative z-10 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pb-8 w-full flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
          <span>PATRON PRIVILEGES</span>
          <span>LIFETIME RESTORATION ASSURANCE</span>
        </div>
      </section>

      {/* Three Minimalist Care Pillars */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-[#F3EFE6]/12">
        <div className="border-b border-[#F3EFE6]/12 pb-8 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              STEWARDSHIP PILLARS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase">
              Heirloom Preservation
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#9C9488] uppercase font-light">
            REGISTERED PATRONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="p-8 sm:p-10 border border-[#F3EFE6]/12 bg-[#171513] rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-full border border-[#C8A87A]/40 flex items-center justify-center text-[#C8A87A]">
              <Sparkles className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
              Lifetime Studio Steam-Blocking
            </h3>
            <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
              Natural fibers relax and settle over years of display and wear. Every registered patron enjoys complimentary re-shaping and artisanal steam-blocking at our Hyderabad studio.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#F3EFE6]/12 bg-[#171513] rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-full border border-[#C8A87A]/40 flex items-center justify-center text-[#C8A87A]">
              <ShieldCheck className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
              Archival Repair &amp; Stitch Re-tensioning
            </h3>
            <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
              Should an accidental thread pull occur, our artisans restore the piece using archived fiber skeins from the identical harvest lot, returning it to pristine structural tension.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#F3EFE6]/12 bg-[#171513] rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-full border border-[#C8A87A]/40 flex items-center justify-center text-[#C8A87A]">
              <Home className="w-5 h-5 stroke-[1.25]" />
            </div>
            <h3 className="font-serif text-xl text-[#F3EFE6] font-light tracking-wide">
              Private Salon Appointments
            </h3>
            <p className="font-sans text-xs text-[#9C9488] font-light leading-relaxed">
              Patrons wishing to view works in progress, inspect material folios, or commission custom editions are welcomed by private appointment to our Hyderabad salon.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 border-b border-[#F3EFE6]/12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              CLIENT INQUIRIES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase leading-snug">
              Frequently Addressed Curations
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#9C9488] font-light leading-relaxed pt-2">
              Review answers regarding commission timelines, yarn swatch deliveries, international courier handovers, and studio appointment terms.
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-[#F3EFE6]/10">
            {PATRONAGE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;

              return (
                <div key={idx} className="py-6 sm:py-8">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left group focus-visible:outline-none"
                  >
                    <div className="space-y-1 pr-6">
                      <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A87A] block font-light">
                        {faq.category}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg text-[#F3EFE6] font-light tracking-wide group-hover:text-[#C8A87A] transition-colors">
                        {faq.question}
                      </h4>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-[#9C9488] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-[#C8A87A]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-4 pr-10 text-xs sm:text-sm text-[#9C9488] font-light leading-relaxed animate-in fade-in duration-300">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Private Concierge Inquiry Form */}
      <section id="concierge" className="py-24 sm:py-36 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C8A87A] block font-light">
              DIRECT HANDOVER
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFE6] font-light tracking-wide uppercase leading-snug">
              Connect With The Private Concierge
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#9C9488] font-light leading-relaxed">
              Submit your inquiry directly to our studio team in Hyderabad via WhatsApp or copy the brief for personal correspondence. All consultations are handled with utmost discretion.
            </p>

            <div className="space-y-3 pt-4 text-xs font-light text-[#9C9488] border-t border-[#F3EFE6]/10">
              <div>
                <span className="text-[#F3EFE6] uppercase tracking-wider block font-light">ATELIER CONCIERGE:</span>
                <span>{ATELIER_CONFIG.whatsappConciergeNumber}</span>
              </div>
              <div>
                <span className="text-[#F3EFE6] uppercase tracking-wider block font-light">PRIMARY STUDIO:</span>
                <span>{ATELIER_CONFIG.location}</span>
              </div>
              <div>
                <span className="text-[#F3EFE6] uppercase tracking-wider block font-light">COMMUNICATION HOURS:</span>
                <span>Monday &ndash; Saturday, 10:00 AM &ndash; 7:00 PM IST</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#171513] border border-[#F3EFE6]/12 rounded-2xl p-8 sm:p-12 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                  PATRON NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#201D1A] border border-[#F3EFE6]/15 rounded-xl px-4 py-3.5 text-xs text-[#F3EFE6] placeholder-[#9C9488]/40 focus-visible:outline-none focus-visible:border-[#C8A87A] font-light"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full bg-[#201D1A] border border-[#F3EFE6]/15 rounded-xl px-4 py-3.5 text-xs text-[#F3EFE6] placeholder-[#9C9488]/40 focus-visible:outline-none focus-visible:border-[#C8A87A] font-light"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                INQUIRY TOPIC
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#201D1A] border border-[#F3EFE6]/15 rounded-xl px-4 py-3.5 text-xs text-[#F3EFE6] focus-visible:outline-none focus-visible:border-[#C8A87A] font-light"
              >
                <option value="Bespoke Silhouette Consultation">Bespoke Silhouette Consultation</option>
                <option value="Yarn Swatch Box Dispatch">Yarn Swatch Box Dispatch</option>
                <option value="Architectural Tapestry Commission">Architectural Tapestry Commission</option>
                <option value="Private Salon Viewing (Hyderabad)">Private Salon Viewing (Hyderabad)</option>
                <option value="Heirloom Restoration & Re-Blocking">Heirloom Restoration & Re-Blocking</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-[#9C9488] font-light">
                SPECIFICATIONS / NOTES
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail preferred palettes, room dimensions, or bespoke architectural requirements..."
                className="w-full bg-[#201D1A] border border-[#F3EFE6]/15 rounded-xl p-4 text-xs text-[#F3EFE6] placeholder-[#9C9488]/40 focus-visible:outline-none focus-visible:border-[#C8A87A] font-light resize-none"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-3 rounded-full bg-[#F3EFE6] text-[#0E0D0C] hover:bg-white py-3.5 px-6 text-[11px] font-light tracking-[0.22em] uppercase transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-[#0E0D0C]" />
                <span>OPEN CONCIERGE WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={handleCopyInquiry}
                className="btn-stitched w-full sm:w-auto py-3.5 px-6 text-[11px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#C8A87A]" /> : <Copy className="w-3.5 h-3.5" />}
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
            title: "THE COMMISSION TABLE",
            description: "Curate living fibers, hand-dyed palettes, and bespoke dimensions for custom commissions.",
            href: "/bespoke/commission",
            image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=85&w=1200&auto=format&fit=crop",
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
