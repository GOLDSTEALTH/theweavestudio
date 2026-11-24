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

export interface BespokeVessel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  finishNote: string;
}

export interface BespokeAccent {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  materialNote: string;
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

export interface AtelierStory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  lead: string;
  body: string[];
  pullquote: string;
  image: string;
}

export interface BoutiqueItem {
  id: string;
  title: string;
  subtitle: string;
  category: "FOR THE HOME" | "FOR EVENING" | "BOTANICAL OBJECTS";
  priceINR: string;
  priceNumeric: number;
  dimensions: string;
  fiberSpecs: string;
  handcraftHours: string;
  image: string;
  edition: string;
  description: string;
}

export interface PatronageFAQ {
  question: string;
  answer: string;
  category: string;
}

export interface AtelierConfig {
  studioName: string;
  monogram: string;
  tagline: string;
  eyebrow: string;
  instagramUrl: string;
  instagramHandle: string;
  whatsappConciergeNumber: string;
  location: string;
  founded: string;
  colophon: string;
}

export const ATELIER_CONFIG: AtelierConfig = {
  studioName: "The Weave Studio",
  monogram: "TWS",
  tagline: "Architecture in Every Loop.",
  eyebrow: "BESPOKE HANDCRAFTED CROCHET ATELIER",
  instagramUrl: "https://www.instagram.com/theweave_studio/",
  instagramHandle: "@theweave_studio",
  whatsappConciergeNumber: "+919876543210",
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

export const ATELIER_STORIES: AtelierStory[] = [
  {
    id: "story-01",
    number: "01",
    title: "The Tension of 0.75mm Steel",
    subtitle: "Why the human hand remains uncomputable in high-gauge crochet.",
    tag: "METROLOGY & DISCIPLINE",
    lead: "No industrial robotics exist that can recreate a single double-crochet loop through pre-existing fabric tension.",
    body: [
      "While modern flatbed knitting machines knit thousands of courses per minute, crochet remains completely impervious to mechanical automation. Every stitch requires inserting an angled hook through an existing tensile loop, rotating the shaft, catching the yarn feed, and drawing it back under calibrated muscle memory.",
      "In our Hyderabad studio, our artisans work with polished 0.75mm to 2.5mm Japanese steel hooks. Over a 90-hour commission, an artisan's tension variation must not exceed 0.05 Newtons, ensuring that planar surfaces stay geometrically flat while sculptured curves hold structural self-support.",
    ],
    pullquote: "A single hook, a continuous filament, and eighty hours of unwavering physiological stillness.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1400&auto=format&fit=crop",
  },
  {
    id: "story-02",
    number: "02",
    title: "Long-Staple Giza Provenance",
    subtitle: "Tracing our double-mercerized Egyptian fibers from river basin to hook.",
    tag: "FIBER GENEALOGY",
    lead: "True luxury is knowing the soil, sunshine, and salinity where each fiber strand took root.",
    body: [
      "Our core structural cords are spun exclusively from Giza 45 and Giza 88 Egyptian cotton, grown in the mineral-rich sediment of the Nile Delta. With staple lengths exceeding 38 millimeters, these fibers possess tensile strength twice that of conventional cotton.",
      "The fibers undergo a double-mercerization process in cold caustic baths under tension, swelling the cell walls into cylindrical prisms that reflect light like silk while granting impervious resistance to pilling or surface fatigue across decades.",
    ],
    pullquote: "Living fibers that grow softer with every decade of human touch, rejecting the obsolescence of synthetic polymers.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=85&w=1400&auto=format&fit=crop",
  },
  {
    id: "story-03",
    number: "03",
    title: "Sculpting Without Armatures",
    subtitle: "Achieving monumental architectural volume through pure yarn density.",
    tag: "STRUCTURAL FORM",
    lead: "Cardboard stiffeners and plastic inserts have no place in fine art textiles.",
    body: [
      "Conventional luxury handbags rely upon internal plastic boards, bonded leather stiffeners, or metal frames to force fabric into cubic shapes. The Weave Studio fundamentally rejects this shortcut.",
      "By calculating progressive stitch density shifts and compounding twisted post stitches, our totes and botanical vessels achieve rigid self-standing volume through structural tension alone. The piece stands erect when empty, yet retains the breathability and organic warmth of pure textile craft.",
    ],
    pullquote: "If a textile cannot support its own weight through stitch physics alone, the design has not yet earned its completion.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=85&w=1400&auto=format&fit=crop",
  },
  {
    id: "story-04",
    number: "04",
    title: "The Hyderabad Studio Ledger",
    subtitle: "A private atelier in Hyderabad cataloging every needle stroke in permanent ink.",
    tag: "STUDIO LEDGER",
    lead: "Every commissioned piece is permanently inscribed with an immutable archive serial number.",
    body: [
      "Founded in Hyderabad, The Weave Studio operates as an unhurried sanctuary of craft. Here, natural daylight illuminates quiet workstations, highlighting hundreds of individual skeins categorized by lot provenance and harvest year.",
      "Upon completion of each commission, the master artisan signs our studio ledger alongside the yarn lot codes, hook specifications, handcraft hours, and client dedication. A corresponding hand-engraved metal seal is sewn directly into the weave.",
    ],
    pullquote: "We do not manufacture seasonal collections. We commission generational heirlooms for those who understand permanence.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1400&auto=format&fit=crop",
  },
];

export const BOUTIQUE_ITEMS: BoutiqueItem[] = [
  {
    id: "boutique-01",
    title: "The Nocturne Relief Cushion",
    subtitle: "Architectural Loop Pile for Modern Living Spaces",
    category: "FOR THE HOME",
    priceINR: "₹18,500",
    priceNumeric: 18500,
    dimensions: "50cm × 50cm",
    fiberSpecs: "High-Altitude Himalayan Merino Wool & Heavyweight Belgian Flax",
    handcraftHours: "42 Hours",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=85&w=1200&auto=format&fit=crop",
    edition: "EDITION OF 12",
    description: "Deep relief-knotted loops offering acoustic damping and tactile richness. Backed with Belgian slate linen and inset concealed zipper.",
  },
  {
    id: "boutique-02",
    title: "The Alabaster Table Runner",
    subtitle: "Open-Gauge Architectural Textile for Dining Tables",
    category: "FOR THE HOME",
    priceINR: "₹24,000",
    priceNumeric: 24000,
    dimensions: "180cm × 38cm",
    fiberSpecs: "100% Unbleached Belgian Flax Linen with Raw Selvedge",
    handcraftHours: "54 Hours",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=85&w=1200&auto=format&fit=crop",
    edition: "EDITION OF 08",
    description: "Hand-tensioned lattice geometry engineered to lay perfectly flat over marble or timber without curling at the corners.",
  },
  {
    id: "boutique-03",
    title: "The Aurelia Micro Minaudière",
    subtitle: "Sculpted Evening Clutch with Hand-Polished Brass Frame",
    category: "FOR EVENING",
    priceINR: "₹32,000",
    priceNumeric: 32000,
    dimensions: "20cm × 14cm × 6cm",
    fiberSpecs: "Mercerized Giza Cord with Champagne Metallic Core",
    handcraftHours: "68 Hours",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=85&w=1200&auto=format&fit=crop",
    edition: "EDITION OF 05",
    description: "Rigid monolithic hexagonal geometry designed for evening gatherings. Includes detachable hand-twisted metallic cord strap.",
  },
  {
    id: "boutique-04",
    title: "The Solstice Gossamer Shawl",
    subtitle: "Featherweight Evening Wrap with Hand-Knotted Macramé",
    category: "FOR EVENING",
    priceINR: "₹28,000",
    priceNumeric: 28000,
    dimensions: "210cm × 75cm",
    fiberSpecs: "70% Belgian Flax Linen, 30% Grade-6A Mulberry Silk",
    handcraftHours: "58 Hours",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=85&w=1200&auto=format&fit=crop",
    edition: "EDITION OF 10",
    description: "Airy Tunisian honeycomb weave that drapes with liquid grace. Folds into a compact travel pouch for transcontinental passage.",
  },
  {
    id: "boutique-05",
    title: "The Single Véridique Heritage Rose",
    subtitle: "Permanent Sculptural Bloom in Blackened Stoneware Vessel",
    category: "BOTANICAL OBJECTS",
    priceINR: "₹16,500",
    priceNumeric: 16500,
    dimensions: "28cm (H) × 14cm (W)",
    fiberSpecs: "Japanese Mercerized Paper Yarn & Brass Wire Veining",
    handcraftHours: "28 Hours",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=85&w=1200&auto=format&fit=crop",
    edition: "NUMBERED ATELIER EDITION",
    description: "An eternal rose crafted with 21 sculpted petals wired for bespoke positioning, anchored in a turned raw ceramic pedestal.",
  },
  {
    id: "boutique-06",
    title: "The Solitary Japanese Paper Iris",
    subtitle: "Minimalist Botanical Study in Raw Alabaster Base",
    category: "BOTANICAL OBJECTS",
    priceINR: "₹19,000",
    priceNumeric: 19000,
    dimensions: "34cm (H) × 16cm (W)",
    fiberSpecs: "Mino Washi Bark Yarn with Raw Silk Stamen",
    handcraftHours: "34 Hours",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=85&w=1200&auto=format&fit=crop",
    edition: "NUMBERED ATELIER EDITION",
    description: "Subtle paper-crisp petals with natural matte grain. Never fades, requiring zero water or natural light maintenance.",
  },
];

export const PATRONAGE_FAQS: PatronageFAQ[] = [
  {
    category: "COMMISSIONING",
    question: "What is the timeline for a bespoke commission?",
    answer: "Given that every loop is formed by a single master artisan without machine intervention, commissions require between 3 to 8 weeks depending on the silhouette. A botanical study typically requires 3 to 5 weeks, an Aurelia tote 4 to 6 weeks, and an architectural tapestry 6 to 8 weeks. Rush requests may be accommodated through private consultation with the Concierge.",
  },
  {
    category: "COMMISSIONING",
    question: "How are yarn swatches dispatched for consultation?",
    answer: "Prior to fiber casting, we dispatch our Atelier Swatch Folio to your address. The presentation box includes 5cm curated fiber discs in your requested palettes, allowing you to experience the tactile hand, density, and natural light reflection of Giza cotton, Belgian linen, and Himalayan merino in your own space.",
  },
  {
    category: "LOGISTICS",
    question: "How are pieces dispatched internationally?",
    answer: "All finished commissions and Vault pieces are packed in custom cedar-lined presentation boxes wrapped in breathable organic muslin. International shipments are handled exclusively via insured white-glove courier services with tracked direct handover.",
  },
  {
    category: "PRESERVATION",
    question: "How do I care for, clean, or re-block an heirloom piece?",
    answer: "Natural fibers thrive on gentle care. For routine preservation, store items in their provided cedar boxes away from direct dampness. Should an edition require re-shaping or cleaning after years of use, The Weave Studio offers complimentary lifetime inspection and steam-blocking in our Hyderabad studio for all registered patrons.",
  },
  {
    category: "BESPOKE SERVICE",
    question: "Can I commission custom color matching to interior swatches?",
    answer: "Yes. Our Private Office accepts architectural material boards, paint references, or physical fabric cuttings. Our artisans create custom low-impact mineral dye vats to achieve precise tonal alignment for your private residence.",
  },
  {
    category: "SALON VISITS",
    question: "How can I arrange an appointment at the Hyderabad atelier?",
    answer: "Private salon appointments are held by prior arrangement at our Hyderabad studio. Patrons are invited to view work in progress, inspect archive ledgers, and discuss bespoke proportions. Please contact our Concierge via WhatsApp or inquiry form to reserve a private salon slot.",
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
      id: "ivory-champagne",
      name: "Ivory & Champagne",
      editorialLabel: "WARM LIMESTONE",
      primaryHex: "#EFE9DD",
      secondaryHex: "#C8A87A",
      narrative: "Luminous unbleached ivory yarns accented with spun sand raw silk thread.",
    },
    {
      id: "obsidian-champagne",
      name: "Obsidian & Champagne",
      editorialLabel: "SMOKED GRAPHITE",
      primaryHex: "#181A22",
      secondaryHex: "#C8A87A",
      narrative: "Deep slate obsidian loops offset by hand-twisted warm silk thread.",
    },
    {
      id: "bordeaux-blush",
      name: "Bordeaux Velvet & Blush",
      editorialLabel: "VELVET BORDEAUX",
      primaryHex: "#5C1F2B",
      secondaryHex: "#D8B4A8",
      narrative: "Deep dramatic bordeaux stitches paired with soft powdered blush undertones.",
    },
    {
      id: "raw-ecru-alabaster",
      name: "Raw Ecru & Alabaster",
      editorialLabel: "ATELIER PLASTER",
      primaryHex: "#EAE5DC",
      secondaryHex: "#C8C0B2",
      narrative: "Unbleached natural field fibers preserving organic flecks and tonal nuance.",
    },
    {
      id: "moonlit-sage-slate",
      name: "Moonlit Sage & Slate",
      editorialLabel: "BOTANICAL SAGE",
      primaryHex: "#2A332F",
      secondaryHex: "#7E8C85",
      narrative: "Muted dry sage greens paired with damp slate for a tranquil organic harmony.",
    },
    {
      id: "deep-espresso-sienna",
      name: "Deep Espresso & Sienna",
      editorialLabel: "AMBER SIENNA",
      primaryHex: "#221A18",
      secondaryHex: "#8A6250",
      narrative: "Earth pigments inspired by raw bark, roasted coffee bean, and terracotta pottery.",
    },
  ] as ColorPalette[],

  vessels: [
    {
      id: "stoneware-vessel",
      name: "Blackened Stoneware Vessel",
      subtitle: "Matte Ceramic Architecture",
      description: "Matte kiln-fired ceramic cylinder with thin white hairline rim and weighted base.",
      finishNote: "Hand-thrown coarse stoneware with volcanic slip glaze.",
    },
    {
      id: "linen-wrap",
      name: "Sculpted Linen Wrap",
      subtitle: "Pleated Fiber Presentation",
      description: "Hand-pleated Belgian flax cone secured with tied satin cords.",
      finishNote: "Raw unbleached linen with fringed architectural folds.",
    },
    {
      id: "brass-collar",
      name: "Brushed Brass Ribbon Tie",
      subtitle: "Minimalist Stem Binding",
      description: "Minimalist hand-bound stems secured with a patinated brass cuff.",
      finishNote: "Solid brass cylinder with hand-brushed satin luster.",
    },
  ] as BespokeVessel[],

  accents: [
    {
      id: "eucalyptus-sprigs",
      name: "Crochet Eucalyptus Sprigs",
      subtitle: "Hand-Looped Foliage",
      description: "Sage-tinted organic crochet discs mounted on wire armatures.",
      materialNote: "Mercerized botanical thread with matte powdery finish.",
    },
    {
      id: "champagne-filaments",
      name: "Champagne Brass Filaments",
      subtitle: "Metallic Micro-Accents",
      description: "Micro-wired metallic botanical accents with hand-set pearl beads.",
      materialNote: "Brushed brass filaments and vintage glass pearls.",
    },
    {
      id: "pure-blooms",
      name: "Pure Monolith Blooms",
      subtitle: "Unadorned Sculpture",
      description: "Unadorned sculptural flower composition celebrating pure stitch geometry.",
      materialNote: "Zero foliage or metallic additions; absolute structural focus.",
    },
  ] as BespokeAccent[],
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
  vesselName?: string;
  accentName?: string;
  isBotanical?: boolean;
}): string {
  const number = ATELIER_CONFIG.whatsappConciergeNumber.replace(/[^0-9]/g, "");
  const lines = [
    `THE WEAVE STUDIO — BESPOKE COMMISSION DOSSIER`,
    `----------------------------------------`,
    `Patron: ${params.clientName.trim() || "Anonymous Patron"}`,
    `Selected Silhouette: ${params.silhouetteName}`,
    `Estimated Lead Time: ${params.leadTime || "4 to 6 Weeks"}`,
    `Tactile Fiber: ${params.fiberName}`,
    `Curated Palette: ${params.paletteName}`,
  ];

  if (params.isBotanical !== false && params.vesselName) {
    lines.push(`Presentation Vessel: ${params.vesselName}`);
  }
  if (params.isBotanical !== false && params.accentName) {
    lines.push(`Botanical Accents: ${params.accentName}`);
  }

  lines.push(
    `Notes / Specifications: ${params.notes.trim() || "Standard Atelier Specifications"}`,
    `----------------------------------------`,
    `I would like to request a private consultation regarding this bespoke commission.`
  );

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
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

export function createWhatsAppBoutiqueInquiryLink(items: BoutiqueItem[], patronName?: string): string {
  const number = ATELIER_CONFIG.whatsappConciergeNumber.replace(/[^0-9]/g, "");
  const lines = [
    `THE WEAVE STUDIO — BOUTIQUE INQUIRY LIST`,
    `----------------------------------------`,
    `Patron: ${patronName?.trim() || "Anonymous Patron"}`,
    `Selected Items (${items.length}):`,
    ...items.map(
      (item, idx) =>
        `${idx + 1}. ${item.title} (${item.priceINR}) [${item.edition}] - ${item.dimensions}`
    ),
    `----------------------------------------`,
    `I would like to inquire regarding availability and direct handover for these curated boutique items.`,
  ];

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function createWhatsAppConciergeLink(inquiry: {
  name: string;
  email?: string;
  topic: string;
  message: string;
}): string {
  const number = ATELIER_CONFIG.whatsappConciergeNumber.replace(/[^0-9]/g, "");
  const lines = [
    `THE WEAVE STUDIO — PRIVATE CONCIERGE INQUIRY`,
    `----------------------------------------`,
    `Patron: ${inquiry.name.trim() || "Anonymous Patron"}`,
    `Topic: ${inquiry.topic}`,
    inquiry.email ? `Email: ${inquiry.email}` : "",
    `Message: ${inquiry.message.trim() || "I would like to request a private consultation."}`,
    `----------------------------------------`,
  ].filter(Boolean);

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
