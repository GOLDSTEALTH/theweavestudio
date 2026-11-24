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

const CYCLORAMA_VERTEX_SHADER = `
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const CYCLORAMA_FRAGMENT_SHADER = `
uniform vec3 uColorCenter;
uniform vec3 uColorEdge;
uniform vec3 uColorFloor;
varying vec3 vWorldPosition;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // Distance from center spotlight focused behind bouquet (0, 1.2)
  float dist = length(vWorldPosition.xy - vec2(0.0, 1.15)) / 12.5;
  float radial = smoothstep(0.05, 0.88, dist);

  vec3 wallColor = mix(uColorCenter, uColorEdge, radial);

  // Smooth transition to floor color beneath plinth level
  float floorFactor = smoothstep(0.35, -0.85, vWorldPosition.y);
  vec3 finalColor = mix(wallColor, uColorFloor, floorFactor * 0.82);

  // Micro-dithering noise to prevent 8-bit banding on dark gradient studio backdrops
  float dither = (hash(gl_FragCoord.xy) - 0.5) * (1.2 / 255.0);
  finalColor += dither;

  gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
`;

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

  // Recalibrated fov=34 camera framing: entire pedestal, vessel, and flowers sit comfortably framed
  const targetCamPos = useRef(new THREE.Vector3(0.35, 1.48, 5.35));
  const targetCamLook = useRef(new THREE.Vector3(0, 1.02, 0));

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

  // GLSL Cyclorama backdrop uniforms
  const cycloramaMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const targetBgCenterCol = useRef(new THREE.Color(st.bgCenterHex));
  const targetBgEdgeCol = useRef(new THREE.Color(st.bgEdgeHex));
  const targetBgFloorCol = useRef(new THREE.Color(st.bgFloorHex));

  // Scene object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const plinthMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

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

  // Camera presets: smooth camera glide with portrait aspect ratio compensation
  const applyPreset = useCallback((preset: CameraPreset) => {
    setActivePreset(preset);
    setIsAutoOrbit(false);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }

    const container = mountRef.current;
    const isPortrait = container && container.clientWidth / Math.max(container.clientHeight, 1) < 0.95;

    switch (preset) {
      case "STUDIO":
        targetCamPos.current.set(0.35, 1.48, isPortrait ? 6.15 : 5.35);
        targetCamLook.current.set(0, 1.02, 0);
        break;
      case "MACRO":
        targetCamPos.current.set(-0.55, 1.55, 2.25);
        targetCamLook.current.set(-0.05, 1.32, 0.15);
        break;
      case "CROWN":
        targetCamPos.current.set(0, 4.35, 1.35);
        targetCamLook.current.set(0, 1.15, 0);
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
    // Zoom clamp: min 1.8, max 7.5
    const newDist = Math.max(1.8, Math.min(7.5, dist + delta));
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
      // 1. Scene & Recalibrated fov=34 Camera Setup
      scene = new THREE.Scene();
      sceneRef.current = scene;

      const aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      if (aspect < 0.95) {
        targetCamPos.current.z = 6.15;
      }

      camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 35);
      camera.position.copy(targetCamPos.current);
      cameraRef.current = camera;

      // 2. High-Precision WebGL Renderer
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
      renderer.setClearColor(new THREE.Color(st.bgEdgeHex), 1);
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

      // 3. Procedural Studio Environment Map
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const roomEnv = new RoomEnvironment();
      envTargetTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
      scene.environment = envTargetTexture;
      scene.environmentIntensity = st.envIntensity;

      // 4. Palette-Reactive GLSL Studio Cyclorama (SphereGeometry 18, 32, 24 with micro-dithering)
      const cycloramaGeom = new THREE.SphereGeometry(18, 32, 24);
      createdGeometries.push(cycloramaGeom);

      const cycloramaMat = new THREE.ShaderMaterial({
        vertexShader: CYCLORAMA_VERTEX_SHADER,
        fragmentShader: CYCLORAMA_FRAGMENT_SHADER,
        uniforms: {
          uColorCenter: { value: new THREE.Color(st.bgCenterHex) },
          uColorEdge: { value: new THREE.Color(st.bgEdgeHex) },
          uColorFloor: { value: new THREE.Color(st.bgFloorHex) },
        },
        side: THREE.BackSide,
        depthWrite: false,
      });
      createdMaterials.push(cycloramaMat);
      cycloramaMatRef.current = cycloramaMat;

      const cycloramaMesh = new THREE.Mesh(cycloramaGeom, cycloramaMat);
      cycloramaMesh.position.set(0, 0, 0);
      scene.add(cycloramaMesh);

      // 5. Dramatic Side-Raking Shadows (High-precision Directional Key Light)
      const hemiLight = new THREE.HemisphereLight(st.hemiSkyHex, st.hemiGroundHex, st.hemiIntensity);
      scene.add(hemiLight);
      hemiLightRef.current = hemiLight;

      const keyLight = new THREE.DirectionalLight(st.keyLightHex, st.keyIntensity);
      keyLight.position.set(3.6, 3.1, 2.5);
      keyLight.target.position.set(0, 1.05, 0);
      scene.add(keyLight.target);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(2048, 2048);
      keyLight.shadow.camera.near = 1.0;
      keyLight.shadow.camera.far = 11.0;
      keyLight.shadow.camera.left = -2.0;
      keyLight.shadow.camera.right = 2.0;
      keyLight.shadow.camera.top = 2.4;
      keyLight.shadow.camera.bottom = -0.6;
      keyLight.shadow.bias = -0.00035;
      keyLight.shadow.normalBias = 0.004;
      keyLight.shadow.radius = 2.5;
      scene.add(keyLight);
      keyLightRef.current = keyLight;

      // Low opposite fill light to carve deep contrast
      const fillLight = new THREE.DirectionalLight(st.fillLightHex, st.fillIntensity);
      fillLight.position.set(-3.6, 1.8, 2.0);
      fillLight.target.position.set(0, 1.0, 0);
      scene.add(fillLight.target);
      scene.add(fillLight);
      fillLightRef.current = fillLight;

      // Strong back-left rim light for luminous fuzzy yarn edge separation
      const rimLight = new THREE.DirectionalLight(st.rimLightHex, st.rimIntensity);
      rimLight.position.set(-2.2, 3.0, -3.5);
      rimLight.target.position.set(0, 1.0, 0);
      scene.add(rimLight.target);
      scene.add(rimLight);
      rimLightRef.current = rimLight;

      // 6. Grounded Plinth & Pedestal (Top surface grounded at exact world y = 0.0)
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
        color: 0xffffff,
        roughness: 0.25,
        metalness: 0.9,
      });
      createdMaterials.push(brassRingMat);

      // Two-tier pedestal: lower base from y = -0.16 to -0.08, upper pedestal from y = -0.08 to 0.00
      const lowerBaseGeom = new THREE.CylinderGeometry(1.65, 1.72, 0.08, 48);
      createdGeometries.push(lowerBaseGeom);
      const lowerBase = new THREE.Mesh(lowerBaseGeom, plinthMat);
      lowerBase.position.y = -0.12;
      lowerBase.receiveShadow = true;
      plinthGroup.add(lowerBase);

      const upperPedestalGeom = new THREE.CylinderGeometry(1.22, 1.28, 0.08, 48);
      createdGeometries.push(upperPedestalGeom);
      const upperPedestal = new THREE.Mesh(upperPedestalGeom, plinthMat);
      upperPedestal.position.y = -0.04; // top flush at y = 0.0
      upperPedestal.receiveShadow = true;
      plinthGroup.add(upperPedestal);

      // Hairline inlay ring
      const ringGeom = new THREE.TorusGeometry(1.23, 0.006, 12, 64);
      ringGeom.rotateX(Math.PI / 2);
      createdGeometries.push(ringGeom);
      const hairlineRing = new THREE.Mesh(ringGeom, brassRingMat);
      hairlineRing.position.y = 0.001;
      hairlineRing.receiveShadow = true;
      plinthGroup.add(hairlineRing);

      // High-precision Contact Shadow Decal at exact y = 0.002
      const shadowTex = createContactShadowTexture(256);
      if (shadowTex) {
        createdTextures.push(shadowTex);
        const shadowGeom = new THREE.PlaneGeometry(1.35, 1.35);
        shadowGeom.rotateX(-Math.PI / 2);
        createdGeometries.push(shadowGeom);
        const shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTex,
          transparent: true,
          opacity: 0.88,
          depthWrite: false,
        });
        createdMaterials.push(shadowMat);
        const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
        shadowMesh.position.y = 0.002;
        plinthGroup.add(shadowMesh);
      }
      scene.add(plinthGroup);

      // 7. Procedural Crochet Yarn PBR Materials with vertexColors enabled
      const textures: CrochetTextureSet | null = createCrochetTextureSet(512);
      if (textures) {
        createdTextures.push(textures.albedoMap, textures.normalMap, textures.roughnessMap);
      }

      const initialFiberParams = getFiberPBRParams(fiber.id);

      const createYarnMat = (initialColor: THREE.Color) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: initialColor,
          vertexColors: true,
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

      // Sage green calyx & foliage material (with cloned textures so fiber repeat changes do not affect foliage)
      const foliageMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#414F44"),
        vertexColors: true,
        roughness: 0.86,
        metalness: 0.0,
        sheen: 0.65,
        sheenRoughness: 0.7,
        sheenColor: new THREE.Color("#56695B"),
      });
      if (textures) {
        const foliageAlbedo = textures.albedoMap.clone();
        const foliageNormal = textures.normalMap.clone();
        const foliageRough = textures.roughnessMap.clone();
        foliageAlbedo.repeat.set(4, 4);
        foliageNormal.repeat.set(4, 4);
        foliageRough.repeat.set(4, 4);
        createdTextures.push(foliageAlbedo, foliageNormal, foliageRough);
        foliageMat.map = foliageAlbedo;
        foliageMat.normalMap = foliageNormal;
        foliageMat.normalScale.set(0.9, 0.9);
        foliageMat.roughnessMap = foliageRough;
      }
      createdMaterials.push(foliageMat);

      // Stamen French-knot material
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

      // Brushed collar material
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xdedede,
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
        color: new THREE.Color("#D9D0C1"),
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

      // 8. Bouquet Root Group (grounded at exact world y = 0.0, total height ~2.05 units)
      const bouquetRoot = new THREE.Group();
      bouquetRoot.position.set(0, 0.0, 0);
      bouquetRootRef.current = bouquetRoot;
      scene.add(bouquetRoot);

      // 9. Sculptural Crocheted Floral Arrangement
      const flowersGroup = new THREE.Group();

      // Three Hero Crocheted Roses
      const rose1 = buildCrochetRose(primaryMat, secondaryMat, foliageMat, 0.1);
      rose1.position.set(0, 1.25, 0.10);
      rose1.rotation.set(0.12, -0.2, 0.04);
      flowersGroup.add(rose1);

      const rose2 = buildCrochetRose(primaryMat, secondaryMat, foliageMat, 0.4);
      rose2.position.set(-0.32, 1.08, 0.18);
      rose2.rotation.set(0.28, -0.4, -0.15);
      rose2.scale.set(0.95, 0.95, 0.95);
      flowersGroup.add(rose2);

      const rose3 = buildCrochetRose(primaryMat, secondaryMat, foliageMat, 0.7);
      rose3.position.set(0.34, 1.15, 0.08);
      rose3.rotation.set(0.20, 0.45, 0.12);
      rose3.scale.set(0.98, 0.98, 0.98);
      flowersGroup.add(rose3);

      // Three Crocheted Tulips / Ranunculus
      const tulip1 = buildCrochetTulip(secondaryMat, stamenMat, foliageMat, 0.2);
      tulip1.position.set(-0.28, 1.42, -0.15);
      tulip1.rotation.set(-0.12, -0.25, -0.12);
      tulip1.scale.set(0.95, 0.95, 0.95);
      flowersGroup.add(tulip1);

      const tulip2 = buildCrochetTulip(secondaryMat, stamenMat, foliageMat, 0.6);
      tulip2.position.set(0.26, 1.38, -0.12);
      tulip2.rotation.set(-0.10, 0.32, 0.08);
      tulip2.scale.set(0.95, 0.95, 0.95);
      flowersGroup.add(tulip2);

      const tulip3 = buildCrochetTulip(primaryMat, stamenMat, foliageMat, 0.9);
      tulip3.position.set(0.05, 0.98, 0.28);
      tulip3.rotation.set(0.38, 0.10, -0.05);
      tulip3.scale.set(0.90, 0.90, 0.90);
      flowersGroup.add(tulip3);

      // Three Micro-Crochet Accent Buds (built with sculpted petals and sepals)
      const bud1 = buildCrochetBud(secondaryMat, foliageMat);
      bud1.position.set(-0.42, 1.62, 0.05);
      bud1.rotation.set(0.18, -0.25, 0.25);
      bud1.scale.set(0.90, 0.90, 0.90);
      flowersGroup.add(bud1);

      const bud2 = buildCrochetBud(secondaryMat, foliageMat);
      bud2.position.set(0.45, 1.66, -0.06);
      bud2.rotation.set(-0.12, 0.30, -0.22);
      bud2.scale.set(0.90, 0.90, 0.90);
      flowersGroup.add(bud2);

      const bud3 = buildCrochetBud(primaryMat, foliageMat);
      bud3.position.set(-0.05, 1.72, -0.24);
      bud3.rotation.set(-0.28, 0.08, 0.05);
      bud3.scale.set(0.92, 0.92, 0.92);
      flowersGroup.add(bud3);

      // Eight veined crochet leaves around collar & flowers
      const leafGeom = createSculptedLeafGeometry({
        width: 0.28,
        length: 0.65,
        curvature: 0.20,
        thickness: 0.016,
      });
      createdGeometries.push(leafGeom);

      const leafConfigs = [
        { pos: [-0.38, 0.95, 0.22], rot: [0.65, -0.6, -0.4], s: 1.0 },
        { pos: [0.40, 0.98, 0.18], rot: [0.55, 0.7, 0.3], s: 0.95 },
        { pos: [-0.18, 0.88, 0.32], rot: [0.85, -0.2, -0.15], s: 0.9 },
        { pos: [0.20, 0.86, 0.34], rot: [0.8, 0.3, 0.12], s: 0.92 },
        { pos: [-0.44, 1.25, -0.12], rot: [0.1, -1.1, -0.2], s: 0.85 },
        { pos: [0.46, 1.28, -0.10], rot: [0.15, 1.05, 0.22], s: 0.88 },
        { pos: [-0.12, 1.45, -0.30], rot: [-0.4, -0.3, 0.1], s: 0.82 },
        { pos: [0.16, 1.48, -0.28], rot: [-0.35, 0.4, -0.12], s: 0.84 },
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

      // Natural tube stems converging into vessel cavity
      const stemPointsList = [
        [new THREE.Vector3(0, 1.22, 0.10), new THREE.Vector3(0.02, 0.85, 0.05), new THREE.Vector3(0, 0.15, 0)],
        [new THREE.Vector3(-0.32, 1.05, 0.18), new THREE.Vector3(-0.12, 0.75, 0.08), new THREE.Vector3(0, 0.15, 0)],
        [new THREE.Vector3(0.34, 1.12, 0.08), new THREE.Vector3(0.14, 0.78, 0.04), new THREE.Vector3(0, 0.15, 0)],
        [new THREE.Vector3(-0.28, 1.38, -0.15), new THREE.Vector3(-0.10, 0.88, -0.06), new THREE.Vector3(0, 0.15, 0)],
        [new THREE.Vector3(0.26, 1.35, -0.12), new THREE.Vector3(0.10, 0.86, -0.05), new THREE.Vector3(0, 0.15, 0)],
      ];

      stemPointsList.forEach((pts) => {
        const curve = new THREE.CatmullRomCurve3(pts);
        const tubeGeom = new THREE.TubeGeometry(curve, 18, 0.024, 8, false);
        createdGeometries.push(tubeGeom);
        const tubeMesh = new THREE.Mesh(tubeGeom, foliageMat);
        tubeMesh.castShadow = true;
        tubeMesh.receiveShadow = true;
        flowersGroup.add(tubeMesh);
      });

      bouquetRoot.add(flowersGroup);

      // 10. Swappable Vessels (anchored flush at local y = 0.0)
      const stonewareGrp = buildStonewareVessel(ceramicMat, brassMat);
      stonewareGrp.position.set(0, 0.0, 0);
      stonewareGrp.visible = vessel.id === "stoneware-vessel";
      bouquetRoot.add(stonewareGrp);
      vesselGroupRef.current["stoneware-vessel"] = stonewareGrp;

      const linenGrp = buildLinenWrap(linenMat, ribbonMat);
      linenGrp.position.set(0, 0.0, 0);
      linenGrp.visible = vessel.id === "linen-wrap";
      bouquetRoot.add(linenGrp);
      vesselGroupRef.current["linen-wrap"] = linenGrp;

      const brassGrp = buildBrassCollar(brassMat, foliageMat);
      brassGrp.position.set(0, 0.0, 0);
      brassGrp.visible = vessel.id === "brass-collar";
      bouquetRoot.add(brassGrp);
      vesselGroupRef.current["brass-collar"] = brassGrp;

      // 11. Swappable Accents
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

      // 12. Non-Intrusive Orbit Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false; // Page scrolling preserved, HUD zoom buttons available
      controls.autoRotate = isAutoOrbit;
      controls.autoRotateSpeed = 1.0;
      controls.minPolarAngle = Math.PI * 0.12;
      controls.maxPolarAngle = Math.PI * 0.52; // Prevents viewing beneath plinth
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

      // 13. Animation Loop with smooth lerp (1 - exp(-4.5 * dt))
      let lastTime = performance.now();

      function animate(now: number) {
        animFrameRef.current = requestAnimationFrame(animate);

        if (!isVisible) {
          lastTime = now;
          return;
        }

        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        const damping = 1 - Math.exp(-4.5 * dt);

        // Yarn color lerping
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

        // GLSL Cyclorama backdrop uniforms smooth lerp
        if (cycloramaMatRef.current) {
          cycloramaMatRef.current.uniforms.uColorCenter.value.lerp(targetBgCenterCol.current, damping);
          cycloramaMatRef.current.uniforms.uColorEdge.value.lerp(targetBgEdgeCol.current, damping);
          cycloramaMatRef.current.uniforms.uColorFloor.value.lerp(targetBgFloorCol.current, damping);
        }

        if (rendererRef.current) {
          rendererRef.current.setClearColor(cycloramaMatRef.current?.uniforms.uColorEdge.value || 0x000000, 1);
        }

        // Camera lerping on preset or zoom button clicks
        if (isTransitioningCameraRef.current && !isUserInteractingRef.current) {
          camera.position.lerp(targetCamPos.current, damping * 1.5);
          controls.target.lerp(targetCamLook.current, damping * 1.5);
          if (camera.position.distanceTo(targetCamPos.current) < 0.012) {
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
  }, []);

  if (hasWebGLError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#151515] p-8 text-center border border-white/15">
        <div className="space-y-4 max-w-md">
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/60">
            BESPOKE STAGE
          </span>
          <h4 className="font-sans text-xl font-light tracking-[0.2em] uppercase text-white">
            3D STUDIO PREVIEW
          </h4>
          <p className="font-sans text-xs text-white/60 font-light leading-relaxed">
            WebGL acceleration is restricted on this browser. Your bespoke selections continue to update the live Commission Dossier ledger.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#000000]">
      {/* Three.js Canvas Mount */}
      <div
        ref={mountRef}
        className={`w-full h-full ${
          isInteracting ? "cursor-grabbing" : "cursor-grab"
        }`}
      />

      {/* Atmospheric Gallery Tag & Non-Floral Silhouette Badge */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none flex flex-col gap-2">
        <div className="px-3.5 py-2 bg-black/75 border border-white/20 backdrop-blur-xl">
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white font-light">
            ATMOSPHERE: {palette.stageTheme.atmosphereLabel}
          </span>
        </div>

        {!isBotanical && (
          <div className="px-3.5 py-2 bg-black/75 border border-white/20 backdrop-blur-xl">
            <span className="font-sans text-[9px] tracking-[0.22em] uppercase text-white/70 font-light">
              LIVE FIBER &amp; PALETTE PREVIEW ON BOTANICAL STUDY
            </span>
          </div>
        )}
      </div>

      {/* Camera Presets & HUD Controls */}
      <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2.5 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 bg-black/75 backdrop-blur-2xl border border-white/15 rounded-full">
          <button
            onClick={() => applyPreset("STUDIO")}
            className={`px-3 py-1 font-sans text-[9px] tracking-[0.22em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 ${
              activePreset === "STUDIO"
                ? "bg-white text-black font-normal"
                : "text-white/60 hover:text-white"
            }`}
            title="Studio Overall View"
          >
            STUDIO
          </button>
          <button
            onClick={() => applyPreset("MACRO")}
            className={`px-3 py-1 font-sans text-[9px] tracking-[0.22em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 ${
              activePreset === "MACRO"
                ? "bg-white text-black font-normal"
                : "text-white/60 hover:text-white"
            }`}
            title="Macro Stitch Inspection"
          >
            MACRO
          </button>
          <button
            onClick={() => applyPreset("CROWN")}
            className={`px-3 py-1 font-sans text-[9px] tracking-[0.22em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 ${
              activePreset === "CROWN"
                ? "bg-white text-black font-normal"
                : "text-white/60 hover:text-white"
            }`}
            title="Crown Elevation View"
          >
            CROWN
          </button>
        </div>

        {/* Orbit & Zoom Controls */}
        <div className="flex items-center gap-1 p-1 bg-black/75 backdrop-blur-2xl border border-white/15 rounded-full">
          <button
            onClick={toggleAutoOrbit}
            className={`p-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 ${
              isAutoOrbit
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            }`}
            title={isAutoOrbit ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
            aria-label="Toggle Auto-Rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(-0.4)}
            className="p-2 text-white/60 hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(0.4)}
            className="p-2 text-white/60 hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle Studio Provenance Stamp */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-3 text-[9px] font-sans tracking-[0.25em] uppercase text-white/40 font-light">
          <span>HYDERABAD STUDIO STAGE</span>
          <span>/</span>
          <span>REACTIVE LIGHTING ENGINE</span>
        </div>
      </div>
    </div>
  );
}
