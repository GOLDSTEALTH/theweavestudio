import * as THREE from "three";

/**
 * Creates a parametric, organically sculpted crocheted petal geometry
 * with double-layered thickness, natural cupping curvature, spoon concavity,
 * picot edge undulation, clean UVs, and smooth vertex normals.
 */
export function createSculptedPetalGeometry(opts: {
  width?: number;
  length?: number;
  cuppingDepth?: number;
  spoonDepth?: number;
  reflexAmount?: number;
  thickness?: number;
  segmentsU?: number;
  segmentsV?: number;
} = {}): THREE.BufferGeometry {
  const {
    width = 0.55,
    length = 0.85,
    cuppingDepth = 0.22,
    spoonDepth = 0.15,
    reflexAmount = 0.08,
    thickness = 0.025,
    segmentsU = 14,
    segmentsV = 18,
  } = opts;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const cols = segmentsU + 1;
  const rows = segmentsV + 1;

  // Front surface: z + thickness/2
  for (let r = 0; r <= segmentsV; r++) {
    const v = r / segmentsV;
    const baseW = Math.sin(Math.PI * Math.pow(v, 0.7));
    const y = v * length;
    const cupZ = -Math.sin(v * Math.PI * 0.85) * cuppingDepth;
    const reflexZ = Math.pow(Math.max(0, v - 0.65) / 0.35, 2) * reflexAmount;

    for (let c = 0; c <= segmentsU; c++) {
      const u = c / segmentsU;
      const uNorm = (u - 0.5) * 2;
      const w = baseW * (1.0 - 0.1 * (1 - uNorm * uNorm) * Math.pow(v, 3));
      const x = uNorm * w * (width * 0.5);
      const spoonZ = -(1 - uNorm * uNorm) * spoonDepth * Math.sin(v * Math.PI);
      const picot = Math.sin(u * Math.PI * 6) * 0.015 * Math.pow(v, 2);
      const z = cupZ + reflexZ + spoonZ + picot;

      positions.push(x, y, z + thickness * 0.5);
      uvs.push(u, v);
    }
  }

  // Back surface: z - thickness/2
  for (let r = 0; r <= segmentsV; r++) {
    const v = r / segmentsV;
    const baseW = Math.sin(Math.PI * Math.pow(v, 0.7));
    const y = v * length;
    const cupZ = -Math.sin(v * Math.PI * 0.85) * cuppingDepth;
    const reflexZ = Math.pow(Math.max(0, v - 0.65) / 0.35, 2) * reflexAmount;

    for (let c = 0; c <= segmentsU; c++) {
      const u = c / segmentsU;
      const uNorm = (u - 0.5) * 2;
      const w = baseW * (1.0 - 0.1 * (1 - uNorm * uNorm) * Math.pow(v, 3));
      const x = uNorm * w * (width * 0.5);
      const spoonZ = -(1 - uNorm * uNorm) * spoonDepth * Math.sin(v * Math.PI);
      const picot = Math.sin(u * Math.PI * 6) * 0.015 * Math.pow(v, 2);
      const z = cupZ + reflexZ + spoonZ + picot;

      positions.push(x, y, z - thickness * 0.5);
      uvs.push(u, v);
    }
  }

  const offsetBack = cols * rows;

  // Front faces
  for (let r = 0; r < segmentsV; r++) {
    for (let c = 0; c < segmentsU; c++) {
      const i0 = r * cols + c;
      const i1 = i0 + 1;
      const i2 = (r + 1) * cols + c;
      const i3 = i2 + 1;
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  // Back faces (reverse winding)
  for (let r = 0; r < segmentsV; r++) {
    for (let c = 0; c < segmentsU; c++) {
      const i0 = offsetBack + r * cols + c;
      const i1 = i0 + 1;
      const i2 = offsetBack + (r + 1) * cols + c;
      const i3 = i2 + 1;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  // Rim stitching along boundary
  // Left edge (c = 0)
  for (let r = 0; r < segmentsV; r++) {
    const f0 = r * cols;
    const f1 = (r + 1) * cols;
    const b0 = offsetBack + r * cols;
    const b1 = offsetBack + (r + 1) * cols;
    indices.push(f0, b0, f1);
    indices.push(b0, b1, f1);
  }
  // Right edge (c = segmentsU)
  for (let r = 0; r < segmentsV; r++) {
    const f0 = r * cols + segmentsU;
    const f1 = (r + 1) * cols + segmentsU;
    const b0 = offsetBack + r * cols + segmentsU;
    const b1 = offsetBack + (r + 1) * cols + segmentsU;
    indices.push(f0, f1, b0);
    indices.push(b0, f1, b1);
  }
  // Top edge (r = segmentsV)
  for (let c = 0; c < segmentsU; c++) {
    const f0 = segmentsV * cols + c;
    const f1 = f0 + 1;
    const b0 = offsetBack + segmentsV * cols + c;
    const b1 = b0 + 1;
    indices.push(f0, f1, b0);
    indices.push(b0, f1, b1);
  }
  // Bottom edge (r = 0)
  for (let c = 0; c < segmentsU; c++) {
    const f0 = c;
    const f1 = c + 1;
    const b0 = offsetBack + c;
    const b1 = b0 + 1;
    indices.push(f0, b0, f1);
    indices.push(b0, b1, f1);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a parametric curved crocheted leaf geometry with a raised midrib
 * and subtle crochet edge picot texture.
 */
export function createSculptedLeafGeometry(opts: {
  width?: number;
  length?: number;
  curvature?: number;
  thickness?: number;
  segmentsU?: number;
  segmentsV?: number;
} = {}): THREE.BufferGeometry {
  const {
    width = 0.38,
    length = 0.95,
    curvature = 0.18,
    thickness = 0.02,
    segmentsU = 10,
    segmentsV = 16,
  } = opts;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const cols = segmentsU + 1;
  const rows = segmentsV + 1;

  for (let r = 0; r <= segmentsV; r++) {
    const v = r / segmentsV;
    const y = v * length;
    const leafW = Math.sin(Math.PI * Math.pow(v, 0.65)) * width;
    const curveZ = -Math.pow(v, 1.8) * curvature;

    for (let c = 0; c <= segmentsU; c++) {
      const u = c / segmentsU;
      const uNorm = (u - 0.5) * 2;
      const x = uNorm * (leafW * 0.5);
      const midribZ = (1 - Math.abs(uNorm)) * 0.035 * Math.sin(v * Math.PI);
      const picot = Math.sin(u * Math.PI * 4) * 0.01 * Math.sin(v * Math.PI);
      const z = curveZ + midribZ + picot;

      positions.push(x, y, z + thickness * 0.5);
      uvs.push(u, v);
    }
  }

  // Back surface
  for (let r = 0; r <= segmentsV; r++) {
    const v = r / segmentsV;
    const y = v * length;
    const leafW = Math.sin(Math.PI * Math.pow(v, 0.65)) * width;
    const curveZ = -Math.pow(v, 1.8) * curvature;

    for (let c = 0; c <= segmentsU; c++) {
      const u = c / segmentsU;
      const uNorm = (u - 0.5) * 2;
      const x = uNorm * (leafW * 0.5);
      const midribZ = -(1 - Math.abs(uNorm)) * 0.02 * Math.sin(v * Math.PI);
      const picot = Math.sin(u * Math.PI * 4) * 0.01 * Math.sin(v * Math.PI);
      const z = curveZ + midribZ + picot;

      positions.push(x, y, z - thickness * 0.5);
      uvs.push(u, v);
    }
  }

  const offsetBack = cols * rows;

  // Front faces
  for (let r = 0; r < segmentsV; r++) {
    for (let c = 0; c < segmentsU; c++) {
      const i0 = r * cols + c;
      const i1 = i0 + 1;
      const i2 = (r + 1) * cols + c;
      const i3 = i2 + 1;
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  // Back faces
  for (let r = 0; r < segmentsV; r++) {
    for (let c = 0; c < segmentsU; c++) {
      const i0 = offsetBack + r * cols + c;
      const i1 = i0 + 1;
      const i2 = offsetBack + (r + 1) * cols + c;
      const i3 = i2 + 1;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  // Rim stitching
  for (let r = 0; r < segmentsV; r++) {
    const f0 = r * cols;
    const f1 = (r + 1) * cols;
    const b0 = offsetBack + r * cols;
    const b1 = offsetBack + (r + 1) * cols;
    indices.push(f0, b0, f1);
    indices.push(b0, b1, f1);
  }
  for (let r = 0; r < segmentsV; r++) {
    const f0 = r * cols + segmentsU;
    const f1 = (r + 1) * cols + segmentsU;
    const b0 = offsetBack + r * cols + segmentsU;
    const b1 = offsetBack + (r + 1) * cols + segmentsU;
    indices.push(f0, f1, b0);
    indices.push(b0, f1, b1);
  }
  for (let c = 0; c < segmentsU; c++) {
    const f0 = segmentsV * cols + c;
    const f1 = f0 + 1;
    const b0 = offsetBack + segmentsV * cols + c;
    const b1 = b0 + 1;
    indices.push(f0, f1, b0);
    indices.push(b0, f1, b1);
  }
  for (let c = 0; c < segmentsU; c++) {
    const f0 = c;
    const f1 = c + 1;
    const b0 = offsetBack + c;
    const b1 = b0 + 1;
    indices.push(f0, b0, f1);
    indices.push(b0, b1, f1);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Builds a multi-layered hero crocheted rose using golden-angle phyllotaxis
 * across 4 progressive tiers (19-21 petals total) + a 5-sepal green calyx.
 */
export function buildCrochetRose(
  primaryMat: THREE.Material,
  secondaryMat: THREE.Material,
  calyxMat: THREE.Material,
  seed = 0
): THREE.Group {
  const roseGroup = new THREE.Group();

  // Shared tier geometries for performance
  const budPetalGeom = createSculptedPetalGeometry({
    width: 0.32,
    length: 0.48,
    cuppingDepth: 0.28,
    spoonDepth: 0.18,
    reflexAmount: 0.02,
    thickness: 0.02,
  });

  const innerPetalGeom = createSculptedPetalGeometry({
    width: 0.44,
    length: 0.62,
    cuppingDepth: 0.24,
    spoonDepth: 0.15,
    reflexAmount: 0.05,
    thickness: 0.022,
  });

  const midPetalGeom = createSculptedPetalGeometry({
    width: 0.58,
    length: 0.76,
    cuppingDepth: 0.2,
    spoonDepth: 0.14,
    reflexAmount: 0.1,
    thickness: 0.024,
  });

  const outerPetalGeom = createSculptedPetalGeometry({
    width: 0.72,
    length: 0.88,
    cuppingDepth: 0.16,
    spoonDepth: 0.12,
    reflexAmount: 0.15,
    thickness: 0.026,
  });

  // Center bud cone / core knot
  const coreKnotGeom = new THREE.SphereGeometry(0.12, 12, 10);
  coreKnotGeom.scale(1, 1.3, 0.9);
  const coreMesh = new THREE.Mesh(coreKnotGeom, secondaryMat);
  coreMesh.position.y = 0.14;
  roseGroup.add(coreMesh);

  // Tier 1: Tightly spiraled inner bud cone (4 petals, secondary tone)
  const tier1Count = 4;
  for (let i = 0; i < tier1Count; i++) {
    const angle = i * ((Math.PI * 2) / tier1Count) + seed * 0.4;
    const petal = new THREE.Mesh(budPetalGeom, secondaryMat);
    petal.position.set(Math.cos(angle) * 0.04, 0.06, Math.sin(angle) * 0.04);
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.18; // upright tilt
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Tier 2: Inner cupped whorl (5 petals, tilted ~22 degrees, golden angle)
  const tier2Count = 5;
  const goldenAngle = 2.39996; // ~137.5 degrees in radians
  for (let i = 0; i < tier2Count; i++) {
    const angle = i * goldenAngle + seed;
    const petal = new THREE.Mesh(innerPetalGeom, primaryMat);
    const radius = 0.09;
    petal.position.set(Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius);
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.38; // ~22 deg tilt outward
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Tier 3: Mid fuller whorl (6 petals, tilted ~42 degrees with reflexed tips)
  const tier3Count = 6;
  for (let i = 0; i < tier3Count; i++) {
    const angle = (i * ((Math.PI * 2) / tier3Count)) + seed * 0.7 + 0.35;
    const petal = new THREE.Mesh(midPetalGeom, primaryMat);
    const radius = 0.16;
    petal.position.set(Math.cos(angle) * radius, 0.09, Math.sin(angle) * radius);
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.72; // ~41 deg tilt outward
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Tier 4: Outer lush open whorl (7 broad scalloped petals, tilted ~65 degrees)
  const tier4Count = 7;
  for (let i = 0; i < tier4Count; i++) {
    const angle = (i * ((Math.PI * 2) / tier4Count)) + seed * 1.1 + 0.18;
    const petal = new THREE.Mesh(outerPetalGeom, primaryMat);
    const radius = 0.24;
    petal.position.set(Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius);
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 1.12; // ~64 deg tilt outward
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Green Crocheted Calyx (5 pointed sepal leaves underneath the base)
  const sepalGeom = createSculptedLeafGeometry({
    width: 0.16,
    length: 0.36,
    curvature: 0.12,
    thickness: 0.018,
  });

  const calyxBaseGeom = new THREE.CylinderGeometry(0.12, 0.06, 0.14, 10);
  const calyxBase = new THREE.Mesh(calyxBaseGeom, calyxMat);
  calyxBase.position.y = -0.06;
  roseGroup.add(calyxBase);

  for (let i = 0; i < 5; i++) {
    const angle = i * ((Math.PI * 2) / 5) + 0.25;
    const sepal = new THREE.Mesh(sepalGeom, calyxMat);
    sepal.position.set(Math.cos(angle) * 0.1, -0.04, Math.sin(angle) * 0.1);
    sepal.rotation.y = -angle + Math.PI / 2;
    sepal.rotation.x = 1.75; // reflexed downward against the stem
    sepal.castShadow = true;
    roseGroup.add(sepal);
  }

  return roseGroup;
}

/**
 * Builds a sculpted crocheted tulip / ranunculus with 6 cupped overlapping petals,
 * clustered French-knot stamen center, and green crocheted calyx.
 */
export function buildCrochetTulip(
  bloomMat: THREE.Material,
  stamenMat: THREE.Material,
  calyxMat: THREE.Material,
  seed = 0
): THREE.Group {
  const tulipGroup = new THREE.Group();

  const tulipPetalGeom = createSculptedPetalGeometry({
    width: 0.48,
    length: 0.82,
    cuppingDepth: 0.32,
    spoonDepth: 0.22,
    reflexAmount: 0.04,
    thickness: 0.024,
  });

  // Stamen cluster (3-4 clustered yarn French-knots in gold/espresso)
  const stamenGroup = new THREE.Group();
  const stamenCoreGeom = new THREE.SphereGeometry(0.045, 8, 8);
  for (let s = 0; s < 5; s++) {
    const sAng = s * ((Math.PI * 2) / 5);
    const knot = new THREE.Mesh(stamenCoreGeom, stamenMat);
    knot.position.set(Math.cos(sAng) * 0.04, 0.28 + (s % 2) * 0.03, Math.sin(sAng) * 0.04);
    stamenGroup.add(knot);
  }
  const centralPistil = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.25, 8), calyxMat);
  centralPistil.position.y = 0.15;
  stamenGroup.add(centralPistil);
  tulipGroup.add(stamenGroup);

  // Inner tier: 3 cupped petals
  for (let i = 0; i < 3; i++) {
    const angle = i * ((Math.PI * 2) / 3) + seed;
    const petal = new THREE.Mesh(tulipPetalGeom, bloomMat);
    petal.position.set(Math.cos(angle) * 0.08, 0.06, Math.sin(angle) * 0.08);
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.22;
    petal.castShadow = true;
    petal.receiveShadow = true;
    tulipGroup.add(petal);
  }

  // Outer tier: 3 staggered petals
  for (let i = 0; i < 3; i++) {
    const angle = i * ((Math.PI * 2) / 3) + seed + Math.PI / 3;
    const petal = new THREE.Mesh(tulipPetalGeom, bloomMat);
    petal.position.set(Math.cos(angle) * 0.12, 0.04, Math.sin(angle) * 0.12);
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.35;
    petal.castShadow = true;
    petal.receiveShadow = true;
    tulipGroup.add(petal);
  }

  // Calyx base
  const calyxMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.04, 0.12, 8), calyxMat);
  calyxMesh.position.y = -0.04;
  tulipGroup.add(calyxMesh);

  return tulipGroup;
}

/**
 * Builds a micro-crochet closed bud with overlapping protective sepals.
 */
export function buildCrochetBud(
  bloomMat: THREE.Material,
  calyxMat: THREE.Material
): THREE.Group {
  const budGroup = new THREE.Group();

  const budGeom = new THREE.ConeGeometry(0.12, 0.38, 12);
  const budMesh = new THREE.Mesh(budGeom, bloomMat);
  budMesh.position.y = 0.18;
  budMesh.castShadow = true;
  budGroup.add(budMesh);

  const sepalGeom = createSculptedLeafGeometry({
    width: 0.12,
    length: 0.34,
    curvature: 0.08,
    thickness: 0.015,
  });

  for (let i = 0; i < 3; i++) {
    const angle = i * ((Math.PI * 2) / 3);
    const sepal = new THREE.Mesh(sepalGeom, calyxMat);
    sepal.position.set(Math.cos(angle) * 0.06, 0.06, Math.sin(angle) * 0.06);
    sepal.rotation.y = -angle + Math.PI / 2;
    sepal.rotation.x = 0.18;
    sepal.castShadow = true;
    budGroup.add(sepal);
  }

  return budGroup;
}

/**
 * Builds the Blackened Stoneware Vessel with a hollow double-walled profile
 * and recessed brushed brass inlay collar.
 */
export function buildStonewareVessel(
  ceramicMat: THREE.Material,
  brassMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  // Hollow double-walled profile
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0, -0.65),
    new THREE.Vector2(0.42, -0.65), // base
    new THREE.Vector2(0.48, -0.45),
    new THREE.Vector2(0.53, -0.15), // belly
    new THREE.Vector2(0.49, 0.22),
    new THREE.Vector2(0.42, 0.52),  // neck
    new THREE.Vector2(0.45, 0.62),  // lip outer
    new THREE.Vector2(0.39, 0.62),  // lip inner
    new THREE.Vector2(0.36, 0.50),  // inner cavity
    new THREE.Vector2(0.41, 0.20),
    new THREE.Vector2(0.44, -0.15),
    new THREE.Vector2(0.38, -0.45),
    new THREE.Vector2(0.28, -0.58), // bottom of inner cavity
    new THREE.Vector2(0, -0.58),
  ];

  const bodyGeom = new THREE.LatheGeometry(points, 36);
  const bodyMesh = new THREE.Mesh(bodyGeom, ceramicMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  group.add(bodyMesh);

  // Recessed brushed brass hairline inlay ring around neck
  const collarGeom = new THREE.CylinderGeometry(0.432, 0.432, 0.024, 36, 1, true);
  const collarMesh = new THREE.Mesh(collarGeom, brassMat);
  collarMesh.position.y = 0.42;
  group.add(collarMesh);

  return group;
}

/**
 * Builds the Sculpted Linen Wrap with 5 overlapping flared pleated wrap sheets
 * and a tied crocheted ribbon bow in champagne gold.
 */
export function buildLinenWrap(
  linenMat: THREE.Material,
  ribbonMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  // 5 overlapping fanned sheets tapering into gathered waist
  for (let i = 0; i < 5; i++) {
    const angle = (i - 2) * 0.45 - Math.PI / 2;
    const height = 1.15;
    const sheetGeom = new THREE.CylinderGeometry(
      0.58 + (i % 2) * 0.04,
      0.24,
      height,
      16,
      8,
      true,
      angle - 0.5,
      1.15
    );

    // Apply organic ruffling to the top edge
    const pos = sheetGeom.attributes.position;
    for (let p = 0; p < pos.count; p++) {
      const py = pos.getY(p);
      if (py > height * 0.2) {
        const factor = (py - height * 0.2) / (height * 0.8);
        const wave = Math.sin(p * 0.8) * 0.025 * factor;
        pos.setX(p, pos.getX(p) + wave);
        pos.setZ(p, pos.getZ(p) + wave * 0.7);
      }
    }
    sheetGeom.computeVertexNormals();

    const sheetMesh = new THREE.Mesh(sheetGeom, linenMat);
    sheetMesh.position.set(0, 0.05, 0);
    sheetMesh.castShadow = true;
    sheetMesh.receiveShadow = true;
    group.add(sheetMesh);
  }

  // Tied satin ribbon bow and draped tails at the gathered waist
  const waistCuffGeom = new THREE.TorusGeometry(0.24, 0.035, 12, 32);
  waistCuffGeom.rotateX(Math.PI / 2);
  const waistCuff = new THREE.Mesh(waistCuffGeom, ribbonMat);
  waistCuff.position.set(0, -0.32, 0);
  waistCuff.castShadow = true;
  group.add(waistCuff);

  // Bow loops
  const bowLoopGeom = new THREE.TorusGeometry(0.09, 0.022, 10, 24);
  const loop1 = new THREE.Mesh(bowLoopGeom, ribbonMat);
  loop1.position.set(0.1, -0.32, 0.25);
  loop1.rotation.set(0.2, 0.4, 0.5);
  group.add(loop1);

  const loop2 = new THREE.Mesh(bowLoopGeom, ribbonMat);
  loop2.position.set(-0.1, -0.32, 0.25);
  loop2.rotation.set(0.2, -0.4, -0.5);
  group.add(loop2);

  // Bow knot
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), ribbonMat);
  knot.position.set(0, -0.32, 0.27);
  group.add(knot);

  // Draped trailing ribbon tails
  const tail1Curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.02, -0.33, 0.26),
    new THREE.Vector3(0.06, -0.48, 0.29),
    new THREE.Vector3(0.09, -0.65, 0.31),
  ]);
  const tail2Curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.02, -0.33, 0.26),
    new THREE.Vector3(-0.07, -0.47, 0.28),
    new THREE.Vector3(-0.11, -0.62, 0.30),
  ]);
  const tail1 = new THREE.Mesh(new THREE.TubeGeometry(tail1Curve, 14, 0.016, 8, false), ribbonMat);
  const tail2 = new THREE.Mesh(new THREE.TubeGeometry(tail2Curve, 14, 0.016, 8, false), ribbonMat);
  tail1.castShadow = true;
  tail2.castShadow = true;
  group.add(tail1);
  group.add(tail2);

  return group;
}

/**
 * Builds the Hand-Bound Stems + Patinated Brass Collar.
 */
export function buildBrassCollar(
  brassMat: THREE.Material,
  gripMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  // Yarn-wrapped grip under the cuff
  const gripGeom = new THREE.CylinderGeometry(0.19, 0.16, 0.48, 24);
  const gripMesh = new THREE.Mesh(gripGeom, gripMat);
  gripMesh.position.y = -0.34;
  gripMesh.castShadow = true;
  gripMesh.receiveShadow = true;
  group.add(gripMesh);

  // Sculpted bevel-edged brass cuff
  const cuffPoints = [
    new THREE.Vector2(0.18, -0.16),
    new THREE.Vector2(0.21, -0.14),
    new THREE.Vector2(0.215, 0.0),
    new THREE.Vector2(0.21, 0.14),
    new THREE.Vector2(0.18, 0.16),
  ];
  const cuffGeom = new THREE.LatheGeometry(cuffPoints, 36);
  const cuffMesh = new THREE.Mesh(cuffGeom, brassMat);
  cuffMesh.position.y = -0.32;
  cuffMesh.castShadow = true;
  group.add(cuffMesh);

  // Fine horizontal brass wire bands
  const band1 = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.008, 8, 36), brassMat);
  band1.position.y = -0.27;
  band1.rotation.x = Math.PI / 2;
  group.add(band1);

  const band2 = new THREE.Mesh(new THREE.TorusGeometry(0.218, 0.008, 8, 36), brassMat);
  band2.position.y = -0.37;
  band2.rotation.x = Math.PI / 2;
  group.add(band2);

  return group;
}

/**
 * Builds the Eucalyptus Sprigs accent with curved wire-wrapped stems
 * and paired cupped heart/oval crochet leaves.
 */
export function buildEucalyptusSprigs(
  foliageMat: THREE.Material,
  wireMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  const leafGeom = createSculptedLeafGeometry({
    width: 0.22,
    length: 0.28,
    curvature: 0.14,
    thickness: 0.016,
  });

  const stemConfigs = [
    {
      curve: [
        new THREE.Vector3(0, -0.25, 0),
        new THREE.Vector3(0.45, 0.25, 0.25),
        new THREE.Vector3(0.78, 0.72, 0.35),
        new THREE.Vector3(0.95, 1.15, 0.42),
      ],
      pairs: 4,
    },
    {
      curve: [
        new THREE.Vector3(0, -0.25, 0),
        new THREE.Vector3(-0.48, 0.22, -0.18),
        new THREE.Vector3(-0.82, 0.65, -0.28),
        new THREE.Vector3(-1.05, 1.05, -0.35),
      ],
      pairs: 4,
    },
    {
      curve: [
        new THREE.Vector3(0, -0.25, 0),
        new THREE.Vector3(0.12, 0.35, -0.45),
        new THREE.Vector3(0.22, 0.82, -0.75),
        new THREE.Vector3(0.28, 1.25, -0.92),
      ],
      pairs: 3,
    },
  ];

  stemConfigs.forEach((cfg) => {
    const curve = new THREE.CatmullRomCurve3(cfg.curve);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.012, 8, false), wireMat);
    tube.castShadow = true;
    group.add(tube);

    for (let p = 1; p <= cfg.pairs; p++) {
      const t = p / (cfg.pairs + 0.5);
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const scale = 1.0 - t * 0.35; // scales down toward tip

      // Left leaf
      const leftLeaf = new THREE.Mesh(leafGeom, foliageMat);
      leftLeaf.position.copy(point);
      leftLeaf.scale.set(scale, scale, scale);
      leftLeaf.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      leftLeaf.rotateZ(0.3);
      leftLeaf.castShadow = true;
      group.add(leftLeaf);

      // Right leaf
      const rightLeaf = new THREE.Mesh(leafGeom, foliageMat);
      rightLeaf.position.copy(point);
      rightLeaf.scale.set(scale, scale, scale);
      rightLeaf.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal.clone().negate());
      rightLeaf.rotateZ(-0.3);
      rightLeaf.castShadow = true;
      group.add(rightLeaf);
    }
  });

  return group;
}

/**
 * Builds the Champagne Brass Filaments accent with arcing metallic micro-wires
 * and multi-petal filigree cups holding freshwater pearl buds.
 */
export function buildChampagneFilaments(
  brassMat: THREE.Material,
  pearlMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  const filamentConfigs = [
    [
      new THREE.Vector3(0, -0.15, 0),
      new THREE.Vector3(0.32, 0.55, 0.32),
      new THREE.Vector3(0.62, 0.95, 0.48),
      new THREE.Vector3(0.75, 1.22, 0.55),
    ],
    [
      new THREE.Vector3(0, -0.15, 0),
      new THREE.Vector3(-0.35, 0.62, 0.28),
      new THREE.Vector3(-0.58, 1.05, 0.38),
      new THREE.Vector3(-0.68, 1.35, 0.42),
    ],
    [
      new THREE.Vector3(0, -0.15, 0),
      new THREE.Vector3(-0.15, 0.68, -0.38),
      new THREE.Vector3(-0.25, 1.15, -0.58),
      new THREE.Vector3(-0.32, 1.42, -0.68),
    ],
    [
      new THREE.Vector3(0, -0.15, 0),
      new THREE.Vector3(0.28, 0.72, -0.25),
      new THREE.Vector3(0.48, 1.18, -0.38),
      new THREE.Vector3(0.58, 1.45, -0.45),
    ],
  ];

  filamentConfigs.forEach((pts) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.007, 6, false), brassMat);
    wire.castShadow = true;
    group.add(wire);

    const tip = pts[pts.length - 1];

    // Mini multi-petal filigree cup
    const cup = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.05, 6, 1, true), brassMat);
    cup.position.copy(tip);
    cup.rotation.x = Math.PI;
    group.add(cup);

    // Luster freshwater pearl bud
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 16), pearlMat);
    pearl.position.copy(tip).add(new THREE.Vector3(0, 0.035, 0));
    pearl.castShadow = true;
    group.add(pearl);
  });

  return group;
}
