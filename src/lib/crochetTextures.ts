import * as THREE from "three";

export interface FiberPBRParams {
  roughness: number;
  metalness: number;
  sheen: number;
  sheenRoughness: number;
  sheenColor: THREE.Color;
  bumpScale: number;
  clearcoat: number;
  textureRepeat: number;
}

export function getFiberPBRParams(fiberId: string): FiberPBRParams {
  switch (fiberId) {
    case "giza-cotton":
      return {
        roughness: 0.62,
        metalness: 0.04,
        sheen: 0.45,
        sheenRoughness: 0.35,
        sheenColor: new THREE.Color("#FAF6EE"),
        bumpScale: 0.045,
        clearcoat: 0.08,
        textureRepeat: 8,
      };
    case "belgian-linen-silk":
      return {
        roughness: 0.72,
        metalness: 0.06,
        sheen: 0.65,
        sheenRoughness: 0.45,
        sheenColor: new THREE.Color("#EFEBE2"),
        bumpScale: 0.055,
        clearcoat: 0.04,
        textureRepeat: 6,
      };
    case "himalayan-merino":
      return {
        roughness: 0.94,
        metalness: 0.01,
        sheen: 0.85,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color("#F5EFE6"),
        bumpScale: 0.085,
        clearcoat: 0.0,
        textureRepeat: 4.5,
      };
    case "japanese-paper-yarn":
    default:
      return {
        roughness: 0.88,
        metalness: 0.02,
        sheen: 0.15,
        sheenRoughness: 0.25,
        sheenColor: new THREE.Color("#EDE8DC"),
        bumpScale: 0.065,
        clearcoat: 0.0,
        textureRepeat: 9,
      };
  }
}

/**
 * Procedural PBR Stitch Bump Map
 * Generates an interlocking herringbone/V-stitch relief matrix with micro-fiber twist.
 */
export function createCrochetBumpTexture(size = 512): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base neutral height
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  const stitchWidth = size / 16;
  const stitchHeight = size / 24;

  for (let y = 0; y < size; y += stitchHeight) {
    const isOddRow = Math.floor(y / stitchHeight) % 2 === 1;
    const xOffset = isOddRow ? stitchWidth / 2 : 0;

    for (let x = -stitchWidth; x < size + stitchWidth; x += stitchWidth) {
      const cx = x + xOffset;
      const cy = y;

      // Draw V-Stitch loops
      ctx.save();
      ctx.translate(cx, cy);

      // Left branch of V-stitch
      const gradLeft = ctx.createLinearGradient(0, 0, stitchWidth * 0.5, stitchHeight);
      gradLeft.addColorStop(0, "rgba(220, 220, 220, 0.9)");
      gradLeft.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
      gradLeft.addColorStop(1, "rgba(40, 40, 40, 0.7)");

      ctx.strokeStyle = gradLeft;
      ctx.lineWidth = stitchWidth * 0.35;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(stitchWidth * 0.15, stitchHeight * 0.7, stitchWidth * 0.5, stitchHeight);
      ctx.stroke();

      // Right branch of V-stitch
      const gradRight = ctx.createLinearGradient(stitchWidth, 0, stitchWidth * 0.5, stitchHeight);
      gradRight.addColorStop(0, "rgba(200, 200, 200, 0.9)");
      gradRight.addColorStop(0.5, "rgba(245, 245, 245, 1.0)");
      gradRight.addColorStop(1, "rgba(30, 30, 30, 0.8)");

      ctx.strokeStyle = gradRight;
      ctx.lineWidth = stitchWidth * 0.32;
      ctx.beginPath();
      ctx.moveTo(stitchWidth, 0);
      ctx.quadraticCurveTo(stitchWidth * 0.85, stitchHeight * 0.7, stitchWidth * 0.5, stitchHeight);
      ctx.stroke();

      // Micro-fiber yarn twist striations
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      for (let s = -2; s <= 2; s++) {
        ctx.beginPath();
        ctx.moveTo(stitchWidth * 0.5 + s * 2, 2);
        ctx.lineTo(stitchWidth * 0.5 + s * 2, stitchHeight - 2);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural Roughness Map
 * Darker/matte in crevice valleys, brighter on loop crests for anisotropic luster.
 */
export function createCrochetRoughnessTexture(size = 512): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base roughness
  ctx.fillStyle = "#A8A8A8";
  ctx.fillRect(0, 0, size, size);

  const stitchWidth = size / 16;
  const stitchHeight = size / 24;

  for (let y = 0; y < size; y += stitchHeight) {
    const isOddRow = Math.floor(y / stitchHeight) % 2 === 1;
    const xOffset = isOddRow ? stitchWidth / 2 : 0;

    for (let x = -stitchWidth; x < size + stitchWidth; x += stitchWidth) {
      const cx = x + xOffset;
      const cy = y;

      ctx.save();
      ctx.translate(cx, cy);

      // Crevice shadows (rougher/duller)
      ctx.strokeStyle = "rgba(40, 40, 40, 0.65)";
      ctx.lineWidth = stitchWidth * 0.45;
      ctx.beginPath();
      ctx.arc(stitchWidth * 0.5, stitchHeight * 0.5, stitchWidth * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      // Crests (smoother, higher spec sheen)
      ctx.strokeStyle = "rgba(240, 240, 240, 0.85)";
      ctx.lineWidth = stitchWidth * 0.2;
      ctx.beginPath();
      ctx.moveTo(stitchWidth * 0.2, 0);
      ctx.lineTo(stitchWidth * 0.5, stitchHeight * 0.8);
      ctx.stroke();

      ctx.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural Pleated Linen Wrap Texture
 */
export function createLinenWrapTexture(size = 512): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#CFC8BC";
  ctx.fillRect(0, 0, size, size);

  // Vertical pleats and horizontal slub threads
  const pleatWidth = size / 32;
  for (let x = 0; x < size; x += pleatWidth) {
    const grad = ctx.createLinearGradient(x, 0, x + pleatWidth, 0);
    grad.addColorStop(0, "rgba(245, 240, 230, 0.4)");
    grad.addColorStop(0.5, "rgba(160, 150, 138, 0.35)");
    grad.addColorStop(1, "rgba(215, 205, 195, 0.2)");
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, pleatWidth, size);
  }

  // Cross slub threads
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 1;
  for (let y = 0; y < size; y += 4) {
    if (Math.random() > 0.4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}
