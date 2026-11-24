# The Weave Studio — Handcrafted Bespoke Crochet Atelier

> "Every piece begins as a single slip knot—pulled by hand in Hyderabad, never hurried by a machine."

This repository (`GOLDSTEALTH/theweavestudio`) hosts the production-ready codebase for **The Weave Studio** (`@theweave_studio`), an ultra-luxury handmade crochet atelier and bespoke commissioning house founded in Hyderabad, India.

Target Deployment: `theweavestudio.vercel.app`

---

## 1. Brand Concept & Atelier Identity

The Weave Studio treats fiber craft as an architectural discipline. The digital flagship reflects the warmth, tactile restraint, and intimate pace of an authentic high-fashion atelier:

- **Single-Thread Discipline:** Every edition is shaped by hand using continuous-thread tension metrology.
- **Museum-Grade Living Fibers:** 100% natural organic harvests including long-staple Giza mercerized cotton, Belgian flax linen, combed cashmere, high-altitude Himalayan merino, raw mulberry silk, and Japanese washi paper yarn.
- **Numbered Editions:** Every piece is archived in the Hyderabad studio records with a registered serial seal and provenance ledger.
- **Concierge Handover:** Strictly zero generic e-commerce shopping carts or discount codes; transactions are conducted through bespoke consultation and direct concierge handover.

---

## 2. Warm Loom Design System

The visual identity is defined by organic textile depth, raw linen textures, warm ivory ink, and spun sand silk stitch accents.

### Color Palette & Design Tokens

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| **Canvas** | `#0E0D0C` | Warm Loom Charcoal — deep organic canvas |
| **Elevated Surface** | `#171513` | Raw Espresso Linen — cards, drawers, and panels |
| **Secondary Surface** | `#201D1A` | Warm Umber Slate — inputs, swatches, and sub-panels |
| **Hairline Borders** | `rgba(243, 239, 230, 0.12)` | Subtle 1px architectural dividers and borders |
| **Hairline Bright** | `rgba(243, 239, 230, 0.35)` | Interactive borders and active stitch markers |
| **Primary Ink** | `#F3EFE6` | Unbleached Raw Ivory — headlines and primary labels |
| **Secondary Ink** | `#9C9488` | Warm Taupe Stone — body prose and provenance specs |
| **Thread Accent** | `#C8A87A` | Spun Sand Silk Thread — hairline stitch accents and indicators |

### Typography Hierarchy

- **Display / Editorial Serif:** `Cormorant_Garamond` (`--font-cormorant`, weights `300`, `400`, `500`; normal and italic styles) applied to poetic display headlines, chapter titles, piece narratives, and artisan pullquotes.
- **Architectural Sans:** `Jost` (`--font-jost`, weights `200`, `300`, `400`, `500`) applied to uppercase architectural micro-labels (`tracking-[0.2em]` to `tracking-[0.28em]`), navigation, buttons, and technical specifications.

---

## 3. Signature Motion & High-Refresh (120Hz/180Hz) Engineering

Engineered for buttery, jitter-free fluidity across modern ProMotion, mobile, and desktop displays:

1. **Lenis Inertia Smooth Scrolling:** Synced to `requestAnimationFrame` with `lerp: 0.08` and `smoothWheel: true`.
2. **ThreadProgress Indicator (`src/components/motion/ThreadProgress.tsx`):** Razor-thin 1.5px continuous spun-thread line anchored beneath the navigation bar, animated via `useScroll()` + `useSpring()` in `#C8A87A` with a leading needle-tip glint.
3. **WeaveReveal Wrapper (`src/components/motion/WeaveReveal.tsx`):** Calm textile reveal animating `clipPath: inset(12% 0% 0% 0%) -> inset(0% 0% 0% 0%)` while the inner photograph gently settles from `scale: 1.07 -> 1.0` over `1.15s`.
4. **ThreadDivider (`src/components/motion/ThreadDivider.tsx`):** Architectural divider drawing smoothly from left to right with a centered diamond stitch knot.
5. **Stitched Atelier Buttons:** Rounded pill buttons featuring expanding `#C8A87A` spun-thread dots on hover.
6. **Multi-Modal Ref Lock Counter:** Robust ref-counted `lockScroll()` / `unlockScroll()` preventing scroll lock race conditions across drawers and curtain navigation.

---

## 4. The Commission Table (`src/components/BespokeStudio.tsx` & `/bespoke/commission`)

Replacing heavy 3D canvases with an instant, magazine-grade tactile atelier workstation:

- **Sticky Tactile Moodboard:**
  - Ambient radial color wash dynamically keyed to the active palette's `primaryHex`.
  - Editorial photography crossfade matching the selected base silhouette.
  - Procedural vector SVG interlocking crochet stitch strip showing real-time yarn tension.
  - Tactile fiber swatch disc displaying origin, hand, and drape dynamics.
- **Progressive Configuration:**
  - `01 / SILHOUETTE`: Structured Tote, Sculpted Cardigan, Architectural Tapestry, Botanical Study.
  - `02 / CURATED PALETTE`: 6 hand-dyed tonal pairings.
  - `03 / LIVING FIBER`: Belgian Linen & Silk, Giza Cotton, Himalayan Merino & Alpaca, Japanese Washi Paper Yarn.
  - `04 / PRESENTATION & ACCENTS`: Stone vessels and botanical accents for floral sculptures.
  - `05 / PERSONAL DEDICATION`: Patron name, bespoke sizing, and inscription notes.
- **Physical Atelier Ledger Slip:**
  - Hand-numbered serial code (e.g. `TWS-HYD-STR-IVO`).
  - Pre-filled WhatsApp concierge commission link.
  - Instant clipboard dossier export with visual checkmark confirmation.

---

## 5. Multi-Page Digital Flagship Routes

- `/` — Digital Flagship Home with Fold 01, Atelier Signature Strip, Fold 02, and Journey recommendations.
- `/atelier` — Heritage, philosophy, master artisan biographies, and Hyderabad salon appointments.
- `/collections` — Permanent archive showroom with 4 foundational silhouettes.
- `/collection/[slug]` — Deep-dive product chapters with macro stitch analysis, specs, and commission triggers:
  - `/collection/aurelia-evening-tote`
  - `/collection/solstice-resort-cardigan`
  - `/collection/nocturne-heirloom-tapestry`
  - `/collection/veridique-botanical-sculpture`
- `/bespoke` — Bespoke philosophy, Private Office consultations, and 1-of-1 archive commissions.
- `/bespoke/commission` — The interactive Commission Table.
- `/bespoke/craft` — Metrology, 0.75mm steel tolerances, and material library.
- `/provenance` — Historical studio ledgers, numbered archive seals, and private vault acquisitions.
- `/boutique` — Ready-to-ship numbered objects with interactive inquiry dossier drawer.
- `/patronage` — Client care FAQ, lifetime steam-blocking, and concierge inquiry form.

---

## 6. Development & Production Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Run ESLint
npm run lint

# Compile production build
npm run build
```

---

&copy; The Weave Studio. Hyderabad, India. Strictly Handcrafted.
