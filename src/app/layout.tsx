import type { Metadata, Viewport } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AtelierProvider } from "@/context/AtelierContext";

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theweavestudio.vercel.app"),
  title: {
    default: "The Weave Studio | Handcrafted Bespoke Crochet Atelier",
    template: "%s | The Weave Studio",
  },
  description:
    "Bespoke handcrafted crochet atelier based in Hyderabad. Architectural tension, unhurried hand-guided stitches, museum-grade living fibers, and numbered heirlooms.",
  keywords: [
    "The Weave Studio",
    "Bespoke Crochet Atelier",
    "Luxury Handcrafted Textiles",
    "Architectural Crochet",
    "Hyderabad Atelier",
    "Handmade Heirloom Tapestry",
    "Bespoke Fiber Arts",
    "Bespoke Crochet Commission",
  ],
  authors: [{ name: "The Weave Studio" }],
  creator: "The Weave Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theweavestudio.vercel.app",
    siteName: "The Weave Studio",
    title: "The Weave Studio | Handcrafted Bespoke Crochet Atelier",
    description:
      "Every piece begins as a single slip knot—pulled by hand in Hyderabad, never hurried by a machine.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "The Weave Studio Handcrafted Crochet Atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Weave Studio | Handcrafted Bespoke Crochet Atelier",
    description:
      "Every piece begins as a single slip knot—pulled by hand in Hyderabad, never hurried by a machine.",
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0D0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#0E0D0C]">
      <body
        className={`${jost.variable} ${cormorant.variable} bg-[#0E0D0C] text-[#F3EFE6] font-sans antialiased selection:bg-[#F3EFE6] selection:text-[#0E0D0C] overflow-x-clip min-h-screen relative`}
      >
        <div className="linen-grain" aria-hidden="true" />
        <SmoothScrollProvider>
          <AtelierProvider>
            {children}
          </AtelierProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
