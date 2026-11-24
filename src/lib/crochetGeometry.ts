import * as THREE from "three";

/**
 * Creates a parametric, organically sculpted crocheted petal geometry
 * with double-layered thickness, natural cupping curvature, spoon concavity,
 * picot edge undulation, clean UVs, smooth vertex normals, and baked vertex AO colors.
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
    width = 0.35,
    length = 0.42,
    cuppingDepth = 0.20,
    spoonDepth = 0.14,
    reflexAmount = 0.08,
    thickness = 0.018,
    segmentsU = 14,
    segmentsV = 18,
  } = opts;

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
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
      const picot = Math.sin(u * Math.PI * 6) * 0.012 * Math.pow(v, 2);
      const z = cupZ + reflexZ + spoonZ + picot;

      positions.push(x, y, z + thickness * 0.5);
      uvs.push(u, v);

      // Baked Ambient Occlusion (0.32 in deep inner petal bowl -> 1.0 at curled rim/tips)
      const ao = Math.min(1.0, Math.max(0.32, 0.32 + 0.68 * (Math.pow(v, 0.72) + 0.18 * Math.abs(uNorm))));
      colors.push(ao, ao, ao);
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
      const picot = Math.sin(u * Math.PI * 6) * 0.012 * Math.pow(v, 2);
      const z = cupZ + reflexZ + spoonZ + picot;

      positions.push(x, y, z - thickness * 0.5);
      uvs.push(u, v);

      // Back surface receives slightly more light on outer side
      const ao = Math.min(1.0, Math.max(0.42, 0.42 + 0.58 * (Math.pow(v, 0.7) + 0.15 * Math.abs(uNorm))));
      colors.push(ao, ao, ao);
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
  geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a parametric curved crocheted leaf geometry with a raised midrib
 * and subtle crochet edge picot texture, plus baked AO vertex colors.
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
    width = 0.28,
    length = 0.65,
    curvature = 0.16,
    thickness = 0.016,
    segmentsU = 10,
    segmentsV = 16,
  } = opts;

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
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
      const midribZ = (1 - Math.abs(uNorm)) * 0.028 * Math.sin(v * Math.PI);
      const picot = Math.sin(u * Math.PI * 4) * 0.008 * Math.sin(v * Math.PI);
      const z = curveZ + midribZ + picot;

      positions.push(x, y, z + thickness * 0.5);
      uvs.push(u, v);

      const ao = Math.min(1.0, Math.max(0.38, 0.38 + 0.62 * (Math.pow(v, 0.68) + 0.16 * Math.abs(uNorm))));
      colors.push(ao, ao, ao);
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
      const midribZ = -(1 - Math.abs(uNorm)) * 0.018 * Math.sin(v * Math.PI);
      const picot = Math.sin(u * Math.PI * 4) * 0.008 * Math.sin(v * Math.PI);
      const z = curveZ + midribZ + picot;

      positions.push(x, y, z - thickness * 0.5);
      uvs.push(u, v);

      const ao = Math.min(1.0, Math.max(0.42, 0.42 + 0.58 * (Math.pow(v, 0.68) + 0.16 * Math.abs(uNorm))));
      colors.push(ao, ao, ao);
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
  geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Builds a multi-layered hero crocheted rose using golden-angle phyllotaxis
 * across 4 progressive tiers (22 petals total) + a 5-sepal green calyx.
 * Fully calibrated to realistic flower proportions and YXZ rotation order.
 */
export function buildCrochetRose(
  primaryMat: THREE.Material,
  secondaryMat: THREE.Material,
  calyxMat: THREE.Material,
  seed = 0
): THREE.Group {
  const roseGroup = new THREE.Group();

  // Tier 1 bud petal: 0.17 x 0.24
  const budPetalGeom = createSculptedPetalGeometry({
    width: 0.17,
    length: 0.24,
    cuppingDepth: 0.28,
    spoonDepth: 0.18,
    reflexAmount: 0.02,
    thickness: 0.015,
  });

  // Tier 2 inner petal: 0.24 x 0.31
  const innerPetalGeom = createSculptedPetalGeometry({
    width: 0.24,
    length: 0.31,
    cuppingDepth: 0.24,
    spoonDepth: 0.15,
    reflexAmount: 0.04,
    thickness: 0.016,
  });

  // Tier 3 mid petal: 0.31 x 0.38
  const midPetalGeom = createSculptedPetalGeometry({
    width: 0.31,
    length: 0.38,
    cuppingDepth: 0.20,
    spoonDepth: 0.14,
    reflexAmount: 0.08,
    thickness: 0.018,
  });

  // Tier 4 outer petal: 0.38 x 0.44
  const outerPetalGeom = createSculptedPetalGeometry({
    width: 0.38,
    length: 0.44,
    cuppingDepth: 0.16,
    spoonDepth: 0.12,
    reflexAmount: 0.12,
    thickness: 0.020,
  });

  // Center bud core knot
  const coreKnotGeom = new THREE.SphereGeometry(0.06, 12, 10);
  coreKnotGeom.scale(1, 1.3, 0.9);
  const coreMesh = new THREE.Mesh(coreKnotGeom, secondaryMat);
  coreMesh.position.y = 0.07;
  coreMesh.castShadow = true;
  coreMesh.receiveShadow = true;
  roseGroup.add(coreMesh);

  // Tier 1: 4 petals at radius 0.03
  const tier1Count = 4;
  for (let i = 0; i < tier1Count; i++) {
    const angle = i * ((Math.PI * 2) / tier1Count) + seed * 0.4;
    const petal = new THREE.Mesh(budPetalGeom, secondaryMat);
    petal.position.set(Math.cos(angle) * 0.03, 0.04, Math.sin(angle) * 0.03);
    petal.rotation.order = "YXZ";
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.18;
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Tier 2: 5 petals at radius 0.06
  const tier2Count = 5;
  const goldenAngle = 2.39996;
  for (let i = 0; i < tier2Count; i++) {
    const angle = i * goldenAngle + seed;
    const petal = new THREE.Mesh(innerPetalGeom, primaryMat);
    petal.position.set(Math.cos(angle) * 0.06, 0.05, Math.sin(angle) * 0.06);
    petal.rotation.order = "YXZ";
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.38;
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Tier 3: 6 petals at radius 0.10
  const tier3Count = 6;
  for (let i = 0; i < tier3Count; i++) {
    const angle = i * ((Math.PI * 2) / tier3Count) + seed * 0.7 + 0.35;
    const petal = new THREE.Mesh(midPetalGeom, primaryMat);
    petal.position.set(Math.cos(angle) * 0.10, 0.05, Math.sin(angle) * 0.10);
    petal.rotation.order = "YXZ";
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.72;
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Tier 4: 7 petals at radius 0.145
  const tier4Count = 7;
  for (let i = 0; i < tier4Count; i++) {
    const angle = i * ((Math.PI * 2) / tier4Count) + seed * 1.1 + 0.18;
    const petal = new THREE.Mesh(outerPetalGeom, primaryMat);
    petal.position.set(Math.cos(angle) * 0.145, 0.04, Math.sin(angle) * 0.145);
    petal.rotation.order = "YXZ";
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 1.05;
    petal.castShadow = true;
    petal.receiveShadow = true;
    roseGroup.add(petal);
  }

  // Green Crocheted Calyx
  const sepalGeom = createSculptedLeafGeometry({
    width: 0.10,
    length: 0.22,
    curvature: 0.10,
    thickness: 0.014,
  });

  const calyxBaseGeom = new THREE.CylinderGeometry(0.08, 0.04, 0.09, 10);
  const calyxBase = new THREE.Mesh(calyxBaseGeom, calyxMat);
  calyxBase.position.y = -0.04;
  calyxBase.castShadow = true;
  calyxBase.receiveShadow = true;
  roseGroup.add(calyxBase);

  for (let i = 0; i < 5; i++) {
    const angle = i * ((Math.PI * 2) / 5) + 0.25;
    const sepal = new THREE.Mesh(sepalGeom, calyxMat);
    sepal.position.set(Math.cos(angle) * 0.07, -0.02, Math.sin(angle) * 0.07);
    sepal.rotation.order = "YXZ";
    sepal.rotation.y = -angle + Math.PI / 2;
    sepal.rotation.x = 1.75;
    sepal.castShadow = true;
    sepal.receiveShadow = true;
    roseGroup.add(sepal);
  }

  return roseGroup;
}

/**
 * Builds a sculpted crocheted tulip / ranunculus with 6 cupped overlapping petals (0.26 x 0.44),
 * cuppingDepth 0.22 at radii 0.05 & 0.08, stamen center, and green calyx.
 */
export function buildCrochetTulip(
  bloomMat: THREE.Material,
  stamenMat: THREE.Material,
  calyxMat: THREE.Material,
  seed = 0
): THREE.Group {
  const tulipGroup = new THREE.Group();

  const tulipPetalGeom = createSculptedPetalGeometry({
    width: 0.26,
    length: 0.44,
    cuppingDepth: 0.22,
    spoonDepth: 0.16,
    reflexAmount: 0.04,
    thickness: 0.018,
  });

  // Stamen cluster
  const stamenGroup = new THREE.Group();
  const stamenCoreGeom = new THREE.SphereGeometry(0.028, 8, 8);
  for (let s = 0; s < 5; s++) {
    const sAng = s * ((Math.PI * 2) / 5);
    const knot = new THREE.Mesh(stamenCoreGeom, stamenMat);
    knot.position.set(Math.cos(sAng) * 0.025, 0.16 + (s % 2) * 0.02, Math.sin(sAng) * 0.025);
    knot.castShadow = true;
    knot.receiveShadow = true;
    stamenGroup.add(knot);
  }
  const centralPistil = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.16, 8), calyxMat);
  centralPistil.position.y = 0.09;
  centralPistil.castShadow = true;
  centralPistil.receiveShadow = true;
  stamenGroup.add(centralPistil);
  tulipGroup.add(stamenGroup);

  // Inner tier: 3 cupped petals at radius 0.05
  for (let i = 0; i < 3; i++) {
    const angle = i * ((Math.PI * 2) / 3) + seed;
    const petal = new THREE.Mesh(tulipPetalGeom, bloomMat);
    petal.position.set(Math.cos(angle) * 0.05, 0.04, Math.sin(angle) * 0.05);
    petal.rotation.order = "YXZ";
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.22;
    petal.castShadow = true;
    petal.receiveShadow = true;
    tulipGroup.add(petal);
  }

  // Outer tier: 3 staggered petals at radius 0.08
  for (let i = 0; i < 3; i++) {
    const angle = i * ((Math.PI * 2) / 3) + seed + Math.PI / 3;
    const petal = new THREE.Mesh(tulipPetalGeom, bloomMat);
    petal.position.set(Math.cos(angle) * 0.08, 0.03, Math.sin(angle) * 0.08);
    petal.rotation.order = "YXZ";
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.35;
    petal.castShadow = true;
    petal.receiveShadow = true;
    tulipGroup.add(petal);
  }

  // Calyx base
  const calyxMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.03, 0.08, 8), calyxMat);
  calyxMesh.position.y = -0.03;
  calyxMesh.castShadow = true;
  calyxMesh.receiveShadow = true;
  tulipGroup.add(calyxMesh);

  return tulipGroup;
}

/**
 * Builds a micro-crochet bud with 3 tightly spiraled mini sculpted crochet petals
 * inside 3 calyx sepals (replacing the previous ConeGeometry).
 */
export function buildCrochetBud(
  bloomMat: THREE.Material,
  calyxMat: THREE.Material
): THREE.Group {
  const budGroup = new THREE.Group();

  const miniPetalGeom = createSculptedPetalGeometry({
    width: 0.14,
    length: 0.22,
    cuppingDepth: 0.25,
    spoonDepth: 0.16,
    reflexAmount: 0.02,
    thickness: 0.014,
  });

  const sepalGeom = createSculptedLeafGeometry({
    width: 0.09,
    length: 0.22,
    curvature: 0.08,
    thickness: 0.013,
  });

  // 3 tightly spiraled mini sculpted petals
  for (let i = 0; i < 3; i++) {
    const angle = i * ((Math.PI * 2) / 3);
    const petal = new THREE.Mesh(miniPetalGeom, bloomMat);
    petal.position.set(Math.cos(angle) * 0.025, 0.03, Math.sin(angle) * 0.025);
    petal.rotation.order = "YXZ";
    petal.rotation.y = -angle + Math.PI / 2;
    petal.rotation.x = 0.12;
    petal.castShadow = true;
    petal.receiveShadow = true;
    budGroup.add(petal);
  }

  // 3 protective calyx sepals
  for (let i = 0; i < 3; i++) {
    const angle = i * ((Math.PI * 2) / 3) + 0.35;
    const sepal = new THREE.Mesh(sepalGeom, calyxMat);
    sepal.position.set(Math.cos(angle) * 0.04, 0.02, Math.sin(angle) * 0.04);
    sepal.rotation.order = "YXZ";
    sepal.rotation.y = -angle + Math.PI / 2;
    sepal.rotation.x = 0.18;
    sepal.castShadow = true;
    sepal.receiveShadow = true;
    budGroup.add(sepal);
  }

  // Small calyx stem connector
  const baseGeom = new THREE.CylinderGeometry(0.04, 0.02, 0.06, 8);
  const baseMesh = new THREE.Mesh(baseGeom, calyxMat);
  baseMesh.position.y = -0.02;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  budGroup.add(baseMesh);

  return budGroup;
}

/**
 * Builds the Blackened Stoneware Vessel anchored flush at local y = 0.0
 * rising to y = 1.05 with recessed brushed collar at y = 0.72.
 */
export function buildStonewareVessel(
  ceramicMat: THREE.Material,
  brassMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  // Hollow double-walled profile anchored at y = 0.0 to 1.05
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0, 0.0),
    new THREE.Vector2(0.38, 0.0),      // base floor
    new THREE.Vector2(0.44, 0.16),
    new THREE.Vector2(0.48, 0.42),     // belly
    new THREE.Vector2(0.44, 0.72),
    new THREE.Vector2(0.38, 0.94),     // neck
    new THREE.Vector2(0.41, 1.05),     // lip outer
    new THREE.Vector2(0.35, 1.05),     // lip inner
    new THREE.Vector2(0.32, 0.92),     // inner cavity
    new THREE.Vector2(0.37, 0.70),
    new THREE.Vector2(0.40, 0.42),
    new THREE.Vector2(0.34, 0.18),
    new THREE.Vector2(0.24, 0.06),     // bottom of inner cavity
    new THREE.Vector2(0, 0.06),
  ];

  const bodyGeom = new THREE.LatheGeometry(points, 36);
  const bodyMesh = new THREE.Mesh(bodyGeom, ceramicMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  group.add(bodyMesh);

  // Recessed brushed hairline inlay ring around neck
  const collarGeom = new THREE.CylinderGeometry(0.422, 0.422, 0.024, 36, 1, true);
  const collarMesh = new THREE.Mesh(collarGeom, brassMat);
  collarMesh.position.y = 0.72;
  collarMesh.castShadow = true;
  collarMesh.receiveShadow = true;
  group.add(collarMesh);

  return group;
}

/**
 * Builds the Sculpted Linen Wrap anchored flush at local y = 0.0
 * with 5 overlapping fanned sheets and tied satin ribbon bow.
 */
export function buildLinenWrap(
  linenMat: THREE.Material,
  ribbonMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  const height = 1.05;
  for (let i = 0; i < 5; i++) {
    const angle = (i - 2) * 0.45 - Math.PI / 2;
    const sheetGeom = new THREE.CylinderGeometry(
      0.54 + (i % 2) * 0.03,
      0.22,
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
        const wave = Math.sin(p * 0.8) * 0.022 * factor;
        pos.setX(p, pos.getX(p) + wave);
        pos.setZ(p, pos.getZ(p) + wave * 0.7);
      }
    }
    sheetGeom.computeVertexNormals();

    const sheetMesh = new THREE.Mesh(sheetGeom, linenMat);
    sheetMesh.position.set(0, height * 0.5, 0); // anchored so bottom touches y = 0.0
    sheetMesh.castShadow = true;
    sheetMesh.receiveShadow = true;
    group.add(sheetMesh);
  }

  // Tied satin ribbon bow and draped tails at gathered waist (y = 0.35)
  const waistCuffGeom = new THREE.TorusGeometry(0.23, 0.03, 12, 32);
  waistCuffGeom.rotateX(Math.PI / 2);
  const waistCuff = new THREE.Mesh(waistCuffGeom, ribbonMat);
  waistCuff.position.set(0, 0.35, 0);
  waistCuff.castShadow = true;
  waistCuff.receiveShadow = true;
  group.add(waistCuff);

  // Bow loops
  const bowLoopGeom = new THREE.TorusGeometry(0.08, 0.02, 10, 24);
  const loop1 = new THREE.Mesh(bowLoopGeom, ribbonMat);
  loop1.position.set(0.09, 0.35, 0.24);
  loop1.rotation.set(0.2, 0.4, 0.5);
  loop1.castShadow = true;
  loop1.receiveShadow = true;
  group.add(loop1);

  const loop2 = new THREE.Mesh(bowLoopGeom, ribbonMat);
  loop2.position.set(-0.09, 0.35, 0.24);
  loop2.rotation.set(0.2, -0.4, -0.5);
  loop2.castShadow = true;
  loop2.receiveShadow = true;
  group.add(loop2);

  // Bow knot
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.036, 10, 10), ribbonMat);
  knot.position.set(0, 0.35, 0.26);
  knot.castShadow = true;
  knot.receiveShadow = true;
  group.add(knot);

  // Draped trailing ribbon tails
  const tail1Curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.02, 0.34, 0.25),
    new THREE.Vector3(0.06, 0.20, 0.28),
    new THREE.Vector3(0.09, 0.04, 0.30),
  ]);
  const tail2Curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.02, 0.34, 0.25),
    new THREE.Vector3(-0.07, 0.19, 0.27),
    new THREE.Vector3(-0.11, 0.05, 0.29),
  ]);
  const tail1 = new THREE.Mesh(new THREE.TubeGeometry(tail1Curve, 14, 0.015, 8, false), ribbonMat);
  const tail2 = new THREE.Mesh(new THREE.TubeGeometry(tail2Curve, 14, 0.015, 8, false), ribbonMat);
  tail1.castShadow = true;
  tail1.receiveShadow = true;
  tail2.castShadow = true;
  tail2.receiveShadow = true;
  group.add(tail1);
  group.add(tail2);

  return group;
}

/**
 * Builds the Hand-Bound Stems + Patinated Brass Collar anchored at local y = 0.0.
 */
export function buildBrassCollar(
  brassMat: THREE.Material,
  gripMat: THREE.Material
): THREE.Group {
  const group = new THREE.Group();

  // Yarn-wrapped grip under cuff (height 0.48, from y = 0.0 to 0.48)
  const gripGeom = new THREE.CylinderGeometry(0.18, 0.15, 0.48, 24);
  const gripMesh = new THREE.Mesh(gripGeom, gripMat);
  gripMesh.position.y = 0.24;
  gripMesh.castShadow = true;
  gripMesh.receiveShadow = true;
  group.add(gripMesh);

  // Sculpted bevel-edged brass cuff
  const cuffPoints = [
    new THREE.Vector2(0.17, -0.15),
    new THREE.Vector2(0.20, -0.13),
    new THREE.Vector2(0.205, 0.0),
    new THREE.Vector2(0.20, 0.13),
    new THREE.Vector2(0.17, 0.15),
  ];
  const cuffGeom = new THREE.LatheGeometry(cuffPoints, 36);
  const cuffMesh = new THREE.Mesh(cuffGeom, brassMat);
  cuffMesh.position.y = 0.26;
  cuffMesh.castShadow = true;
  cuffMesh.receiveShadow = true;
  group.add(cuffMesh);

  // Fine horizontal brass wire bands
  const band1 = new THREE.Mesh(new THREE.TorusGeometry(0.208, 0.007, 8, 36), brassMat);
  band1.position.y = 0.31;
  band1.rotation.x = Math.PI / 2;
  band1.castShadow = true;
  band1.receiveShadow = true;
  group.add(band1);

  const band2 = new THREE.Mesh(new THREE.TorusGeometry(0.208, 0.007, 8, 36), brassMat);
  band2.position.y = 0.21;
  band2.rotation.x = Math.PI / 2;
  band2.castShadow = true;
  band2.receiveShadow = true;
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
    width: 0.18,
    length: 0.24,
    curvature: 0.14,
    thickness: 0.015,
  });

  const stemConfigs = [
    {
      curve: [
        new THREE.Vector3(0, 0.65, 0),
        new THREE.Vector3(0.38, 1.15, 0.22),
        new THREE.Vector3(0.68, 1.62, 0.32),
        new THREE.Vector3(0.85, 2.05, 0.38),
      ],
      pairs: 4,
    },
    {
      curve: [
        new THREE.Vector3(0, 0.65, 0),
        new THREE.Vector3(-0.42, 1.12, -0.15),
        new THREE.Vector3(-0.72, 1.55, -0.24),
        new THREE.Vector3(-0.95, 1.95, -0.30),
      ],
      pairs: 4,
    },
    {
      curve: [
        new THREE.Vector3(0, 0.65, 0),
        new THREE.Vector3(0.10, 1.25, -0.38),
        new THREE.Vector3(0.18, 1.72, -0.65),
        new THREE.Vector3(0.24, 2.15, -0.82),
      ],
      pairs: 3,
    },
  ];

  stemConfigs.forEach((cfg) => {
    const curve = new THREE.CatmullRomCurve3(cfg.curve);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.010, 8, false), wireMat);
    tube.castShadow = true;
    tube.receiveShadow = true;
    group.add(tube);

    for (let p = 1; p <= cfg.pairs; p++) {
      const t = p / (cfg.pairs + 0.5);
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const scale = 1.0 - t * 0.35;

      // Left leaf
      const leftLeaf = new THREE.Mesh(leafGeom, foliageMat);
      leftLeaf.position.copy(point);
      leftLeaf.scale.set(scale, scale, scale);
      leftLeaf.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      leftLeaf.rotateZ(0.3);
      leftLeaf.castShadow = true;
      leftLeaf.receiveShadow = true;
      group.add(leftLeaf);

      // Right leaf
      const rightLeaf = new THREE.Mesh(leafGeom, foliageMat);
      rightLeaf.position.copy(point);
      rightLeaf.scale.set(scale, scale, scale);
      rightLeaf.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal.clone().negate());
      rightLeaf.rotateZ(-0.3);
      rightLeaf.castShadow = true;
      rightLeaf.receiveShadow = true;
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
      new THREE.Vector3(0, 0.75, 0),
      new THREE.Vector3(0.28, 1.25, 0.28),
      new THREE.Vector3(0.55, 1.65, 0.42),
      new THREE.Vector3(0.68, 1.95, 0.48),
    ],
    [
      new THREE.Vector3(0, 0.75, 0),
      new THREE.Vector3(-0.30, 1.32, 0.24),
      new THREE.Vector3(-0.52, 1.75, 0.32),
      new THREE.Vector3(-0.60, 2.05, 0.36),
    ],
    [
      new THREE.Vector3(0, 0.75, 0),
      new THREE.Vector3(-0.12, 1.38, -0.32),
      new THREE.Vector3(-0.20, 1.85, -0.50),
      new THREE.Vector3(-0.26, 2.12, -0.58),
    ],
    [
      new THREE.Vector3(0, 0.75, 0),
      new THREE.Vector3(0.24, 1.42, -0.20),
      new THREE.Vector3(0.42, 1.88, -0.32),
      new THREE.Vector3(0.50, 2.15, -0.38),
    ],
  ];

  filamentConfigs.forEach((pts) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.006, 6, false), brassMat);
    wire.castShadow = true;
    wire.receiveShadow = true;
    group.add(wire);

    const tip = pts[pts.length - 1];

    // Mini multi-petal filigree cup
    const cup = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.045, 6, 1, true), brassMat);
    cup.position.copy(tip);
    cup.rotation.x = Math.PI;
    cup.castShadow = true;
    cup.receiveShadow = true;
    group.add(cup);

    // Luster freshwater pearl bud
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.036, 16, 16), pearlMat);
    pearl.position.copy(tip).add(new THREE.Vector3(0, 0.030, 0));
    pearl.castShadow = true;
    pearl.receiveShadow = true;
    group.add(pearl);
  });

  return group;
}
