export interface PieceSpecs {
  handcraftHours: string;
  fiberComposition: string;
  stitchTechnique: string;
  dimensions: string;
  leadTime: string;
}

export interface CollectionPiece {
  slug: string;
  title: string;
  subtitle: string;
  editionIndex: string;
  editionTag: string;
  narrative: string;
  craftNote: string;
  specs: PieceSpecs;
  heroImage: string;
  detailImage: string;
  macroImage: string;
  silhouetteId: string;
  priceEstimate: string;
}

export interface BespokeSilhouette {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  startingHours: string;
  leadTime: string;
}

export interface TactileFiber {
  id: string;
  name: string;
  origin: string;
  feel: string;
  drape: string;
  swatchTone: string;
  description: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  editorialLabel: string;
  primaryHex: string;
  secondaryHex: string;
  narrative: string;
}

export interface VaultPiece {
  id: string;
  editionCode: string;
  title: string;
  subtitle: string;
  priceINR: string;
  priceNumeric: number;
  dimensions: string;
  fiber: string;
  technique: string;
  handcraftHours: string;
  description: string;
  image: string;
  status: "Available" | "Reserved";
}

export interface CraftsmanshipPillar {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  body: string;
  specs: { label: string; value: string }[];
  image: string;
}

export interface AtelierConfig {
  studioName: string;
  monogram: string;
  tagline: string;
  eyebrow: string;
  instagramUrl: string;
  instagramHandle: string;
  whatsappConciergeNumber: string; // Replace with client's active WhatsApp number e.g. "+91XXXXXXXXXX"
  location: string;
  founded: string;
  colophon: string;
}

export const ATELIER_CONFIG: AtelierConfig = {
  studioName: "The Weave Studio",
  monogram: "TWS",
  tagline: "Architecture in Every Loop.",
  eyebrow: "BESPOKE HANDCRAFTED ATELIER",
  instagramUrl: "https://www.instagram.com/theweave_studio/",
  instagramHandle: "@theweave_studio",
  whatsappConciergeNumber: "+919876543210", // Placeholder: swap with live phone number in international format
  location: "Hyderabad, India",
  founded: "MMXXIV",
  colophon: "Every commission is an indivisible dialogue between singular fiber provenance and deliberate hand tension.",
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=85&w=2400&auto=format&fit=crop";

export const COLLECTIONS: CollectionPiece[] = [
  {
    slug: "aurelia-evening-tote",
    title: "The Aurelia Structured Tote",
    subtitle: "Architectural geometry sculpted from high-twist mercerized cord.",
    editionIndex: "01 / 04",
    editionTag: "EDITION 01 — MADE TO COMMISSION",
    narrative:
      "A study in quiet authority. Hand-sculpted over ninety-two hours using high-twist mercerized cotton, the Aurelia tote redefines textile rigidity without internal armatures. Its seamless hexagonal base rises into structural monolith handles, creating an uninterrupted silhouette that holds form in stillness and motion alike.",
    craftNote:
      "Hand-tensioned at 1.8mm single-hook gauge to produce a self-supporting textile matrix with museum-grade edge finishes.",
    specs: {
      handcraftHours: "92 Hours",
      fiberComposition: "100% Mercerized Egyptian Giza Cotton with Subtle Champagne Lurex Core",
      stitchTechnique: "Dense Twisted Single Crochet Matrix with Seamless Monolith Handles",
      dimensions: "34cm (W) × 28cm (H) × 12cm (D)",
      leadTime: "4 to 6 Weeks",
    },
    heroImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600&auto=format&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop",
    macroImage:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop",
    silhouetteId: "structured-tote",
    priceEstimate: "By Private Consultation",
  },
  {
    slug: "solstice-resort-cardigan",
    title: "The Solstice Ribbed Cardigan",
    subtitle: "Open-gauge tactile drape spun from organic Belgian linen and mulberry silk.",
    editionIndex: "02 / 04",
    editionTag: "EDITION 02 — MADE TO COMMISSION",
    narrative:
      "Engineered for evening warmth and effortless coastal transition. The Solstice Cardigan juxtaposes dense horizontal ribbing with an airy open-gauge bodice. Spun from raw Belgian linen blended with raw mulberry silk, each sleeve drape is weighted to fall with deliberate architectural poise.",
    craftNote:
      "Continuous unbroken yarn feed engineered to eliminate side seams, finished with horn-tone hand-carved stone buttons.",
    specs: {
      handcraftHours: "114 Hours",
      fiberComposition: "70% Organic Belgian Flax Linen, 30% Grade-6A Mulberry Silk",
      stitchTechnique: "Tunisian Honeycomb Stitch & Sculpted Relief Ribbing",
      dimensions: "Bespoke Tailored to Client Measurements (Oversized Profile)",
      leadTime: "5 to 7 Weeks",
    },
    heroImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1200&auto=format&fit=crop",
    macroImage:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    silhouetteId: "sculpted-cardigan",
    priceEstimate: "By Private Consultation",
  },
  {
    slug: "nocturne-heirloom-tapestry",
    title: "The Nocturne Wall Tapestry",
    subtitle: "Relief-sculpted textile artwork celebrating tonal shadow and tactile depth.",
    editionIndex: "03 / 04",
    editionTag: "EDITION 03 — ARCHITECTURAL ARCHIVE",
    narrative:
      "Conceived as an acoustic and visual sanctuary for modernist interiors. Nocturne explores the topography of deep obsidian and muted stone fibers. Hand-knotted and looped using high-altitude merino wool and brushed alpaca, its tactile ridges absorb ambient light, transforming throughout the day as sunlight shifts across the room.",
    craftNote:
      "Mounted on a custom hand-patinated brushed brass suspension bar, numbered and signed in the atelier weave.",
    specs: {
      handcraftHours: "148 Hours",
      fiberComposition: "80% High-Altitude Himalayan Merino Wool, 20% Brushed Baby Alpaca",
      stitchTechnique: "Sculpted Loop Pile with Hand-Knotted Macramé Fringe",
      dimensions: "120cm (W) × 165cm (H)",
      leadTime: "6 to 8 Weeks",
    },
    heroImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    macroImage:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&auto=format&fit=crop",
    silhouetteId: "architectural-tapestry",
    priceEstimate: "By Private Consultation",
  },
  {
    slug: "veridique-botanical-sculpture",
    title: "The Véridique Flora Arrangement",
    subtitle: "Immortalized botanical forms hand-crocheted from mercerized botanical yarns.",
    editionIndex: "04 / 04",
    editionTag: "EDITION 04 — MADE TO COMMISSION",
    narrative:
      "A permanent meditation on nature's geometry. Each petal of the Véridique arrangement is individually shaped with micro-gauge hooks, then wired with fine brass armature to allow bespoke positioning. Displayed within a blackened raw stoneware vessel, it brings eternal organic stillness to minimalist spaces.",
    craftNote:
      "Individual petal contouring using Japanese botanical crochet method with micro 0.75mm steel hooks.",
    specs: {
      handcraftHours: "78 Hours",
      fiberComposition: "Japanese Mercerized Paper Yarn, Mulberry Silk Floss & Brass Filament",
      stitchTechnique: "Micro-Crochet Botanical Sculpting with Internal Wired Veining",
      dimensions: "45cm (H) × 30cm (Diameter)",
      leadTime: "3 to 5 Weeks",
    },
    heroImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop",
    detailImage:
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=1200&auto=format&fit=crop",
    macroImage:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop",
    silhouetteId: "botanical-study",
    priceEstimate: "By Private Consultation",
  },
];

export const CRAFTSMANSHIP_PILLARS: CraftsmanshipPillar[] = [
  {
    id: "pillar-01",
    number: "01",
    tag: "PURITY OF ORIGIN",
    title: "Natural Fibers",
    subtitle: "Mercerized Giza cotton, raw Belgian linen, and high-altitude Himalayan wool.",
    body: "Synthetic poly-blends possess no dialogue with time. At The Weave Studio, we curate solely living organic fibers. From double-mercerized Egyptian cotton whose high-twist cords resist friction over generations, to raw unbleached flax that matures into a soft parchment patina, each strand is selected for tensile memory and tactile grace.",
    specs: [
      { label: "STAPLE LENGTH", value: "Long-staple 38mm Giza strands" },
      { label: "PURITY RATIO", value: "100% Organic & Biodegradable" },
      { label: "DYE METHOD", value: "Low-impact mineral & botanical bath" },
    ],
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "pillar-02",
    number: "02",
    tag: "THE SINGLE HOOK",
    title: "Tension Precision",
    subtitle: "Structural integrity measured in hours, not machine cycles.",
    body: "Unlike machine knitting where broken stitches run down the entire garment, bespoke crochet cannot be automated by any commercial loom. Every individual loop is formed by hand using a single polished hook. This demands unwavering muscle memory to maintain identical tensile pressure across thousands of repetitive intersections, yielding a self-supporting textile that holds form without rigid armatures.",
    specs: [
      { label: "HOOK CALIBRATION", value: "0.75mm to 2.5mm steel tolerances" },
      { label: "STITCH DENSITY", value: "Over 48 loops per square inch" },
      { label: "STRUCTURAL TEST", value: "Continuous load-tested handles" },
    ],
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "provenance",
    number: "03",
    tag: "ARCHIVE DISCIPLINE",
    title: "Singular Provenance",
    subtitle: "Numbered heirloom pieces cataloged in the Hyderabad studio registry.",
    body: "Mass manufacturing produces duplicates; true luxury produces monuments. Every commissioned piece leaves the studio with an engraved serial plate and a bound provenance ledger detailing the exact craft hours, artisan initials, yarn lot origin, and client dedication. Once an edition reaches its cap, that silhouette is retired to the archive permanently.",
    specs: [
      { label: "AUTHENTICITY", value: "Engraved brass or silver seal" },
      { label: "ARCHIVE ENTRY", value: "Permanent registry in studio records" },
      { label: "RESTFUL LUXURY", value: "Lifetime preservation consultation" },
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  },
];

export const BESPOKE_OPTIONS = {
  silhouettes: [
    {
      id: "structured-tote",
      name: "The Structured Tote",
      subtitle: "Architectural Everyday Monolith",
      description: "Rigid, self-standing cubic base with continuous integrated handles and seamless floor.",
      image:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      startingHours: "90+ Hours",
      leadTime: "4 to 6 Weeks",
    },
    {
      id: "sculpted-cardigan",
      name: "The Sculpted Cardigan",
      subtitle: "Tailored Artisanal Knitwear",
      description: "Custom shoulder slope and sleeve length with open-gauge relief ribbing and horn buttons.",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      startingHours: "110+ Hours",
      leadTime: "5 to 7 Weeks",
    },
    {
      id: "architectural-tapestry",
      name: "The Architectural Tapestry",
      subtitle: "Acoustic Wall Sculpture",
      description: "Relief-sculpted loops with patinated brass suspension hardware, custom-sized to room wall.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      startingHours: "140+ Hours",
      leadTime: "6 to 8 Weeks",
    },
    {
      id: "botanical-study",
      name: "The Botanical Study",
      subtitle: "Dimensional Flora Object",
      description: "Wired micro-crochet botanicals anchored in custom blackened stoneware or raw alabaster.",
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      startingHours: "75+ Hours",
      leadTime: "3 to 5 Weeks",
    },
  ] as BespokeSilhouette[],

  fibers: [
    {
      id: "giza-cotton",
      name: "Giza Mercerized Cotton",
      origin: "Nile River Basin, Egypt",
      feel: "Firm, crisp, cool-touch with subtle satin sheen",
      drape: "High structural rigidity and precision stitch definition",
      swatchTone: "#D9D0C1",
      description: "Double-mercerized long-staple fibers that refuse pilling and retain geometric tension over decades.",
    },
    {
      id: "belgian-linen-silk",
      name: "Belgian Linen & Mulberry Silk",
      origin: "Kortrijk, Belgium & Hangzhou, China",
      feel: "Tactile dry texture with fluid silk weight",
      drape: "Effortless, cascading silhouette with natural breathability",
      swatchTone: "#C7BEAF",
      description: "Blended in a 70/30 ratio to balance the crisp structural grain of flax with the liquid luster of silk.",
    },
    {
      id: "himalayan-merino",
      name: "Himalayan Merino & Baby Alpaca",
      origin: "High-Altitude Valleys, Ladakh",
      feel: "Deeply warm, velvet-plush loft with acoustic damping",
      drape: "Voluminous, dense topography with natural cloud softness",
      swatchTone: "#B5AAA0",
      description: "Spun from first-shearing organic herds, preserving natural lanolin for moisture resistance.",
    },
    {
      id: "japanese-paper-yarn",
      name: "Japanese Washi Paper Yarn",
      origin: "Mino, Gifu Prefecture, Japan",
      feel: "Paper-crisp, sculptural, ultra-lightweight",
      drape: "Rigid three-dimensional retention with matte parchment grain",
      swatchTone: "#E8E2D6",
      description: "Slit from handmade bark paper and twisted into durable filaments immune to stretching or distortion.",
    },
  ] as TactileFiber[],

  palettes: [
    {
      id: "obsidian-champagne",
      name: "Obsidian & Champagne",
      editorialLabel: "ATELIER SIGNATURE",
      primaryHex: "#0A0A0B",
      secondaryHex: "#C6A972",
      narrative: "Deepest nocturnal graphite offset by hand-twisted champagne metallic accents.",
    },
    {
      id: "raw-ecru-alabaster",
      name: "Raw Ecru & Alabaster",
      editorialLabel: "MINERAL PURITY",
      primaryHex: "#EAE5DC",
      secondaryHex: "#C8C0B2",
      narrative: "Unbleached natural field fibers preserving original organic flecks and tonal variations.",
    },
    {
      id: "smoked-charcoal-pewter",
      name: "Smoked Charcoal & Pewter",
      editorialLabel: "MONOCHROME SHADOW",
      primaryHex: "#191A1D",
      secondaryHex: "#6B6E75",
      narrative: "Industrial architectural grey tones with subtle stone depth for contemporary spaces.",
    },
    {
      id: "deep-espresso-sienna",
      name: "Deep Espresso & Sienna",
      editorialLabel: "VEGETAL HERITAGE",
      primaryHex: "#221A18",
      secondaryHex: "#8A6250",
      narrative: "Earth pigments inspired by raw bark, roasted coffee bean, and terracotta pottery.",
    },
    {
      id: "moonlit-sage-slate",
      name: "Moonlit Sage & Slate",
      editorialLabel: "BOTANICAL TRANQUILITY",
      primaryHex: "#2A332F",
      secondaryHex: "#7E8C85",
      narrative: "Muted dry sage greens paired with damp slate for a tranquil organic harmony.",
    },
  ] as ColorPalette[],
};

export const VAULT_PIECES: VaultPiece[] = [
  {
    id: "vault-01",
    editionCode: "VAULT-001 / PIECE 1 OF 1",
    title: "The Aurelia Petite in Obsidian & Gold",
    subtitle: "Finished Handcrafted Commission Ready for Immediate Handover",
    priceINR: "₹34,000",
    priceNumeric: 34000,
    dimensions: "24cm (W) × 18cm (H) × 8cm (D)",
    fiber: "Mercerized Giza Cord with Champagne Lurex Inlay",
    technique: "Dense Single Hook Matrix with Hand-Polished Brass Floor Pegs",
    handcraftHours: "64 Hours",
    description:
      "Crafted in the Hyderabad studio. A compact architectural monolith featuring hand-turned solid brass closures and an individually numbered sterling silver provenance seal.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
  },
  {
    id: "vault-02",
    editionCode: "VAULT-002 / PIECE 1 OF 1",
    title: "The Monolith Cushion No. 04",
    subtitle: "Relief-Sculpted Tactile Cushion for Modern Interiors",
    priceINR: "₹18,500",
    priceNumeric: 18500,
    dimensions: "50cm × 50cm",
    fiber: "High-Altitude Merino Wool & Heavyweight Belgian Linen",
    technique: "Architectural Relief Loops with Concealed Inset Zip",
    handcraftHours: "42 Hours",
    description:
      "Textural relief front with pure brushed charcoal linen backing and hypoallergenic down insert. Zero synthetic binders or plastics.",
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
  },
  {
    id: "vault-03",
    editionCode: "VAULT-003 / PIECE 1 OF 1",
    title: "The Solstice Shawl in Raw Flax",
    subtitle: "Heirloom Open-Gauge Wrap with Hand-Knotted Fringe",
    priceINR: "₹28,000",
    priceNumeric: 28000,
    dimensions: "210cm × 75cm",
    fiber: "100% Unbleached Belgian Flax Linen",
    technique: "Tunisian Open Honeycomb with Featherweight Border",
    handcraftHours: "58 Hours",
    description:
      "Sculpted open-air honeycomb weave. An heirloom wrap for twilight gatherings and coastal air, finished with hand-knotted macramé edges.",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
  },
];

export function getPieceBySlug(slug: string): CollectionPiece | undefined {
  return COLLECTIONS.find((piece) => piece.slug === slug);
}

export function createWhatsAppCommissionLink(params: {
  silhouetteName: string;
  fiberName: string;
  paletteName: string;
  clientName: string;
  notes: string;
  leadTime?: string;
}): string {
  const number = ATELIER_CONFIG.whatsappConciergeNumber.replace(/[^0-9]/g, "");
  const text =
    `THE WEAVE STUDIO — BESPOKE COMMISSION DOSSIER\n` +
    `----------------------------------------\n` +
    `Client: ${params.clientName.trim() || "Anonymous Patron"}\n` +
    `Selected Silhouette: ${params.silhouetteName}\n` +
    `Estimated Lead Time: ${params.leadTime || "4 to 6 Weeks"}\n` +
    `Tactile Fiber: ${params.fiberName}\n` +
    `Curated Palette: ${params.paletteName}\n` +
    `Notes / Specifications: ${params.notes.trim() || "Standard Atelier Specifications"}\n` +
    `----------------------------------------\n` +
    `I would like to request a private consultation regarding this bespoke commission.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createWhatsAppVaultLink(piece: VaultPiece): string {
  const number = ATELIER_CONFIG.whatsappConciergeNumber.replace(/[^0-9]/g, "");
  const text =
    `THE WEAVE STUDIO — PRIVATE VAULT ACQUISITION\n` +
    `----------------------------------------\n` +
    `Piece: ${piece.title}\n` +
    `Edition: ${piece.editionCode}\n` +
    `Acquisition Value: ${piece.priceINR}\n` +
    `Dimensions: ${piece.dimensions}\n` +
    `----------------------------------------\n` +
    `I wish to confirm availability and arrange private acquisition for this piece.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
