import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AtelierProvider } from "@/context/AtelierContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theweavestudio.vercel.app"),
  title: {
    default: "The Weave Studio | Bespoke Handcrafted Atelier",
    template: "%s | The Weave Studio",
  },
  description:
    "Ultra-luxury handmade crochet atelier and bespoke commissioning house. Architectural tension, museum-grade fibers, and numbered heirlooms crafted in Hyderabad.",
  keywords: [
    "The Weave Studio",
    "Bespoke Crochet Atelier",
    "Luxury Handcrafted Textiles",
    "Architectural Crochet",
    "Hyderabad Luxury Atelier",
    "Handmade Heirloom Tapestry",
    "Bespoke Fiber Arts",
  ],
  authors: [{ name: "The Weave Studio" }],
  creator: "The Weave Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theweavestudio.vercel.app",
    siteName: "The Weave Studio",
    title: "The Weave Studio | Bespoke Handcrafted Atelier",
    description:
      "Architecture in every loop. Bespoke commissions and numbered textile editions.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "The Weave Studio Luxury Atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Weave Studio | Bespoke Handcrafted Atelier",
    description:
      "Architecture in every loop. Bespoke commissions and numbered textile editions.",
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
  themeColor: "#0A0A0B",
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
    <html lang="en" className="dark bg-[#0A0A0B]">
      <body
        className={`${cormorant.variable} ${montserrat.variable} bg-[#0A0A0B] text-[#F4F1EA] font-sans antialiased selection:bg-[#C6A972] selection:text-[#0A0A0B] overflow-x-clip min-h-screen`}
      >
        <SmoothScrollProvider>
          <AtelierProvider>
            {children}
          </AtelierProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
