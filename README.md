# The Weave Studio — Digital Atelier & Bespoke Commissioning House

> Architecture in Every Loop.

This repository (`GOLDSTEALTH/theweavestudio`) hosts the production-ready codebase for **The Weave Studio**, an ultra-luxury handmade crochet atelier and bespoke commissioning house founded in Hyderabad, India.

Target Deployment: `theweavestudio.vercel.app`

---

## 1. Project Concept & Brand Identity

The Weave Studio redefines fiber craft as an architectural discipline. The digital experience rejects conventional e-commerce paradigms—eliminating shopping carts, discount banners, star ratings, dense product grids, and bouncy animations in favor of the visual restraint, ceremonial pacing, and monolithic product presentation modeled on Rolls-Royce Motor Cars.

Every commissioned piece is cataloged in the studio ledger as an indivisible dialogue between singular fiber provenance and deliberate hand tension.

---

## 2. "Obsidian Gallery" Design System

The visual language is defined by deep nocturnal obsidian tones, tactile matte charcoals, warm ivory typography, and brushed champagne gold hairlines.

### Color Palette & Design Tokens

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **Canvas** | `#0A0A0B` | Deep Obsidian background canvas |
| **Elevated Surface** | `#121214` | Matte Charcoal cards, drawers, and panels |
| **Subtle Surface** | `#18181B` | Secondary elevated backdrops and inputs |
| **Hairline Borders** | `rgba(244, 241, 234, 0.10)` | 1px architectural dividers and borders |
| **Hairline Bright** | `rgba(244, 241, 234, 0.22)` | Interactive hover and active borders |
| **Primary Ink** | `#F4F1EA` | Warm Ivory editorial headlines and body text |
| **Secondary Ink** | `#9A968E` | Muted Stone micro-labels and provenance specs |
| **Champagne Accent** | `#C6A972` | Brushed Champagne Gold active tags, indicators, and buttons |
| **Champagne Light** | `#DFCA9B` | Subtle hover state for champagne interactive elements |

### Typography Hierarchy

- **Display / Editorial Serif:** `Cormorant_Garamond` (Google Fonts, weights 300, 400, 500, 600; normal and italic styles) applied to monumental display headlines, chapter titles, piece narratives, and craft philosophy.
- **Architectural Sans:** `Montserrat` (Google Fonts, weights 300, 400, 500) applied to wide-tracked uppercase navigation, micro-labels (`tracking-[0.25em] text-[11px] uppercase`), technical specifications, and provenance data.

---

## 3. High-Refresh-Rate (120Hz/180Hz) Engineering Spec

Engineered specifically for buttery, jitter-free fluidity across modern ProMotion, gaming, and creative displays (120Hz to 180Hz):

1. **Inertia-Driven Smooth Scrolling:** Wrapped in a client-side `SmoothScrollProvider` using Lenis synced to `requestAnimationFrame` with `lerp: 0.08` and `smoothWheel: true`.
2. **Rolls-Royce Motion Physics:** Zero spring bounces. All Framer Motion transitions utilize a shared ceremonial luxury easing curve:
   ```ts
   export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
   ```
   with deliberate durations ranging from `0.6s` to `1.4s`.
3. **Compositor-Only GPU Animations:** Only GPU-composited properties (`transform`, `opacity`, `clip-path`) are animated during scroll and hover transitions to prevent layout recalculations and dropped frames.
4. **Sticky-Safe Layout Architecture:** Applied `overflow-x: clip` on `body` (via CSS and Tailwind `overflow-x-clip`), allowing `position: sticky` headers, sidebars, and split-screen columns to function reliably without clipping horizontal bleed.
5. **Multi-Modal Ref Lock Counter:** `lockScroll()` and `unlockScroll()` methods utilize an internal counter (`lockCountRef`) so concurrent overlays (e.g., closing the navigation menu while opening the Private Vault drawer) never cause scroll lock race conditions.
6. **Route-Aware Scroll Restoration:** App Router navigation changes (`usePathname`) reset scroll position to `0` immediately unless a target hash element is present, in which case it smoothly glides to that anchor via `requestAnimationFrame`.

---

## 4. Live 3D Bespoke Crocheted Bouquet Configurator ("Rolls-Royce Bespoke Stage")

At the pinnacle of the Bespoke Studio sits an interactive, real-time procedural 3D crocheted floral sculpture engine built in pure Three.js (without React Three Fiber to maintain pure React 19 compatibility).

### Procedural Crochet Yarn PBR Textures
Synthesized dynamically via deterministic HTML5 offscreen `<canvas>` generators (`src/lib/crochetTextures.ts`), producing zero external 3D asset overhead:
- **Stitch Relief Bump Map:** High-frequency interlocking herringbone and V-stitch loop relief with braided micro-fiber twist striations.
- **Anisotropic Roughness Map:** Shaded stitch crevice valleys and specular ridge crests that catch studio rim lighting.
- **Dynamic Fiber Material Response:** Adapting `THREE.MeshPhysicalMaterial` parameters (`roughness`, `sheen`, `sheenRoughness`, `bumpScale`, `clearcoat`, UV texture repeat) in real time when changing materials:
  - *Giza Mercerized Cotton:* Satin luster (`roughness: 0.62`, `sheen: 0.45`, tight fine stitch repeat).
  - *Belgian Linen & Silk:* Slubbed dry weave with glinting silk fibers (`roughness: 0.72`, `sheen: 0.65`).
  - *Himalayan Merino & Alpaca:* Cloud loft with deep crevice damping (`roughness: 0.94`, `sheen: 0.85`, deep `bumpScale`).
  - *Japanese Washi Paper Yarn:* Crisp matte sculptural grain (`roughness: 0.88`, `sheen: 0.15`).

### Sculptural Composition & Swappable Accessories
- **Nine-Stem Floral Sculpture:**
  - *3 Hero Crocheted Roses:* Concentric tiers of spiral scalloped petals (tight bud, cupped mid-tier, reflexed outer petals) with raised stitched edges.
  - *3 Cupped Tulips / Ranunculus:* Overlapping curved petals with textured stamen centers.
  - *3 Micro-Crochet Accent Buds:* Slender curved stems crowned with scalloped buds.
  - *Stems & Leaves:* Catmull-Rom tube stems converging into a central binding, accented by curved sage-green crochet foliage leaves.
- **Live Swappable Vessels:**
  - *Blackened Stoneware Vessel:* Matte dark ceramic cylinder with a brushed champagne gold hairline rim.
  - *Sculpted Linen Wrap:* Layered architectural flared linen wrap with satin cord binding.
  - *Brushed Brass Ribbon Tie:* Minimalist stem binding with a patinated brass cuff.
- **Live Swappable Accents:**
  - *Crochet Eucalyptus Sprigs:* Organic sage-tinted crochet discs mounted on wire armatures.
  - *Champagne Brass Filaments:* Micro-wired metallic botanical accents with hand-set pearl beads.
  - *Pure Monolith Blooms:* Unadorned sculptural flowers celebrating pure stitch geometry.

### Lighting, Camera & Performance Guardrails
- **Color Damping:** Dual-tone palette transitions smoothly lerp toward target hex values inside the rAF loop using delta-time damping (`1 - Math.exp(-6 * dt)`) for identical responsiveness at 60Hz, 120Hz, and 180Hz.
- **Studio Lighting & Plinth:** Three-point studio illumination (warm ivory key spotlight `#FFF5E6`, cool slate fill `#A8B8C8`, dramatic champagne gold rim `#C6A972`) with `ACESFilmicToneMapping` over a grounded plinth with `PCFSoftShadowMap` contact shadows.
- **Non-Intrusive Scroll Architecture:** Mouse wheel zoom is disabled (`controls.enableZoom = false`) so page scrolling with Lenis is never trapped. Dedicated minimal `+` and `-` zoom buttons are provided in the HUD, alongside 4 luxury camera presets (`STUDIO`, `MACRO`, `CROWN`, `ORBIT`).
- **Off-Screen GPU Conservation:** An `IntersectionObserver` pauses the render loop when the 3D stage is scrolled out of view, reducing GPU usage to 0%.

---

## 5. Site Architecture & Feature Deep-Dive

### 1. Architectural Navigation (`src/components/Navbar.tsx`)
- Fixed top bar transitioning smoothly from transparent to `bg-[#0A0A0B]/85 backdrop-blur-md border-b border-white/10` after 40px of scroll.
- Minimalist `MENU` trigger opening a full-screen editorial directory overlay with staggered clip-path link reveals, escape key listener, and `data-lenis-prevent`.
- Wide-tracked centered wordmark `THE WEAVE STUDIO / HYDERABAD`.
- Right-hand discreet `PRIVATE VAULT (03)` counter trigger and `COMMISSION` anchor link.

### 2. Full-Bleed Cinematic Hero (`src/components/Hero.tsx`)
- `100svh` canvas featuring slow GPU-accelerated parallax and ambient zoom on a dark textile weave visual.
- Minimalist editorial typography: micro-eyebrow `BESPOKE HANDCRAFTED ATELIER`, display headline `Architecture in Every Loop.`, and a hairline ghost CTA with GPU-composited origin-left scale underline.
- Looping vertical hairline scroll indicator with Tailwind `[writing-mode:vertical-rl]`.

### 3. Signature Collection Chapters (`src/components/CollectionShowcase.tsx`)
- Alternating full-width and asymmetric luxury editorial spreads.
- Large-format photography with slow `1.04` hover scale over 1.2s.
- Edition indices (`01 / 04`), titles, concise editorial hooks, and `EXPLORE PIECE` actions linking to dedicated dynamic routes.

### 4. Vertical Product Chapters (`src/app/collection/[slug]/page.tsx`)
- Built as vertical Rolls-Royce product chapters pre-rendered statically with `generateStaticParams`:
  - `aurelia-evening-tote` — *The Aurelia Structured Tote* (92 Hours handcraft)
  - `solstice-resort-cardigan` — *The Solstice Ribbed Cardigan* (114 Hours handcraft)
  - `nocturne-heirloom-tapestry` — *The Nocturne Wall Tapestry* (148 Hours handcraft)
  - `veridique-botanical-sculpture` — *The Véridique Flora Arrangement* (78 Hours handcraft)
- Features full-bleed silhouette showcases, split-screen macro stitch examination, architectural provenance specification grids, and direct CTAs pre-selecting that silhouette in the Bespoke Studio.

### 5. The Craftsmanship Deep-Dive (`src/components/CraftsmanshipSection.tsx`)
- Sticky split-screen narrative section with `IntersectionObserver` tracking 3 tactile pillars:
  1. `01 — NATURAL FIBERS` (Mercerized Giza cotton, raw Belgian linen, Himalayan merino wool)
  2. `02 — TENSION PRECISION` (Single-hook structural integrity measured in hours)
  3. `03 — SINGULAR PROVENANCE` (Numbered heirloom pieces cataloged in the Hyderabad studio registry)
- The left column dynamically highlights the active pillar in `#C6A972` with an animated hairline indicator, and each pillar item is clickable to smooth-scroll directly to that section.

### 6. Bespoke Commission Studio (`src/components/BespokeStudio.tsx`)
- Interactive configurator synchronized with the Live 3D Bespoke Stage:
  - *Step 01:* Select Foundational Silhouette (Tote, Cardigan, Tapestry, Botanical Study)
  - *Step 02:* Choose Tactile Fiber (Giza Cotton, Linen & Silk, Merino & Alpaca, Washi Paper Yarn)
  - *Step 03:* Curate Designer Palette (5 dual-tone pairings)
  - *Step 04:* Select Presentation Vessel (Stoneware Vessel, Linen Wrap, Brass Ribbon Tie)
  - *Step 05:* Curate Botanical Accents (Eucalyptus Sprigs, Champagne Filaments, Pure Blooms)
  - *Step 06:* Patron Inscription & Custom Sizing Notes
- Live sticky **Commission Dossier** updating in real time with selected specifications and craft lead times.
- Dual actions: `REQUEST PRIVATE CONSULTATION` (formats an encoded WhatsApp Concierge URL) and `COPY COMMISSION BRIEF` (clipboard copy with hidden textarea fallback and inline confirmation).

### 7. Private Vault Drawer (`src/components/VaultDrawer.tsx`)
- Slide-over architectural panel showcasing ready-to-ship 1-of-1 finished pieces currently resting in the Hyderabad vault:
  - `VAULT-001 / PIECE 1 OF 1` — *The Aurelia Petite in Obsidian & Gold* (₹34,000)
  - `VAULT-002 / PIECE 1 OF 1` — *The Monolith Cushion No. 04* (₹18,500)
  - `VAULT-003 / PIECE 1 OF 1` — *The Solstice Shawl in Raw Flax* (₹28,000)
- Each item features portrait photography, dimensions, composition, craft hours, and a direct `RESERVE VIA CONCIERGE` WhatsApp handoff.

### 8. Editorial Footer (`src/components/Footer.tsx`)
- Symmetrical luxury footer with studio wordmark, route-aware chapter links, direct link to `@theweave_studio` on Instagram, smooth scroll back-to-top action, and Hyderabad provenance colophon.

---

## 6. Codebase Directory Structure

```
theweavestudio/
├── public/
│   └── logo.jpg                         # Original studio archival logo
├── src/
│   ├── app/
│   │   ├── collection/
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # SSG Vertical Product Chapter route
│   │   ├── globals.css                  # Tailwind v4 theme tokens, dark scrollbars, Lenis styles
│   │   ├── icon.svg                     # Vector gold geometric TWS monogram favicon
│   │   ├── layout.tsx                   # Font definitions, SEO metadata, root providers
│   │   ├── not-found.tsx                # Obsidian Gallery 404 ledger page
│   │   └── page.tsx                     # Main editorial atelier showcase landing page
│   ├── components/
│   │   ├── BespokeBouquet3D.tsx         # Procedural Three.js 3D bouquet stage with HUD & controls
│   │   ├── BespokeStudio.tsx            # 3D stage integration, quick-switcher, and configurator
│   │   ├── CollectionShowcase.tsx       # Alternating luxury editorial collection chapters
│   │   ├── CraftsmanshipSection.tsx     # Sticky split-screen craftsmanship deep-dive
│   │   ├── Footer.tsx                   # Symmetrical editorial footer
│   │   ├── Hero.tsx                     # 100svh full-bleed cinematic hero
│   │   ├── Navbar.tsx                   # Top bar and full-screen editorial overlay menu
│   │   ├── PieceCommissionButton.tsx    # Cross-page silhouette pre-selector button
│   │   ├── VaultDrawer.tsx              # Slide-over architectural 1-of-1 Private Vault
│   │   └── providers/
│   │       └── SmoothScrollProvider.tsx # Client-side Lenis provider with lock counter
│   ├── context/
│   │   └── AtelierContext.tsx           # Global UI state (Vault drawer, selected silhouette)
│   ├── data/
│   │   └── atelier.ts                   # Centralized, strictly typed atelier data module
│   └── lib/
│       ├── crochetTextures.ts           # Procedural HTML5 canvas PBR stitch bump/roughness maps
│       └── motion.ts                    # Shared luxury easing curve and animation durations
├── next.config.ts                       # Next.js config with Unsplash image remotePatterns
├── package.json                         # Dependencies (Next 15.5.29, React 19.3.1, Three 0.187.0)
├── tsconfig.json                        # TypeScript strict compiler configuration
└── README.md                            # Complete architectural documentation
```

---

## 7. Where to Swap Real Photography & WhatsApp Concierge

All studio details, photography, and links are centralized in [src/data/atelier.ts](file:///d:/theweavestudio/src/data/atelier.ts):

1. **WhatsApp Concierge Number & Studio Configuration (`ATELIER_CONFIG`)**
   - Lines 85–97 in `src/data/atelier.ts`:
     - `whatsappConciergeNumber`: Replace placeholder with the client's active phone number in international format (e.g., `"+91XXXXXXXXXX"`).
     - `instagramUrl` (`https://www.instagram.com/theweave_studio/`), `instagramHandle` (`@theweave_studio`), and `location` (`Hyderabad, India`).
2. **Signature Collection Photography (4 Pieces in `COLLECTIONS`)**
   - Lines 103–197 in `src/data/atelier.ts`:
     - Each piece includes `heroImage` (full-bleed landscape), `detailImage` (structural angle), and `macroImage` (close-up loop texture).
3. **Craftsmanship Pillars (`CRAFTSMANSHIP_PILLARS`)**
   - Lines 199–254 in `src/data/atelier.ts`:
     - Update images and text specifications for the 3 craft pillars.
4. **Bespoke Silhouettes (`BESPOKE_OPTIONS.silhouettes`)**
   - Lines 257–299 in `src/data/atelier.ts`:
     - Update silhouette preview images and starting craft hours.
5. **Private Vault (`VAULT_PIECES`)**
   - Lines 407–458 in `src/data/atelier.ts`:
     - Update portrait photography, edition codes, INR valuations, and physical dimensions for ready-to-ship archival pieces.

---

## 8. Local Development & Verification

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification Commands

```bash
# TypeScript strict check (0 errors)
npx tsc --noEmit

# ESLint check (0 warnings, 0 errors)
npm run lint

# Production compilation & static generation
npm run build

# Security audit omitting dev dependencies (0 vulnerabilities)
npm audit --omit=dev
```

---

## 9. Deployment to Vercel

The application is pre-configured for seamless deployment to Vercel:

1. Connect your GitHub repository `GOLDSTEALTH/theweavestudio` on [Vercel](https://vercel.com/new).
2. Framework Preset: **Next.js**.
3. Root Directory: `./`.
4. Build Command: `next build` (standard).
5. Output Directory: `.next` (standard).
6. Under Project Settings > Domains, assign `theweavestudio.vercel.app`.
