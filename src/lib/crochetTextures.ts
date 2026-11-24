import * as THREE from "three";

export interface FiberPBRParams {
  roughness: number;
  metalness: number;
  sheen: number;
  sheenRoughness: number;
  sheenColor: THREE.Color;
  normalScale: THREE.Vector2;
  clearcoat: number;
  textureRepeat: number;
}

export function getFiberPBRParams(fiberId: string): FiberPBRParams {
  switch (fiberId) {
    case "giza-cotton":
      return {
        roughness: 0.84,
        metalness: 0.0,
        sheen: 0.55,
        sheenRoughness: 0.65,
        sheenColor: new THREE.Color("#FAF6EE"),
        normalScale: new THREE.Vector2(0.85, 0.85),
        clearcoat: 0.0,
        textureRepeat: 5.5,
      };
    case "belgian-linen-silk":
      return {
        roughness: 0.88,
        metalness: 0.0,
        sheen: 0.75,
        sheenRoughness: 0.7,
        sheenColor: new THREE.Color("#F4EFE6"),
        normalScale: new THREE.Vector2(1.0, 1.0),
        clearcoat: 0.0,
        textureRepeat: 4.8,
      };
    case "himalayan-merino":
      return {
        roughness: 0.98,
        metalness: 0.0,
        sheen: 1.0,
        sheenRoughness: 0.85,
        sheenColor: new THREE.Color("#F8F3EA"),
        normalScale: new THREE.Vector2(1.35, 1.35),
        clearcoat: 0.0,
        textureRepeat: 3.8,
      };
    case "japanese-paper-yarn":
    default:
      return {
        roughness: 0.92,
        metalness: 0.0,
        sheen: 0.35,
        sheenRoughness: 0.75,
        sheenColor: new THREE.Color("#EDE8DC"),
        normalScale: new THREE.Vector2(0.9, 0.9),
        clearcoat: 0.0,
        textureRepeat: 5.2,
      };
  }
}

/**
 * Ensures ultra-dark swatches (like #0A0A0B) retain luminous textile presence
 * in 3D studio light with visible stitch depth rather than crushing to flat black.
 */
export function liftYarnAlbedo(hex: string): THREE.Color {
  const col = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  col.getHSL(hsl);
  if (hsl.l < 0.16) {
    hsl.l = 0.16;
    hsl.s = Math.max(hsl.s, 0.08);
    col.setHSL(hsl.h, hsl.s, hsl.l);
  }
  return col;
}

export interface CrochetTextureSet {
  albedoMap: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
}

/**
 * Creates 3 coordinated seamless tileable PBR crochet maps:
 * 1. albedoMap: Grayscale stitch cavity and AO map (SRGBColorSpace)
 * 2. normalMap: Tangent-space normal map computed from a procedural stitch heightfield via Sobel filter
 * 3. roughnessMap: Physically correct roughness (crevices bright/rough, yarn ridges soft diffuse)
 */
export function createCrochetTextureSet(size = 512): CrochetTextureSet | null {
  if (typeof document === "undefined") return null;

  const stitchCols = 16;
  const stitchRows = 24;
  const cellW = size / stitchCols;
  const cellH = size / stitchRows;

  // 1. Generate Heightmap on an offscreen canvas
  const heightCanvas = document.createElement("canvas");
  heightCanvas.width = size;
  heightCanvas.height = size;
  const hCtx = heightCanvas.getContext("2d");
  if (!hCtx) return null;

  hCtx.fillStyle = "#202020";
  hCtx.fillRect(0, 0, size, size);

  for (let r = -1; r <= stitchRows + 1; r++) {
    const y = r * cellH;
    const isOdd = Math.abs(r) % 2 === 1;
    const xOffset = isOdd ? cellW * 0.5 : 0;

    for (let c = -2; c <= stitchCols + 2; c++) {
      const x = c * cellW + xOffset;

      hCtx.save();
      hCtx.translate(x, y);

      // Left branch of interlocking V-stitch
      const gradL = hCtx.createLinearGradient(0, 0, cellW * 0.5, cellH);
      gradL.addColorStop(0, "rgba(220, 220, 220, 0.95)");
      gradL.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
      gradL.addColorStop(1, "rgba(40, 40, 40, 0.8)");

      hCtx.strokeStyle = gradL;
      hCtx.lineWidth = cellW * 0.38;
      hCtx.lineCap = "round";
      hCtx.beginPath();
      hCtx.moveTo(0, 0);
      hCtx.quadraticCurveTo(cellW * 0.12, cellH * 0.65, cellW * 0.5, cellH);
      hCtx.stroke();

      // Right branch of interlocking V-stitch
      const gradR = hCtx.createLinearGradient(cellW, 0, cellW * 0.5, cellH);
      gradR.addColorStop(0, "rgba(200, 200, 200, 0.95)");
      gradR.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
      gradR.addColorStop(1, "rgba(35, 35, 35, 0.85)");

      hCtx.strokeStyle = gradR;
      hCtx.lineWidth = cellW * 0.35;
      hCtx.beginPath();
      hCtx.moveTo(cellW, 0);
      hCtx.quadraticCurveTo(cellW * 0.88, cellH * 0.65, cellW * 0.5, cellH);
      hCtx.stroke();

      // 3-ply twisted cord striations
      hCtx.lineWidth = 1.2;
      hCtx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      for (let s = -2; s <= 2; s++) {
        hCtx.beginPath();
        hCtx.moveTo(cellW * 0.5 + s * 2.2, 2);
        hCtx.lineTo(cellW * 0.5 + s * 2.2, cellH - 2);
        hCtx.stroke();
      }

      hCtx.restore();
    }
  }

  const heightImgData = hCtx.getImageData(0, 0, size, size);
  const hData = heightImgData.data;

  // Helper to read height with periodic wrap
  const getH = (x: number, y: number) => {
    const px = ((x % size) + size) % size;
    const py = ((y % size) + size) % size;
    return hData[(py * size + px) * 4] / 255;
  };

  // 2. Build Albedo / Cavity Map (Grayscale AO + fiber highlight)
  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = size;
  albedoCanvas.height = size;
  const aCtx = albedoCanvas.getContext("2d");
  if (!aCtx) return null;
  const aImgData = aCtx.createImageData(size, size);
  const aData = aImgData.data;

  // 3. Build Tangent-Space Normal Map via Sobel filter
  const normalCanvas = document.createElement("canvas");
  normalCanvas.width = size;
  normalCanvas.height = size;
  const nCtx = normalCanvas.getContext("2d");
  if (!nCtx) return null;
  const nImgData = nCtx.createImageData(size, size);
  const nData = nImgData.data;

  // 4. Build Roughness Map (crevices rough 245-255, crests diffuse 190-225)
  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext("2d");
  if (!rCtx) return null;
  const rImgData = rCtx.createImageData(size, size);
  const rData = rImgData.data;

  const normalStrength = 2.4;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const h = getH(x, y);

      // --- Albedo / AO Cavity ---
      // Valley crevices: 125-145 (AO shadowing), midtones: 185-215, crests: 250-255
      // Add subtle deterministic micro-fiber speckle noise
      const speckle = ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1) * 10 - 5;
      const albedoVal = Math.max(120, Math.min(255, Math.round(125 + h * 130 + speckle)));
      aData[idx] = albedoVal;
      aData[idx + 1] = albedoVal;
      aData[idx + 2] = albedoVal;
      aData[idx + 3] = 255;

      // --- Sobel Normal Filter ---
      const tl = getH(x - 1, y - 1);
      const t = getH(x, y - 1);
      const tr = getH(x + 1, y - 1);
      const l = getH(x - 1, y);
      const r = getH(x + 1, y);
      const bl = getH(x - 1, y + 1);
      const b = getH(x, y + 1);
      const br = getH(x + 1, y + 1);

      const dx = (tr + 2 * r + br - (tl + 2 * l + bl)) * normalStrength;
      const dy = (bl + 2 * b + br - (tl + 2 * t + tr)) * normalStrength;
      const dz = 1.0;

      const len = Math.hypot(dx, dy, dz);
      const nx = -dx / len;
      const ny = -dy / len;
      const nz = dz / len;

      nData[idx] = Math.round((nx * 0.5 + 0.5) * 255);
      nData[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      nData[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      nData[idx + 3] = 255;

      // --- Roughness Map ---
      // In crevices (low h), roughness is high (245-255 = dead matte).
      // On loop crests (high h), roughness is 195-220 (soft diffuse sheen).
      const roughVal = Math.round(250 - h * 45);
      rData[idx] = roughVal;
      rData[idx + 1] = roughVal;
      rData[idx + 2] = roughVal;
      rData[idx + 3] = 255;
    }
  }

  aCtx.putImageData(aImgData, 0, 0);
  nCtx.putImageData(nImgData, 0, 0);
  rCtx.putImageData(rImgData, 0, 0);

  const albedoTexture = new THREE.CanvasTexture(albedoCanvas);
  albedoTexture.colorSpace = THREE.SRGBColorSpace;
  albedoTexture.wrapS = THREE.RepeatWrapping;
  albedoTexture.wrapT = THREE.RepeatWrapping;
  albedoTexture.generateMipmaps = true;
  albedoTexture.needsUpdate = true;

  const normalTexture = new THREE.CanvasTexture(normalCanvas);
  normalTexture.colorSpace = THREE.NoColorSpace;
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.generateMipmaps = true;
  normalTexture.needsUpdate = true;

  const roughnessTexture = new THREE.CanvasTexture(roughCanvas);
  roughnessTexture.colorSpace = THREE.NoColorSpace;
  roughnessTexture.wrapS = THREE.RepeatWrapping;
  roughnessTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.generateMipmaps = true;
  roughnessTexture.needsUpdate = true;

  return {
    albedoMap: albedoTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
  };
}

/**
 * Procedural Pleated Belgian Linen Wrap Texture
 */
export function createLinenWrapTexture(size = 512): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#D6CFC3";
  ctx.fillRect(0, 0, size, size);

  // Vertical pleats
  const pleatWidth = size / 32;
  for (let x = 0; x < size; x += pleatWidth) {
    const grad = ctx.createLinearGradient(x, 0, x + pleatWidth, 0);
    grad.addColorStop(0, "rgba(250, 246, 238, 0.45)");
    grad.addColorStop(0.5, "rgba(150, 140, 128, 0.4)");
    grad.addColorStop(1, "rgba(220, 210, 200, 0.25)");
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, pleatWidth, size);
  }

  // Cross slub flax threads
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1;
  for (let y = 0; y < size; y += 4) {
    if (Math.sin(y * 43.12) > 0.1) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural Contact Shadow Decal Texture for Plinth
 */
export function createContactShadowTexture(size = 256): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const center = size / 2;
  const grad = ctx.createRadialGradient(center, center, size * 0.05, center, center, size * 0.48);
  grad.addColorStop(0, "rgba(0, 0, 0, 0.88)");
  grad.addColorStop(0.4, "rgba(0, 0, 0, 0.55)");
  grad.addColorStop(0.75, "rgba(0, 0, 0, 0.18)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
