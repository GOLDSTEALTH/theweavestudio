"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import {
  createCrochetTextureSet,
  createLinenWrapTexture,
  createContactShadowTexture,
  getFiberPBRParams,
  liftYarnAlbedo,
  CrochetTextureSet,
} from "@/lib/crochetTextures";
import {
  buildCrochetRose,
  buildCrochetTulip,
  buildCrochetBud,
  createSculptedLeafGeometry,
  buildStonewareVessel,
  buildLinenWrap,
  buildBrassCollar,
  buildEucalyptusSprigs,
  buildChampagneFilaments,
} from "@/lib/crochetGeometry";
import { ColorPalette, TactileFiber, BespokeVessel, BespokeAccent } from "@/data/atelier";

interface BespokeBouquet3DProps {
  palette: ColorPalette;
  fiber: TactileFiber;
  vessel: BespokeVessel;
  accent: BespokeAccent;
  isBotanical?: boolean;
}

type CameraPreset = "STUDIO" | "MACRO" | "CROWN";

function renderBackdropCanvas(
  canvas: HTMLCanvasElement,
  centerHex: string,
  edgeHex: string,
  floorHex: string
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Outer studio vignette
  ctx.fillStyle = edgeHex;
  ctx.fillRect(0, 0, 512, 512);

  // Soft radial studio spotlight glow behind bouquet
  const radGrad = ctx.createRadialGradient(256, 220, 25, 256, 220, 270);
  radGrad.addColorStop(0, centerHex);
  radGrad.addColorStop(0.55, centerHex + "B3");
  radGrad.addColorStop(1, edgeHex);
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 512, 512);

  // Studio plinth floor reflection
  const floorGrad = ctx.createLinearGradient(0, 360, 0, 512);
  floorGrad.addColorStop(0, "rgba(0,0,0,0)");
  floorGrad.addColorStop(1, floorHex);
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 360, 512, 152);
}

export default function BespokeBouquet3D({
  palette,
  fiber,
  vessel,
  accent,
  isBotanical = true,
}: BespokeBouquet3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoOrbit, setIsAutoOrbit] = useState(false);
  const [activePreset, setActivePreset] = useState<CameraPreset>("STUDIO");
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // References for live lerping and controls
  const animFrameRef = useRef<number | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isTransitioningCameraRef = useRef(false);
  const isUserInteractingRef = useRef(false);

  // Centered architectural camera framing
  const targetCamPos = useRef(new THREE.Vector3(0, 1.05, 3.1));
  const targetCamLook = useRef(new THREE.Vector3(0, 0.82, 0));

  // Dynamic yarn colors with luminance lifting for dark palettes
  const currPrimaryCol = useRef(liftYarnAlbedo(palette.primaryHex));
  const currSecondaryCol = useRef(liftYarnAlbedo(palette.secondaryHex));
  const targetPrimaryCol = useRef(liftYarnAlbedo(palette.primaryHex));
  const targetSecondaryCol = useRef(liftYarnAlbedo(palette.secondaryHex));

  // Palette-reactive lighting & stage theme target references
  const st = palette.stageTheme;
  const targetKeyLightCol = useRef(new THREE.Color(st.keyLightHex));
  const targetKeyIntensity = useRef(st.keyIntensity);
  const targetFillLightCol = useRef(new THREE.Color(st.fillLightHex));
  const targetFillIntensity = useRef(st.fillIntensity);
  const targetRimLightCol = useRef(new THREE.Color(st.rimLightHex));
  const targetRimIntensity = useRef(st.rimIntensity);
  const targetHemiSkyCol = useRef(new THREE.Color(st.hemiSkyHex));
  const targetHemiGroundCol = useRef(new THREE.Color(st.hemiGroundHex));
  const targetHemiIntensity = useRef(st.hemiIntensity);
  const targetEnvIntensity = useRef(st.envIntensity);
  const targetPlinthCol = useRef(new THREE.Color(st.plinthHex));

  // Reactive cyclorama backdrop colors
  const currBgCenterCol = useRef(new THREE.Color(st.bgCenterHex));
  const currBgEdgeCol = useRef(new THREE.Color(st.bgEdgeHex));
  const currBgFloorCol = useRef(new THREE.Color(st.bgFloorHex));
  const targetBgCenterCol = useRef(new THREE.Color(st.bgCenterHex));
  const targetBgEdgeCol = useRef(new THREE.Color(st.bgEdgeHex));
  const targetBgFloorCol = useRef(new THREE.Color(st.bgFloorHex));

  // Scene object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.SpotLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const plinthMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const backdropCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backdropTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Materials and swappable groups
  const primaryMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const secondaryMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const vesselGroupRef = useRef<Record<string, THREE.Group>>({});
  const accentGroupRef = useRef<Record<string, THREE.Group>>({});
  const bouquetRootRef = useRef<THREE.Group | null>(null);

  // 1. Update target colors & stage lighting theme when palette changes
  useEffect(() => {
    targetPrimaryCol.current.copy(liftYarnAlbedo(palette.primaryHex));
    targetSecondaryCol.current.copy(liftYarnAlbedo(palette.secondaryHex));

    const theme = palette.stageTheme;
    targetKeyLightCol.current.set(theme.keyLightHex);
    targetKeyIntensity.current = theme.keyIntensity;
    targetFillLightCol.current.set(theme.fillLightHex);
    targetFillIntensity.current = theme.fillIntensity;
    targetRimLightCol.current.set(theme.rimLightHex);
    targetRimIntensity.current = theme.rimIntensity;
    targetHemiSkyCol.current.set(theme.hemiSkyHex);
    targetHemiGroundCol.current.set(theme.hemiGroundHex);
    targetHemiIntensity.current = theme.hemiIntensity;
    targetEnvIntensity.current = theme.envIntensity;
    targetPlinthCol.current.set(theme.plinthHex);
    targetBgCenterCol.current.set(theme.bgCenterHex);
    targetBgEdgeCol.current.set(theme.bgEdgeHex);
    targetBgFloorCol.current.set(theme.bgFloorHex);
  }, [palette.primaryHex, palette.secondaryHex, palette.stageTheme]);

  // 2. Update fiber PBR material parameters dynamically
  useEffect(() => {
    const params = getFiberPBRParams(fiber.id);
    const updateMat = (mat: THREE.MeshPhysicalMaterial | null) => {
      if (!mat) return;
      mat.roughness = params.roughness;
      mat.metalness = params.metalness;
      mat.sheen = params.sheen;
      mat.sheenRoughness = params.sheenRoughness;
      mat.sheenColor.copy(params.sheenColor);
      mat.clearcoat = params.clearcoat;
      if (mat.normalScale) {
        mat.normalScale.copy(params.normalScale);
      }
      if (mat.map) {
        mat.map.repeat.set(params.textureRepeat, params.textureRepeat);
      }
      if (mat.normalMap) {
        mat.normalMap.repeat.set(params.textureRepeat, params.textureRepeat);
      }
      if (mat.roughnessMap) {
        mat.roughnessMap.repeat.set(params.textureRepeat, params.textureRepeat);
      }
      mat.needsUpdate = true;
    };
    updateMat(primaryMatRef.current);
    updateMat(secondaryMatRef.current);
  }, [fiber.id]);

  // 3. Update swappable accessories visibility dynamically
  useEffect(() => {
    Object.entries(vesselGroupRef.current).forEach(([id, grp]) => {
      grp.visible = id === vessel.id;
    });
  }, [vessel.id]);

  useEffect(() => {
    Object.entries(accentGroupRef.current).forEach(([id, grp]) => {
      grp.visible = id === accent.id;
    });
  }, [accent.id]);

  // 4. Update autoOrbit on controls without re-mounting
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoOrbit;
    }
  }, [isAutoOrbit]);

  // Camera presets: smooth camera glide with snapping prevention
  const applyPreset = useCallback((preset: CameraPreset) => {
    setActivePreset(preset);
    setIsAutoOrbit(false);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }

    switch (preset) {
      case "STUDIO":
        targetCamPos.current.set(0, 1.05, 3.1);
        targetCamLook.current.set(0, 0.82, 0);
        break;
      case "MACRO":
        targetCamPos.current.set(-0.28, 1.22, 1.22);
        targetCamLook.current.set(-0.02, 1.08, 0.14);
        break;
      case "CROWN":
        targetCamPos.current.set(0, 2.7, 1.55);
        targetCamLook.current.set(0, 0.95, 0);
        break;
    }
    isTransitioningCameraRef.current = true;
  }, []);

  const toggleAutoOrbit = () => {
    setIsAutoOrbit((prev) => !prev);
  };

  const handleZoom = (delta: number) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const dir = new THREE.Vector3().subVectors(
      cameraRef.current.position,
      controlsRef.current.target
    );
    const dist = dir.length();
    const newDist = Math.max(1.1, Math.min(4.5, dist + delta));
    dir.setLength(newDist);
    targetCamPos.current.copy(controlsRef.current.target).add(dir);
    targetCamLook.current.copy(controlsRef.current.target);
    isTransitioningCameraRef.current = true;
  };

  // Main Three.js Scene Setup (mounts ONCE only)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let isVisible = true;
    let pmremGenerator: THREE.PMREMGenerator | null = null;
    let envTargetTexture: THREE.Texture | null = null;

    const createdTextures: THREE.Texture[] = [];
    const createdMaterials: THREE.Material[] = [];
    const createdGeometries: THREE.BufferGeometry[] = [];

    try {
      // 1. Scene & Camera Setup
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(
        36,
        container.clientWidth / Math.max(container.clientHeight, 1),
        0.1,
        30
      );
      camera.position.copy(targetCamPos.current);
      cameraRef.current = camera;

      // 2. High-Fidelity WebGL Renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x0a0a0b, 1);
      container.appendChild(renderer.domElement);

      // 3. Procedural Studio Environment Map (RoomEnvironment)
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const roomEnv = new RoomEnvironment();
      envTargetTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
      scene.environment = envTargetTexture;
      scene.environmentIntensity = st.envIntensity;

      // 4. Palette-Reactive Studio Cyclorama Backdrop
      const backdropCanvas = document.createElement("canvas");
      backdropCanvas.width = 512;
      backdropCanvas.height = 512;
      renderBackdropCanvas(backdropCanvas, st.bgCenterHex, st.bgEdgeHex, st.bgFloorHex);
      backdropCanvasRef.current = backdropCanvas;

      const backdropTexture = new THREE.CanvasTexture(backdropCanvas);
      backdropTexture.colorSpace = THREE.SRGBColorSpace;
      backdropTextureRef.current = backdropTexture;
      createdTextures.push(backdropTexture);

      const backdropGeom = new THREE.SphereGeometry(14, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
      createdGeometries.push(backdropGeom);
      const backdropMat = new THREE.MeshBasicMaterial({
        map: backdropTexture,
        side: THREE.BackSide,
        depthWrite: false,
      });
      createdMaterials.push(backdropMat);
      const backdropMesh = new THREE.Mesh(backdropGeom, backdropMat);
      backdropMesh.position.set(0, -0.4, -2.5);
      scene.add(backdropMesh);

      // 5. Physically Calibrated Three-Point Raking Studio Lighting
      const hemiLight = new THREE.HemisphereLight(st.hemiSkyHex, st.hemiGroundHex, st.hemiIntensity);
      scene.add(hemiLight);
      hemiLightRef.current = hemiLight;

      // Side-Raking Directional Key Light (tight shadow frustum for razor-sharp micro-shadows)
      const keyLight = new THREE.DirectionalLight(st.keyLightHex, st.keyIntensity);
      keyLight.position.set(2.8, 4.4, 3.2);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(2048, 2048);
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 12;
      keyLight.shadow.camera.left = -1.6;
      keyLight.shadow.camera.right = 1.6;
      keyLight.shadow.camera.top = 2.4;
      keyLight.shadow.camera.bottom = -0.6;
      keyLight.shadow.bias = -0.0004;
      keyLight.shadow.normalBias = 0.025;
      scene.add(keyLight);
      keyLightRef.current = keyLight;

      // Cool Editorial Fill Light (kept low to preserve deep inter-petal contrast)
      const fillLight = new THREE.DirectionalLight(st.fillLightHex, st.fillIntensity);
      fillLight.position.set(-3.5, 2.0, 1.8);
      scene.add(fillLight);
      fillLightRef.current = fillLight;

      // Crisp Back-Rim Spotlight (silhouette halo)
      const rimLight = new THREE.SpotLight(st.rimLightHex, st.rimIntensity);
      rimLight.position.set(-0.8, 3.6, -3.2);
      rimLight.angle = Math.PI / 3;
      rimLight.penumbra = 0.85;
      rimLight.decay = 2;
      rimLight.distance = 12;
      scene.add(rimLight);
      rimLight.target.position.set(0, 0.9, 0);
      scene.add(rimLight.target);
      rimLightRef.current = rimLight;

      // Subtle under-bloom soft bounce
      const underBounce = new THREE.PointLight(0xf3e8d4, 0.6, 4, 2);
      underBounce.position.set(0, 0.25, 1.4);
      scene.add(underBounce);

      // 6. Grounded Plinth & Pedestal
      const plinthGroup = new THREE.Group();
      plinthGroup.position.set(0, 0, 0);

      const plinthMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(st.plinthHex),
        roughness: 0.78,
        metalness: 0.1,
      });
      createdMaterials.push(plinthMat);
      plinthMatRef.current = plinthMat;

      const brassRingMat = new THREE.MeshStandardMaterial({
        color: 0xc6a972,
        roughness: 0.25,
        metalness: 0.9,
      });
      createdMaterials.push(brassRingMat);

      // Two-tier slate pedestal
      const lowerBaseGeom = new THREE.CylinderGeometry(1.65, 1.72, 0.12, 48);
      createdGeometries.push(lowerBaseGeom);
      const lowerBase = new THREE.Mesh(lowerBaseGeom, plinthMat);
      lowerBase.position.y = -0.06;
      lowerBase.receiveShadow = true;
      plinthGroup.add(lowerBase);

      const upperPedestalGeom = new THREE.CylinderGeometry(1.22, 1.28, 0.16, 48);
      createdGeometries.push(upperPedestalGeom);
      const upperPedestal = new THREE.Mesh(upperPedestalGeom, plinthMat);
      upperPedestal.position.y = 0.08;
      upperPedestal.receiveShadow = true;
      plinthGroup.add(upperPedestal);

      // Brushed champagne hairline inlay ring
      const ringGeom = new THREE.TorusGeometry(1.23, 0.009, 12, 64);
      ringGeom.rotateX(Math.PI / 2);
      createdGeometries.push(ringGeom);
      const hairlineRing = new THREE.Mesh(ringGeom, brassRingMat);
      hairlineRing.position.y = 0.16;
      hairlineRing.receiveShadow = true;
      plinthGroup.add(hairlineRing);

      // Contact Shadow Decal
      const shadowTex = createContactShadowTexture(256);
      if (shadowTex) {
        createdTextures.push(shadowTex);
        const shadowGeom = new THREE.PlaneGeometry(1.35, 1.35);
        shadowGeom.rotateX(-Math.PI / 2);
        createdGeometries.push(shadowGeom);
        const shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        });
        createdMaterials.push(shadowMat);
        const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
        shadowMesh.position.y = 0.162;
        plinthGroup.add(shadowMesh);
      }
      scene.add(plinthGroup);

      // 7. Procedural Crochet Yarn PBR Materials
      const textures: CrochetTextureSet | null = createCrochetTextureSet(512);
      if (textures) {
        createdTextures.push(textures.albedoMap, textures.normalMap, textures.roughnessMap);
      }

      const initialFiberParams = getFiberPBRParams(fiber.id);

      const createYarnMat = (initialColor: THREE.Color) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: initialColor,
          roughness: initialFiberParams.roughness,
          metalness: initialFiberParams.metalness,
          sheen: initialFiberParams.sheen,
          sheenRoughness: initialFiberParams.sheenRoughness,
          sheenColor: initialFiberParams.sheenColor,
          clearcoat: initialFiberParams.clearcoat,
        });
        if (textures) {
          mat.map = textures.albedoMap;
          mat.normalMap = textures.normalMap;
          mat.normalScale.copy(initialFiberParams.normalScale);
          mat.roughnessMap = textures.roughnessMap;
          mat.map.repeat.set(initialFiberParams.textureRepeat, initialFiberParams.textureRepeat);
          mat.normalMap.repeat.set(initialFiberParams.textureRepeat, initialFiberParams.textureRepeat);
          mat.roughnessMap.repeat.set(initialFiberParams.textureRepeat, initialFiberParams.textureRepeat);
        }
        createdMaterials.push(mat);
        return mat;
      };

      const primaryMat = createYarnMat(currPrimaryCol.current);
      const secondaryMat = createYarnMat(currSecondaryCol.current);
      primaryMatRef.current = primaryMat;
      secondaryMatRef.current = secondaryMat;

      // Sage green crocheted calyx & foliage material
      const foliageMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#414F44"),
        roughness: 0.86,
        metalness: 0.0,
        sheen: 0.65,
        sheenRoughness: 0.7,
        sheenColor: new THREE.Color("#56695B"),
      });
      if (textures) {
        foliageMat.map = textures.albedoMap;
        foliageMat.normalMap = textures.normalMap;
        foliageMat.normalScale.set(0.9, 0.9);
        foliageMat.roughnessMap = textures.roughnessMap;
        foliageMat.map.repeat.set(5, 5);
      }
      createdMaterials.push(foliageMat);

      // Stamen French-knot material (deep warm amber/espresso)
      const stamenMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#6A4E2B"),
        roughness: 0.92,
        metalness: 0.0,
        sheen: 0.8,
        sheenRoughness: 0.75,
      });
      createdMaterials.push(stamenMat);

      // Ceramic stoneware vessel material
      const ceramicMat = new THREE.MeshStandardMaterial({
        color: 0x161619,
        roughness: 0.84,
        metalness: 0.05,
      });
      createdMaterials.push(ceramicMat);

      // Brushed champagne brass collar material
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xc6a972,
        roughness: 0.28,
        metalness: 0.88,
      });
      createdMaterials.push(brassMat);

      // Pleated Belgian linen wrap material
      const linenTex = createLinenWrapTexture(512);
      if (linenTex) createdTextures.push(linenTex);
      const linenMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#E2DDD2"),
        map: linenTex || undefined,
        roughness: 0.88,
        metalness: 0.0,
        sheen: 0.5,
        sheenRoughness: 0.75,
        sheenColor: new THREE.Color("#FAF6EE"),
      });
      createdMaterials.push(linenMat);

      // Satin ribbon material
      const ribbonMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#C6A972"),
        roughness: 0.35,
        metalness: 0.2,
        sheen: 1.0,
        sheenRoughness: 0.45,
        sheenColor: new THREE.Color("#EFE2C2"),
      });
      createdMaterials.push(ribbonMat);

      // Freshwater pearl bud material
      const pearlMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#FAF6EE"),
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 0.85,
        clearcoatRoughness: 0.15,
        iridescence: 0.55,
        iridescenceIOR: 1.3,
      });
      createdMaterials.push(pearlMat);

      // 8. Bouquet Root Group (grounded on top of the plinth)
      const bouquetRoot = new THREE.Group();
      bouquetRoot.position.set(0, 0.42, 0);
      bouquetRootRef.current = bouquetRoot;
      scene.add(bouquetRoot);

      // 9. Sculptural Crocheted Floral Arrangement
      const flowersGroup = new THREE.Group();

      // Three Hero Crocheted Roses
      const rose1 = buildCrochetRose(primaryMat, secondaryMat, foliageMat, 0.1);
      rose1.position.set(0, 0.98, 0.12);
      rose1.rotation.set(0.15, -0.2, 0.05);
      rose1.scale.set(1.05, 1.05, 1.05);
      flowersGroup.add(rose1);

      const rose2 = buildCrochetRose(primaryMat, secondaryMat, foliageMat, 0.4);
      rose2.position.set(-0.38, 0.78, 0.22);
      rose2.rotation.set(0.35, -0.45, -0.2);
      rose2.scale.set(0.95, 0.95, 0.95);
      flowersGroup.add(rose2);

      const rose3 = buildCrochetRose(primaryMat, secondaryMat, foliageMat, 0.7);
      rose3.position.set(0.42, 0.85, 0.08);
      rose3.rotation.set(0.25, 0.55, 0.15);
      rose3.scale.set(0.98, 0.98, 0.98);
      flowersGroup.add(rose3);

      // Three Crocheted Tulips / Ranunculus
      const tulip1 = buildCrochetTulip(secondaryMat, stamenMat, foliageMat, 0.2);
      tulip1.position.set(-0.35, 1.18, -0.22);
      tulip1.rotation.set(-0.15, -0.3, -0.15);
      tulip1.scale.set(0.92, 0.92, 0.92);
      flowersGroup.add(tulip1);

      const tulip2 = buildCrochetTulip(secondaryMat, stamenMat, foliageMat, 0.6);
      tulip2.position.set(0.32, 1.12, -0.18);
      tulip2.rotation.set(-0.12, 0.4, 0.1);
      tulip2.scale.set(0.94, 0.94, 0.94);
      flowersGroup.add(tulip2);

      const tulip3 = buildCrochetTulip(primaryMat, stamenMat, foliageMat, 0.9);
      tulip3.position.set(0.08, 0.68, 0.38);
      tulip3.rotation.set(0.48, 0.12, -0.05);
      tulip3.scale.set(0.88, 0.88, 0.88);
      flowersGroup.add(tulip3);

      // Three Micro-Crochet Accent Buds
      const bud1 = buildCrochetBud(secondaryMat, foliageMat);
      bud1.position.set(-0.55, 1.38, 0.05);
      bud1.rotation.set(0.2, -0.3, 0.3);
      bud1.scale.set(0.8, 0.8, 0.8);
      flowersGroup.add(bud1);

      const bud2 = buildCrochetBud(secondaryMat, foliageMat);
      bud2.position.set(0.58, 1.42, -0.08);
      bud2.rotation.set(-0.15, 0.35, -0.28);
      bud2.scale.set(0.82, 0.82, 0.82);
      flowersGroup.add(bud2);

      const bud3 = buildCrochetBud(primaryMat, foliageMat);
      bud3.position.set(-0.05, 1.48, -0.32);
      bud3.rotation.set(-0.35, 0.1, 0.05);
      bud3.scale.set(0.85, 0.85, 0.85);
      flowersGroup.add(bud3);

      // Eight Pointed veined crochet leaves around collar & flowers
      const leafGeom = createSculptedLeafGeometry({
        width: 0.36,
        length: 0.82,
        curvature: 0.22,
        thickness: 0.02,
      });
      createdGeometries.push(leafGeom);

      const leafConfigs = [
        { pos: [-0.45, 0.55, 0.28], rot: [0.65, -0.6, -0.4], s: 1.0 },
        { pos: [0.48, 0.58, 0.22], rot: [0.55, 0.7, 0.3], s: 0.95 },
        { pos: [-0.22, 0.48, 0.42], rot: [0.85, -0.2, -0.15], s: 0.9 },
        { pos: [0.25, 0.46, 0.44], rot: [0.8, 0.3, 0.12], s: 0.92 },
        { pos: [-0.52, 0.92, -0.15], rot: [0.1, -1.1, -0.2], s: 0.85 },
        { pos: [0.55, 0.95, -0.12], rot: [0.15, 1.05, 0.22], s: 0.88 },
        { pos: [-0.15, 1.15, -0.38], rot: [-0.4, -0.3, 0.1], s: 0.82 },
        { pos: [0.2, 1.18, -0.35], rot: [-0.35, 0.4, -0.12], s: 0.84 },
      ];

      leafConfigs.forEach((cfg) => {
        const leafMesh = new THREE.Mesh(leafGeom, foliageMat);
        leafMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
        leafMesh.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
        leafMesh.scale.set(cfg.s, cfg.s, cfg.s);
        leafMesh.castShadow = true;
        leafMesh.receiveShadow = true;
        flowersGroup.add(leafMesh);
      });

      // Natural Catmull-Rom tube stems converging down into vessel
      const stemPointsList = [
        [new THREE.Vector3(0, 0.95, 0.12), new THREE.Vector3(0.02, 0.45, 0.05), new THREE.Vector3(0, -0.25, 0)],
        [new THREE.Vector3(-0.38, 0.75, 0.22), new THREE.Vector3(-0.15, 0.35, 0.1), new THREE.Vector3(0, -0.25, 0)],
        [new THREE.Vector3(0.42, 0.82, 0.08), new THREE.Vector3(0.18, 0.38, 0.05), new THREE.Vector3(0, -0.25, 0)],
        [new THREE.Vector3(-0.35, 1.15, -0.22), new THREE.Vector3(-0.12, 0.52, -0.08), new THREE.Vector3(0, -0.25, 0)],
        [new THREE.Vector3(0.32, 1.08, -0.18), new THREE.Vector3(0.12, 0.48, -0.06), new THREE.Vector3(0, -0.25, 0)],
      ];

      stemPointsList.forEach((pts) => {
        const curve = new THREE.CatmullRomCurve3(pts);
        const tubeGeom = new THREE.TubeGeometry(curve, 18, 0.028, 8, false);
        createdGeometries.push(tubeGeom);
        const tubeMesh = new THREE.Mesh(tubeGeom, foliageMat);
        tubeMesh.castShadow = true;
        tubeMesh.receiveShadow = true;
        flowersGroup.add(tubeMesh);
      });

      bouquetRoot.add(flowersGroup);

      // 10. Swappable Vessels (inside bouquetRoot)
      const stonewareGrp = buildStonewareVessel(ceramicMat, brassMat);
      stonewareGrp.position.set(0, 0.18, 0);
      stonewareGrp.visible = vessel.id === "stoneware-vessel";
      bouquetRoot.add(stonewareGrp);
      vesselGroupRef.current["stoneware-vessel"] = stonewareGrp;

      const linenGrp = buildLinenWrap(linenMat, ribbonMat);
      linenGrp.position.set(0, 0.42, 0);
      linenGrp.visible = vessel.id === "linen-wrap";
      bouquetRoot.add(linenGrp);
      vesselGroupRef.current["linen-wrap"] = linenGrp;

      const brassGrp = buildBrassCollar(brassMat, foliageMat);
      brassGrp.position.set(0, 0.32, 0);
      brassGrp.visible = vessel.id === "brass-collar";
      bouquetRoot.add(brassGrp);
      vesselGroupRef.current["brass-collar"] = brassGrp;

      // 11. Swappable Accents (inside bouquetRoot)
      const eucaGrp = buildEucalyptusSprigs(foliageMat, foliageMat);
      eucaGrp.visible = accent.id === "eucalyptus-sprigs";
      bouquetRoot.add(eucaGrp);
      accentGroupRef.current["eucalyptus-sprigs"] = eucaGrp;

      const filamentGrp = buildChampagneFilaments(brassMat, pearlMat);
      filamentGrp.visible = accent.id === "champagne-filaments";
      bouquetRoot.add(filamentGrp);
      accentGroupRef.current["champagne-filaments"] = filamentGrp;

      const pureGrp = new THREE.Group();
      pureGrp.visible = accent.id === "pure-blooms";
      bouquetRoot.add(pureGrp);
      accentGroupRef.current["pure-blooms"] = pureGrp;

      // 12. Non-Intrusive Orbit Controls (NO wheel zoom trapping)
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false; // Page scrolling is preserved
      controls.autoRotate = isAutoOrbit;
      controls.autoRotateSpeed = 1.0;
      controls.minPolarAngle = Math.PI * 0.15;
      controls.maxPolarAngle = Math.PI * 0.52; // Prevents viewing beneath the plinth
      controls.target.copy(targetCamLook.current);
      controlsRef.current = controls;

      controls.addEventListener("start", () => {
        isUserInteractingRef.current = true;
        isTransitioningCameraRef.current = false;
        setIsInteracting(true);
      });

      controls.addEventListener("end", () => {
        isUserInteractingRef.current = false;
        setIsInteracting(false);
      });

      // ResizeObserver
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: w, height: h } = entry.contentRect;
          if (w > 0 && h > 0) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
          }
        }
      });
      resizeObserver.observe(container);

      // IntersectionObserver for off-screen GPU pausing
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(container);

      // 13. Animation Loop with delta time damping for 60Hz/120Hz/180Hz parity
      let lastTime = performance.now();

      function animate(now: number) {
        animFrameRef.current = requestAnimationFrame(animate);

        if (!isVisible) {
          lastTime = now;
          return;
        }

        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        const damping = 1 - Math.exp(-6 * dt);

        // Smooth delta-time yarn color lerping
        currPrimaryCol.current.lerp(targetPrimaryCol.current, damping);
        currSecondaryCol.current.lerp(targetSecondaryCol.current, damping);

        if (primaryMatRef.current) {
          primaryMatRef.current.color.copy(currPrimaryCol.current);
        }
        if (secondaryMatRef.current) {
          secondaryMatRef.current.color.copy(currSecondaryCol.current);
        }

        // Palette-reactive lighting lerp
        if (keyLightRef.current) {
          keyLightRef.current.color.lerp(targetKeyLightCol.current, damping);
          keyLightRef.current.intensity = THREE.MathUtils.lerp(
            keyLightRef.current.intensity,
            targetKeyIntensity.current,
            damping
          );
        }
        if (fillLightRef.current) {
          fillLightRef.current.color.lerp(targetFillLightCol.current, damping);
          fillLightRef.current.intensity = THREE.MathUtils.lerp(
            fillLightRef.current.intensity,
            targetFillIntensity.current,
            damping
          );
        }
        if (rimLightRef.current) {
          rimLightRef.current.color.lerp(targetRimLightCol.current, damping);
          rimLightRef.current.intensity = THREE.MathUtils.lerp(
            rimLightRef.current.intensity,
            targetRimIntensity.current,
            damping
          );
        }
        if (hemiLightRef.current) {
          hemiLightRef.current.color.lerp(targetHemiSkyCol.current, damping);
          hemiLightRef.current.groundColor.lerp(targetHemiGroundCol.current, damping);
          hemiLightRef.current.intensity = THREE.MathUtils.lerp(
            hemiLightRef.current.intensity,
            targetHemiIntensity.current,
            damping
          );
        }
        if (sceneRef.current) {
          sceneRef.current.environmentIntensity = THREE.MathUtils.lerp(
            sceneRef.current.environmentIntensity,
            targetEnvIntensity.current,
            damping
          );
        }
        if (plinthMatRef.current) {
          plinthMatRef.current.color.lerp(targetPlinthCol.current, damping);
        }

        // Palette-reactive cyclorama backdrop lerp
        const cCenter = currBgCenterCol.current;
        const tCenter = targetBgCenterCol.current;
        const cEdge = currBgEdgeCol.current;
        const tEdge = targetBgEdgeCol.current;
        const bgDiff =
          Math.abs(cCenter.r - tCenter.r) +
          Math.abs(cCenter.g - tCenter.g) +
          Math.abs(cCenter.b - tCenter.b) +
          Math.abs(cEdge.r - tEdge.r) +
          Math.abs(cEdge.g - tEdge.g) +
          Math.abs(cEdge.b - tEdge.b);

        if (bgDiff > 0.003) {
          currBgCenterCol.current.lerp(targetBgCenterCol.current, damping * 1.5);
          currBgEdgeCol.current.lerp(targetBgEdgeCol.current, damping * 1.5);
          currBgFloorCol.current.lerp(targetBgFloorCol.current, damping * 1.5);

          if (backdropCanvasRef.current && backdropTextureRef.current) {
            renderBackdropCanvas(
              backdropCanvasRef.current,
              "#" + currBgCenterCol.current.getHexString(),
              "#" + currBgEdgeCol.current.getHexString(),
              "#" + currBgFloorCol.current.getHexString()
            );
            backdropTextureRef.current.needsUpdate = true;
          }
        }

        // Camera lerping ONLY when a preset or zoom button is transitioning
        if (isTransitioningCameraRef.current && !isUserInteractingRef.current) {
          camera.position.lerp(targetCamPos.current, damping * 1.5);
          controls.target.lerp(targetCamLook.current, damping * 1.5);
          if (camera.position.distanceTo(targetCamPos.current) < 0.015) {
            isTransitioningCameraRef.current = false;
          }
        }

        controls.update();
        renderer.render(scene, camera);
      }

      animFrameRef.current = requestAnimationFrame(animate);

      // 14. Cleanup
      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        controls.dispose();

        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else if (obj.material) {
              obj.material.dispose();
            }
          }
        });

        createdGeometries.forEach((g) => g.dispose());
        createdMaterials.forEach((m) => m.dispose());
        createdTextures.forEach((t) => t.dispose());

        if (envTargetTexture) envTargetTexture.dispose();
        if (pmremGenerator) pmremGenerator.dispose();

        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      setHasWebGLError(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Mounts once only!

  if (hasWebGLError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0D0D0F] p-8 text-center border border-white/10">
        <div className="space-y-4 max-w-md">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C6A972]">
            BESPOKE STAGE
          </span>
          <h4 className="font-serif text-2xl text-[#F4F1EA]">
            3D Studio Preview Fallback
          </h4>
          <p className="font-sans text-xs text-[#9A968E] leading-relaxed">
            WebGL acceleration is restricted on this client. Your bespoke selections continue to update the live Commission Dossier ledger below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#0A0A0B]">
      {/* Three.js Canvas Mount Container */}
      <div
        ref={mountRef}
        className={`w-full h-full ${
          isInteracting ? "cursor-grabbing" : "cursor-grab"
        }`}
      />

      {/* Atmospheric Gallery Tag & Non-Floral Silhouette Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-2">
        <div className="px-3 py-1.5 bg-[#0A0A0B]/90 border border-white/10 backdrop-blur-md">
          <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#C6A972] font-medium">
            ATMOSPHERE: {palette.stageTheme.atmosphereLabel}
          </span>
        </div>

        {!isBotanical && (
          <div className="px-3 py-1.5 bg-[#0A0A0B]/90 border border-[#C6A972]/30 backdrop-blur-md">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C6A972]">
              LIVE FIBER &amp; PALETTE PREVIEW ON BOTANICAL STUDY
            </span>
          </div>
        )}
      </div>

      {/* Camera Presets & HUD Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1 bg-[#0A0A0B]/85 backdrop-blur-md border border-white/10">
          <button
            onClick={() => applyPreset("STUDIO")}
            className={`px-2.5 py-1 font-sans text-[9px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
              activePreset === "STUDIO"
                ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                : "text-[#9A968E] hover:text-[#F4F1EA]"
            }`}
            title="Studio Overall View"
          >
            STUDIO
          </button>
          <button
            onClick={() => applyPreset("MACRO")}
            className={`px-2.5 py-1 font-sans text-[9px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
              activePreset === "MACRO"
                ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                : "text-[#9A968E] hover:text-[#F4F1EA]"
            }`}
            title="Macro Stitch Inspection"
          >
            MACRO
          </button>
          <button
            onClick={() => applyPreset("CROWN")}
            className={`px-2.5 py-1 font-sans text-[9px] tracking-[0.2em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
              activePreset === "CROWN"
                ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                : "text-[#9A968E] hover:text-[#F4F1EA]"
            }`}
            title="Crown Elevation View"
          >
            CROWN
          </button>
        </div>

        {/* Orbit & Zoom Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0A0A0B]/85 backdrop-blur-md border border-white/10">
          <button
            onClick={toggleAutoOrbit}
            className={`p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
              isAutoOrbit
                ? "bg-[#C6A972] text-[#0A0A0B]"
                : "text-[#9A968E] hover:text-[#F4F1EA]"
            }`}
            title={isAutoOrbit ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
            aria-label="Toggle Auto-Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(-0.4)}
            className="p-1.5 text-[#9A968E] hover:text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(0.4)}
            className="p-1.5 text-[#9A968E] hover:text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle Studio Provenance Stamp */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-2 text-[9px] font-sans tracking-[0.25em] uppercase text-[#9A968E]/60">
          <span>HYDERABAD STUDIO STAGE</span>
          <span>&bull;</span>
          <span>REACTIVE LIGHTING ENGINE</span>
        </div>
      </div>
    </div>
  );
}
