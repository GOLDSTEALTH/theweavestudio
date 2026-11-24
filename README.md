# The Weave Studio

> Architecture in Every Loop.

An ultra-luxury editorial showcase and bespoke commissioning web application for **The Weave Studio** (a handmade crochet atelier based in Hyderabad, India), modeled on the digital design language, visual pacing, and product presentation of Rolls-Royce Motor Cars.

Target Deployment: `theweavestudio.vercel.app`

---

## Design System: Obsidian Gallery

- **Primary Canvas:** `#0A0A0B` (Deep Obsidian)
- **Elevated Surface:** `#121214` (Matte Charcoal)
- **Subtle Surface:** `#18181B`
- **Hairline Borders:** `rgba(244, 241, 234, 0.10)`
- **Primary Ink:** `#F4F1EA` (Warm Ivory)
- **Secondary Ink:** `#9A968E` (Muted Stone)
- **Accent:** `#C6A972` (Brushed Champagne Gold)

### Typography
- **Display / Editorial Serif:** `Cormorant_Garamond` (weights 300, 400, 500, 600; italic enabled) for headlines, piece titles, and craft narratives.
- **Architectural Sans:** `Montserrat` (weights 300, 400, 500) for wide-tracked uppercase navigation, micro-labels (`tracking-[0.25em] text-[11px] uppercase`), and provenance specs.

---

## Architecture & Technology Stack

- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Motion & Fluidity:** `framer-motion`, `lenis`, `lucide-react`
- **High-Refresh-Rate Spec (120Hz/180Hz):**
  - Inertia-driven smooth scrolling via client-side `SmoothScrollProvider` synced to `requestAnimationFrame` (`lerp: 0.08`, `smoothWheel: true`).
  - Shared luxury easing curve: `const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;` with deliberate durations (0.9s to 1.4s).
  - Compositor-only animations (`transform`, `opacity`, `clip-path`).
  - Route-aware scroll management and multi-modal lock counter.

---

## Key Sections & Features

1. **Architectural Navigation (`src/components/Navbar.tsx`)**
   - Translucent-to-obsidian transition on scroll.
   - Minimalist `MENU` trigger opening a full-screen editorial navigation overlay.
   - Discrete `PRIVATE VAULT (03)` counter button + `COMMISSION` anchor.

2. **Full-Bleed Cinematic Hero (`src/components/Hero.tsx`)**
   - `100svh` canvas with GPU-accelerated parallax and ambient zoom.
   - Editorial typography with hairline ghost CTA and looping scroll indicator.

3. **Signature Collection Chapters (`src/components/CollectionShowcase.tsx`)**
   - Alternating full-width / asymmetric editorial spreads.
   - Links to dynamic product chapters at `/collection/[slug]`.

4. **Craftsmanship Deep-Dive (`src/components/CraftsmanshipSection.tsx`)**
   - Sticky split-screen narrative section with `IntersectionObserver` tracking.
   - Dynamic highlighting across the 3 tactile pillars: *Natural Fibers*, *Tension Precision*, and *Singular Provenance*.

5. **Bespoke Commission Studio (`src/components/BespokeStudio.tsx`)**
   - Interactive 4-step configurator: Silhouette, Tactile Fiber, 5 Curated Dual-Tone Palettes, and Personal Inscriptions.
   - Real-time sticky Commission Dossier panel with dynamic lead times.
   - Pre-filled WhatsApp Concierge link generator and clipboard brief copier.

6. **Private Vault Drawer (`src/components/VaultDrawer.tsx`)**
   - Architectural slide-over drawer for ready-to-ship 1-of-1 finished pieces.
   - Direct concierge reservation actions.

7. **Vertical Product Chapters (`src/app/collection/[slug]/page.tsx`)**
   - Static site generation (`generateStaticParams`) for all collection pieces.
   - Split-screen macro photography examination and provenance specification grid.

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the atelier showcase.

---

## Production Build & Verification

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

---

## Deployment to Vercel

1. Import the repository `GOLDSTEALTH/theweavestudio` on [Vercel](https://vercel.com/new).
2. Framework Preset: **Next.js**.
3. Root Directory: `./`.
4. Deploy to domain `theweavestudio.vercel.app`.
