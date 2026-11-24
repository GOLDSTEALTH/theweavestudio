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
  const targetCamPos = useRef(new THREE.Vector3(0, 1.15, 3.4));
  const targetCamLook = useRef(new THREE.Vector3(0, 0.72, 0));

  // Dynamic colors with luminance lifting for dark palettes
  const currPrimaryCol = useRef(liftYarnAlbedo(palette.primaryHex));
  const currSecondaryCol = useRef(liftYarnAlbedo(palette.secondaryHex));
  const targetPrimaryCol = useRef(liftYarnAlbedo(palette.primaryHex));
  const targetSecondaryCol = useRef(liftYarnAlbedo(palette.secondaryHex));

  // Materials and swappable groups
  const primaryMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const secondaryMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const vesselGroupRef = useRef<Record<string, THREE.Group>>({});
  const accentGroupRef = useRef<Record<string, THREE.Group>>({});
  const bouquetRootRef = useRef<THREE.Group | null>(null);

  // 1. Update target colors without re-mounting WebGL
  useEffect(() => {
    targetPrimaryCol.current.copy(liftYarnAlbedo(palette.primaryHex));
    targetSecondaryCol.current.copy(liftYarnAlbedo(palette.secondaryHex));
  }, [palette.primaryHex, palette.secondaryHex]);

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
        targetCamPos.current.set(0, 1.15, 3.4);
        targetCamLook.current.set(0, 0.72, 0);
        break;
      case "MACRO":
        targetCamPos.current.set(-0.32, 1.05, 1.35);
        targetCamLook.current.set(-0.05, 0.95, 0.15);
        break;
      case "CROWN":
        targetCamPos.current.set(0, 3.2, 0.75);
        targetCamLook.current.set(0, 0.85, 0);
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
    const newDist = Math.max(1.2, Math.min(4.8, dist + delta));
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
      scene.environmentIntensity = 0.55;

      // 4. Studio Cyclorama Backdrop (soft radial glow behind the bouquet)
      const backdropCanvas = document.createElement("canvas");
      backdropCanvas.width = 512;
      backdropCanvas.height = 512;
      const bCtx = backdropCanvas.getContext("2d");
      if (bCtx) {
        const bGrad = bCtx.createRadialGradient(256, 256, 40, 256, 256, 256);
        bGrad.addColorStop(0, "#191921");
        bGrad.addColorStop(0.5, "#111116");
        bGrad.addColorStop(1, "#0A0A0B");
        bCtx.fillStyle = bGrad;
        bCtx.fillRect(0, 0, 512, 512);
      }
      const backdropTexture = new THREE.CanvasTexture(backdropCanvas);
      backdropTexture.colorSpace = THREE.SRGBColorSpace;
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
      backdropMesh.position.set(0, -0.5, -2);
      scene.add(backdropMesh);

      // 5. Physically Calibrated Studio Lighting
      const hemiLight = new THREE.HemisphereLight(0xeae4d8, 0x18171c, 0.9);
      scene.add(hemiLight);

      // Key Spotlight
      const keyLight = new THREE.SpotLight(0xfff6e8, 42);
      keyLight.position.set(2.8, 4.6, 3.6);
      keyLight.angle = Math.PI / 4;
      keyLight.penumbra = 0.85;
      keyLight.decay = 2;
      keyLight.distance = 14;
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      scene.add(keyLight);
      scene.add(keyLight.target);
      keyLight.target.position.set(0, 0.75, 0);

      // Cool Editorial Fill Light
      const fillLight = new THREE.DirectionalLight(0xc7d4e5, 1.1);
      fillLight.position.set(-3.5, 2.2, 1.8);
      scene.add(fillLight);

      // Champagne Back-Rim Light
      const rimLight = new THREE.SpotLight(0xdfc18a, 36);
      rimLight.position.set(-0.6, 3.2, -3.4);
      rimLight.penumbra = 0.9;
      rimLight.decay = 2;
      rimLight.distance = 12;
      scene.add(rimLight);
      rimLight.target.position.set(0, 0.8, 0);
      scene.add(rimLight.target);

      // Under-Bloom Soft Warm Bounce
      const underBounce = new THREE.PointLight(0xf3e8d4, 3.5, 5, 2);
      underBounce.position.set(0, 0.2, 1.6);
      scene.add(underBounce);

      // 6. Grounded Plinth & Pedestal
      const plinthGroup = new THREE.Group();
      plinthGroup.position.set(0, 0, 0);

      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0x141418,
        roughness: 0.78,
        metalness: 0.1,
      });
      createdMaterials.push(plinthMat);

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

      // 8. Bouquet Root Group (cleanly grounded on top of the plinth)
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
      tul2Position: tulip2.position.set(0.32, 1.12, -0.18);
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

        // Smooth delta-time color lerping
        currPrimaryCol.current.lerp(targetPrimaryCol.current, damping);
        currSecondaryCol.current.lerp(targetSecondaryCol.current, damping);

        if (primaryMatRef.current) {
          primaryMatRef.current.color.copy(currPrimaryCol.current);
        }
        if (secondaryMatRef.current) {
          secondaryMatRef.current.color.copy(currSecondaryCol.current);
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

      {/* Non-Floral Silhouette Badge Warning */}
      {!isBotanical && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="px-3 py-1.5 bg-[#0A0A0B]/90 border border-[#C6A972]/30 backdrop-blur-md">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C6A972]">
              LIVE FIBER &amp; PALETTE PREVIEW ON BOTANICAL STUDY
            </span>
          </div>
        </div>
      )}

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
            onClick={() => handleZoom(-0.5)}
            className="p-1.5 text-[#9A968E] hover:text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(0.5)}
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
          <span>PBR TACTILE SIMULATION</span>
        </div>
      </div>
    </div>
  );
}
