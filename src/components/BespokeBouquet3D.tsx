"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCw, ZoomIn, ZoomOut, Eye, Sparkles } from "lucide-react";
import {
  createCrochetBumpTexture,
  createCrochetRoughnessTexture,
  createLinenWrapTexture,
  getFiberPBRParams,
} from "@/lib/crochetTextures";
import { ColorPalette, TactileFiber, BespokeVessel, BespokeAccent } from "@/data/atelier";

interface BespokeBouquet3DProps {
  palette: ColorPalette;
  fiber: TactileFiber;
  vessel: BespokeVessel;
  accent: BespokeAccent;
}

type CameraPreset = "STUDIO" | "MACRO" | "CROWN";

export default function BespokeBouquet3D({
  palette,
  fiber,
  vessel,
  accent,
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
  const targetCamPos = useRef(new THREE.Vector3(0, 0.95, 3.2));
  const targetCamLook = useRef(new THREE.Vector3(0, 0.25, 0));

  // Dynamic colors
  const currPrimaryCol = useRef(new THREE.Color(palette.primaryHex));
  const currSecondaryCol = useRef(new THREE.Color(palette.secondaryHex));
  const targetPrimaryCol = useRef(new THREE.Color(palette.primaryHex));
  const targetSecondaryCol = useRef(new THREE.Color(palette.secondaryHex));

  // Materials and swappable groups
  const primaryMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const secondaryMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const vesselGroupRef = useRef<Record<string, THREE.Group>>({});
  const accentGroupRef = useRef<Record<string, THREE.Group>>({});
  const texturesRef = useRef<THREE.CanvasTexture[]>([]);

  // Update target colors when props change
  useEffect(() => {
    targetPrimaryCol.current.set(palette.primaryHex);
    targetSecondaryCol.current.set(palette.secondaryHex);
  }, [palette.primaryHex, palette.secondaryHex]);

  // Update fiber PBR response
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
      mat.bumpScale = params.bumpScale;
      if (mat.bumpMap) {
        mat.bumpMap.repeat.set(params.textureRepeat, params.textureRepeat);
      }
      if (mat.roughnessMap) {
        mat.roughnessMap.repeat.set(params.textureRepeat, params.textureRepeat);
      }
      mat.needsUpdate = true;
    };
    updateMat(primaryMatRef.current);
    updateMat(secondaryMatRef.current);
  }, [fiber.id]);

  // Update swappable accessories
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

  // Camera presets
  const applyPreset = useCallback((preset: CameraPreset) => {
    setActivePreset(preset);
    setIsAutoOrbit(false);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }

    switch (preset) {
      case "STUDIO":
        targetCamPos.current.set(0, 0.95, 3.2);
        targetCamLook.current.set(0, 0.25, 0);
        break;
      case "MACRO":
        targetCamPos.current.set(-0.35, 0.72, 1.45);
        targetCamLook.current.set(-0.05, 0.58, 0.15);
        break;
      case "CROWN":
        targetCamPos.current.set(0, 3.1, 0.85);
        targetCamLook.current.set(0, 0.35, 0);
        break;
    }
  }, []);

  const toggleAutoOrbit = () => {
    setIsAutoOrbit((prev) => {
      const next = !prev;
      if (controlsRef.current) {
        controlsRef.current.autoRotate = next;
      }
      return next;
    });
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
  };

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let isVisible = true;

    try {
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#0A0A0B");
      scene.fog = new THREE.FogExp2("#0A0A0B", 0.08);

      const width = container.clientWidth || 800;
      const height = container.clientHeight || 560;

      camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 30);
      camera.position.copy(targetCamPos.current);
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;

      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.enableZoom = false; // Disable wheel zoom to protect Lenis page scroll
      controls.minPolarAngle = Math.PI * 0.15;
      controls.maxPolarAngle = Math.PI * 0.52;
      controls.autoRotate = false;
      controls.autoRotateSpeed = 1.0;
      controls.target.copy(targetCamLook.current);
      controlsRef.current = controls;

      let isUserInteracting = false;
      controls.addEventListener("start", () => {
        isUserInteracting = true;
        setIsInteracting(true);
      });
      controls.addEventListener("end", () => {
        isUserInteracting = false;
        setIsInteracting(false);
      });

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight("#222328", 1.8);
      scene.add(ambientLight);

      // Key Warm Ivory Spotlight
      const keyLight = new THREE.SpotLight("#FFF5E6", 2.2);
      keyLight.position.set(2.4, 4.5, 3.2);
      keyLight.angle = Math.PI / 4.5;
      keyLight.penumbra = 0.7;
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.001;
      scene.add(keyLight);

      // Cool Slate Fill Light
      const fillLight = new THREE.DirectionalLight("#A8B8C8", 0.85);
      fillLight.position.set(-3.2, 2.0, -1.0);
      scene.add(fillLight);

      // Dramatic Champagne Gold Rim Light
      const rimLight = new THREE.SpotLight("#C6A972", 3.0);
      rimLight.position.set(0, 3.6, -3.2);
      rimLight.angle = Math.PI / 3.2;
      rimLight.penumbra = 0.6;
      scene.add(rimLight);

      // Plinth & Contact Shadow Catcher
      const plinthGeo = new THREE.CylinderGeometry(1.5, 1.65, 0.08, 48);
      const plinthMat = new THREE.MeshStandardMaterial({
        color: "#121214",
        roughness: 0.85,
        metalness: 0.1,
      });
      const plinth = new THREE.Mesh(plinthGeo, plinthMat);
      plinth.position.y = -1.05;
      plinth.receiveShadow = true;
      scene.add(plinth);

      // Thin Plinth Hairline Accent
      const rimGeo = new THREE.TorusGeometry(1.5, 0.008, 12, 64);
      const rimMat = new THREE.MeshBasicMaterial({ color: "#C6A972" });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.position.y = -1.01;
      rimMesh.rotation.x = Math.PI / 2;
      scene.add(rimMesh);

      // Procedural PBR Textures
      const bumpTex = createCrochetBumpTexture(512);
      const roughTex = createCrochetRoughnessTexture(512);
      const linenTex = createLinenWrapTexture(512);

      const createdTextures: THREE.CanvasTexture[] = [];
      if (bumpTex) createdTextures.push(bumpTex);
      if (roughTex) createdTextures.push(roughTex);
      if (linenTex) createdTextures.push(linenTex);
      texturesRef.current = createdTextures;

      const fiberParams = getFiberPBRParams(fiber.id);

      // Primary Bloom Material (Hero blooms)
      const primaryMat = new THREE.MeshPhysicalMaterial({
        color: currPrimaryCol.current,
        roughness: fiberParams.roughness,
        metalness: fiberParams.metalness,
        sheen: fiberParams.sheen,
        sheenRoughness: fiberParams.sheenRoughness,
        sheenColor: fiberParams.sheenColor,
        clearcoat: fiberParams.clearcoat,
        bumpMap: bumpTex,
        bumpScale: fiberParams.bumpScale,
        roughnessMap: roughTex,
        side: THREE.DoubleSide,
      });
      primaryMatRef.current = primaryMat;

      // Secondary Bloom Material (Inner petals / accent blooms)
      const secondaryMat = new THREE.MeshPhysicalMaterial({
        color: currSecondaryCol.current,
        roughness: fiberParams.roughness,
        metalness: fiberParams.metalness,
        sheen: fiberParams.sheen,
        sheenRoughness: fiberParams.sheenRoughness,
        sheenColor: fiberParams.sheenColor,
        clearcoat: fiberParams.clearcoat,
        bumpMap: bumpTex,
        bumpScale: fiberParams.bumpScale,
        roughnessMap: roughTex,
        side: THREE.DoubleSide,
      });
      secondaryMatRef.current = secondaryMat;

      // Foliage & Stem Material (Muted sage yarn)
      const foliageMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#36433C"),
        roughness: 0.82,
        sheen: 0.4,
        bumpMap: bumpTex,
        bumpScale: 0.04,
        side: THREE.DoubleSide,
      });

      // Stem Yarn Material
      const stemMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#27322B"),
        roughness: 0.9,
        bumpMap: bumpTex,
        bumpScale: 0.03,
      });

      const bouquetRoot = new THREE.Group();
      scene.add(bouquetRoot);

      // Helper to build a curved spiral Rose bloom
      function createCrochetRose(scale = 1.0, isPrimary = true): THREE.Group {
        const roseGroup = new THREE.Group();
        const mainMat = isPrimary ? primaryMat : secondaryMat;
        const subMat = isPrimary ? secondaryMat : primaryMat;

        // Tiers: inner bud (4), middle cup (5), outer reflexed (6)
        const layers = [
          { count: 4, radius: 0.16 * scale, height: 0.28 * scale, tilt: 0.12, mat: subMat },
          { count: 5, radius: 0.28 * scale, height: 0.35 * scale, tilt: 0.32, mat: mainMat },
          { count: 6, radius: 0.42 * scale, height: 0.42 * scale, tilt: 0.58, mat: mainMat },
        ];

        layers.forEach((layer) => {
          for (let i = 0; i < layer.count; i++) {
            const angle = (i / layer.count) * Math.PI * 2 + (layer.count % 2 ? 0.3 : 0);
            const petalGeo = new THREE.SphereGeometry(
              layer.radius,
              14,
              12,
              0,
              Math.PI * 0.72,
              0,
              Math.PI * 0.65
            );
            const petal = new THREE.Mesh(petalGeo, layer.mat);
            petal.castShadow = true;
            petal.scale.set(1.0, 1.25, 0.45);

            petal.position.set(
              Math.cos(angle) * layer.radius * 0.55,
              layer.height * 0.5,
              Math.sin(angle) * layer.radius * 0.55
            );
            petal.rotation.set(layer.tilt, -angle + Math.PI / 2, 0);
            roseGroup.add(petal);
          }
        });

        // Center stamen dome
        const stamenGeo = new THREE.SphereGeometry(0.08 * scale, 12, 10);
        const stamenMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#2C241B"),
          roughness: 0.95,
        });
        const stamen = new THREE.Mesh(stamenGeo, stamenMat);
        stamen.position.y = 0.18 * scale;
        roseGroup.add(stamen);

        return roseGroup;
      }

      // Helper to build a cupped Tulip / Ranunculus bloom
      function createCrochetTulip(scale = 0.85, isPrimary = true): THREE.Group {
        const tulipGroup = new THREE.Group();
        const mainMat = isPrimary ? primaryMat : secondaryMat;
        const subMat = isPrimary ? secondaryMat : primaryMat;

        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const petalGeo = new THREE.SphereGeometry(
            0.26 * scale,
            12,
            10,
            0,
            Math.PI * 0.75,
            0,
            Math.PI * 0.75
          );
          const petal = new THREE.Mesh(petalGeo, i % 2 === 0 ? mainMat : subMat);
          petal.castShadow = true;
          petal.scale.set(0.9, 1.4, 0.4);
          petal.position.set(
            Math.cos(angle) * 0.12 * scale,
            0.15 * scale,
            Math.sin(angle) * 0.12 * scale
          );
          petal.rotation.set(0.25, -angle + Math.PI / 2, 0);
          tulipGroup.add(petal);
        }

        return tulipGroup;
      }

      // 3 Hero Crocheted Roses
      const rose1 = createCrochetRose(1.15, true);
      rose1.position.set(0, 0.62, 0.12);
      rose1.rotation.set(-0.1, 0, 0.15);
      bouquetRoot.add(rose1);

      const rose2 = createCrochetRose(0.95, false);
      rose2.position.set(-0.38, 0.52, -0.05);
      rose2.rotation.set(0.18, -0.32, -0.28);
      bouquetRoot.add(rose2);

      const rose3 = createCrochetRose(1.0, true);
      rose3.position.set(0.36, 0.58, 0.08);
      rose3.rotation.set(-0.12, 0.28, 0.32);
      bouquetRoot.add(rose3);

      // 3 Cupped Tulips / Ranunculus
      const tulip1 = createCrochetTulip(0.85, false);
      tulip1.position.set(0.12, 0.82, -0.18);
      tulip1.rotation.set(-0.25, 0.4, 0.1);
      bouquetRoot.add(tulip1);

      const tulip2 = createCrochetTulip(0.8, true);
      tulip2.position.set(-0.28, 0.74, 0.22);
      tulip2.rotation.set(0.2, -0.4, -0.15);
      bouquetRoot.add(tulip2);

      const tulip3 = createCrochetTulip(0.82, false);
      tulip3.position.set(0.42, 0.45, -0.22);
      tulip3.rotation.set(0.1, 0.5, 0.4);
      bouquetRoot.add(tulip3);

      // 3 Micro-Crochet Accent Buds
      const bud1 = createCrochetTulip(0.5, true);
      bud1.position.set(-0.48, 0.35, 0.28);
      bud1.rotation.set(0.4, -0.6, -0.4);
      bouquetRoot.add(bud1);

      const bud2 = createCrochetTulip(0.48, false);
      bud2.position.set(0.46, 0.38, 0.32);
      bud2.rotation.set(0.35, 0.7, 0.45);
      bouquetRoot.add(bud2);

      const bud3 = createCrochetTulip(0.45, true);
      bud3.position.set(-0.15, 0.92, -0.25);
      bud3.rotation.set(-0.4, 0, 0);
      bouquetRoot.add(bud3);

      // Curved crochet stems converging into central binding
      const stemEndpoints = [
        rose1.position,
        rose2.position,
        rose3.position,
        tulip1.position,
        tulip2.position,
        tulip3.position,
        bud1.position,
        bud2.position,
        bud3.position,
      ];

      stemEndpoints.forEach((ep) => {
        const curve = new THREE.CatmullRomCurve3([
          ep.clone().add(new THREE.Vector3(0, -0.05, 0)),
          new THREE.Vector3(ep.x * 0.4, 0.05, ep.z * 0.4),
          new THREE.Vector3(ep.x * 0.15, -0.35, ep.z * 0.15),
          new THREE.Vector3(0, -0.95, 0),
        ]);
        const stemGeo = new THREE.TubeGeometry(curve, 20, 0.024, 8, false);
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.castShadow = true;
        bouquetRoot.add(stem);
      });

      // Curved Crochet Foliage Leaves
      for (let l = 0; l < 6; l++) {
        const angle = (l / 6) * Math.PI * 2 + 0.2;
        const leafGeo = new THREE.SphereGeometry(0.38, 12, 8, 0, Math.PI * 0.6, 0, Math.PI * 0.6);
        const leaf = new THREE.Mesh(leafGeo, foliageMat);
        leaf.scale.set(0.45, 1.4, 0.2);
        leaf.position.set(Math.cos(angle) * 0.35, 0.35, Math.sin(angle) * 0.35);
        leaf.rotation.set(0.85, -angle + Math.PI / 2, 0);
        leaf.castShadow = true;
        bouquetRoot.add(leaf);
      }

      // -------------------------------------------------------------
      // Swappable Presentation Vessels
      // -------------------------------------------------------------
      const vessels: Record<string, THREE.Group> = {};

      // 1. Blackened Stoneware Vessel
      const stonewareGrp = new THREE.Group();
      const vaseGeo = new THREE.CylinderGeometry(0.52, 0.44, 1.25, 36);
      const vaseMat = new THREE.MeshStandardMaterial({
        color: "#18181B",
        roughness: 0.92,
        metalness: 0.05,
      });
      const vaseMesh = new THREE.Mesh(vaseGeo, vaseMat);
      vaseMesh.position.y = -0.42;
      vaseMesh.castShadow = true;
      vaseMesh.receiveShadow = true;
      stonewareGrp.add(vaseMesh);

      // Gold hairline rim
      const vaseRimGeo = new THREE.TorusGeometry(0.52, 0.008, 12, 48);
      const vaseRimMat = new THREE.MeshStandardMaterial({
        color: "#C6A972",
        metalness: 0.85,
        roughness: 0.25,
      });
      const vaseRim = new THREE.Mesh(vaseRimGeo, vaseRimMat);
      vaseRim.position.y = 0.205;
      vaseRim.rotation.x = Math.PI / 2;
      stonewareGrp.add(vaseRim);
      scene.add(stonewareGrp);
      vessels["stoneware-vessel"] = stonewareGrp;

      // 2. Sculpted Linen Wrap
      const linenGrp = new THREE.Group();
      const wrapGeo = new THREE.ConeGeometry(0.68, 1.35, 32, 1, true);
      const wrapMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#DDD6C9"),
        roughness: 0.88,
        sheen: 0.35,
        bumpMap: linenTex,
        bumpScale: 0.04,
        side: THREE.DoubleSide,
      });
      const wrapMesh = new THREE.Mesh(wrapGeo, wrapMat);
      wrapMesh.position.y = -0.42;
      wrapMesh.rotation.x = Math.PI; // Inverted flared cone
      wrapMesh.castShadow = true;
      linenGrp.add(wrapMesh);

      // Satin cord tie
      const cordGeo = new THREE.TorusGeometry(0.24, 0.025, 12, 32);
      const cordMat = new THREE.MeshStandardMaterial({
        color: "#C6A972",
        metalness: 0.6,
        roughness: 0.35,
      });
      const cordMesh = new THREE.Mesh(cordGeo, cordMat);
      cordMesh.position.y = -0.32;
      cordMesh.rotation.x = Math.PI / 2;
      linenGrp.add(cordMesh);
      scene.add(linenGrp);
      vessels["linen-wrap"] = linenGrp;

      // 3. Brushed Brass Ribbon Tie
      const collarGrp = new THREE.Group();
      const cuffGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.45, 32);
      const cuffMat = new THREE.MeshStandardMaterial({
        color: "#C6A972",
        metalness: 0.92,
        roughness: 0.28,
      });
      const cuffMesh = new THREE.Mesh(cuffGeo, cuffMat);
      cuffMesh.position.y = -0.38;
      cuffMesh.castShadow = true;
      collarGrp.add(cuffMesh);
      scene.add(collarGrp);
      vessels["brass-collar"] = collarGrp;

      vesselGroupRef.current = vessels;

      // -------------------------------------------------------------
      // Swappable Accents
      // -------------------------------------------------------------
      const accents: Record<string, THREE.Group> = {};

      // 1. Crochet Eucalyptus Sprigs
      const eucaGrp = new THREE.Group();
      for (let s = 0; s < 3; s++) {
        const eAngle = (s / 3) * Math.PI * 2 + 0.8;
        const eCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.cos(eAngle) * 0.4, 0.45, Math.sin(eAngle) * 0.4),
          new THREE.Vector3(Math.cos(eAngle) * 0.65, 0.88, Math.sin(eAngle) * 0.65),
        ]);
        const eStemGeo = new THREE.TubeGeometry(eCurve, 16, 0.015, 6, false);
        const eStem = new THREE.Mesh(eStemGeo, foliageMat);
        eucaGrp.add(eStem);

        // Disc pairs
        for (let d = 1; d <= 4; d++) {
          const pt = eCurve.getPoint(d / 4.5);
          const discGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.012, 16);
          const discMat = new THREE.MeshStandardMaterial({
            color: "#4F6255",
            roughness: 0.9,
          });
          const disc = new THREE.Mesh(discGeo, discMat);
          disc.position.copy(pt);
          disc.rotation.set(0.3, eAngle, 0.4);
          eucaGrp.add(disc);
        }
      }
      scene.add(eucaGrp);
      accents["eucalyptus-sprigs"] = eucaGrp;

      // 2. Champagne Brass Filaments
      const filGrp = new THREE.Group();
      const brassMat = new THREE.MeshStandardMaterial({
        color: "#C6A972",
        metalness: 0.92,
        roughness: 0.22,
      });
      const pearlMat = new THREE.MeshPhysicalMaterial({
        color: "#F6F2EB",
        roughness: 0.15,
        clearcoat: 0.9,
        sheen: 0.8,
      });

      for (let f = 0; f < 4; f++) {
        const fAngle = (f / 4) * Math.PI * 2 + 0.35;
        const fCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.1, 0),
          new THREE.Vector3(Math.cos(fAngle) * 0.32, 0.55, Math.sin(fAngle) * 0.32),
          new THREE.Vector3(Math.cos(fAngle) * 0.52, 0.95, Math.sin(fAngle) * 0.52),
        ]);
        const wireGeo = new THREE.TubeGeometry(fCurve, 16, 0.008, 6, false);
        const wire = new THREE.Mesh(wireGeo, brassMat);
        filGrp.add(wire);

        const tip = fCurve.getPoint(1);
        const pearlGeo = new THREE.SphereGeometry(0.045, 16, 16);
        const pearl = new THREE.Mesh(pearlGeo, pearlMat);
        pearl.position.copy(tip);
        filGrp.add(pearl);
      }
      scene.add(filGrp);
      accents["champagne-filaments"] = filGrp;

      // 3. Pure Monolith Blooms (empty group)
      const pureGrp = new THREE.Group();
      scene.add(pureGrp);
      accents["pure-blooms"] = pureGrp;

      accentGroupRef.current = accents;

      // Set initial visibility
      Object.entries(vessels).forEach(([id, grp]) => {
        grp.visible = id === vessel.id;
      });
      Object.entries(accents).forEach(([id, grp]) => {
        grp.visible = id === accent.id;
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

      // Animation Loop with delta time damping for 60Hz/120Hz/180Hz parity
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

        // Smooth color lerping
        currPrimaryCol.current.lerp(targetPrimaryCol.current, damping);
        currSecondaryCol.current.lerp(targetSecondaryCol.current, damping);

        if (primaryMatRef.current) {
          primaryMatRef.current.color.copy(currPrimaryCol.current);
        }
        if (secondaryMatRef.current) {
          secondaryMatRef.current.color.copy(currSecondaryCol.current);
        }

        // Camera lerping to target preset
        if (!isUserInteracting && !isAutoOrbit) {
          camera.position.lerp(targetCamPos.current, damping * 0.8);
          controls.target.lerp(targetCamLook.current, damping * 0.8);
        }

        controls.update();
        renderer.render(scene, camera);
      }

      animFrameRef.current = requestAnimationFrame(animate);

      // Cleanup
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

        createdTextures.forEach((t) => t.dispose());
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      setHasWebGLError(true);
    }
  }, [vessel.id, accent.id, fiber.id, isAutoOrbit]);

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
            WebGL acceleration is unavailable in this browser session. Your selections are tracked in real time in the Commission Dossier below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#0A0A0B]">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Top-Left Status HUD */}
      <div className="absolute top-4 left-4 z-10 bg-[#0A0A0B]/85 backdrop-blur-md px-3.5 py-2.5 border border-white/10 space-y-1.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center overflow-hidden border border-white/20 w-8 h-4">
            <span className="w-1/2 h-full" style={{ backgroundColor: palette.primaryHex }} />
            <span className="w-1/2 h-full" style={{ backgroundColor: palette.secondaryHex }} />
          </div>
          <span className="font-sans text-[10px] tracking-[0.22em] text-[#F4F1EA] uppercase font-light">
            {palette.name}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[9px] font-sans text-[#9A968E] uppercase tracking-wider">
          <span className="text-[#C6A972]">{fiber.name}</span>
          <span>/</span>
          <span>{vessel.name}</span>
        </div>

        {isInteracting && (
          <span className="font-sans text-[8px] tracking-[0.25em] text-[#C6A972] block animate-pulse">
            INTERACTIVE ORBIT ACTIVE
          </span>
        )}
      </div>

      {/* Bottom Floating Minimal Controls HUD */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Camera Preset Buttons */}
        <div className="flex items-center gap-1.5 bg-[#0A0A0B]/90 backdrop-blur-md p-1.5 border border-white/10 pointer-events-auto">
          {(["STUDIO", "MACRO", "CROWN"] as CameraPreset[]).map((preset) => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className={`px-3 py-1.5 font-sans text-[9px] tracking-[0.25em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
                activePreset === preset && !isAutoOrbit
                  ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                  : "text-[#9A968E] hover:text-[#F4F1EA] bg-transparent"
              }`}
            >
              {preset === "STUDIO" && <span className="inline-flex items-center gap-1.5"><Eye className="w-2.5 h-2.5" /> STUDIO</span>}
              {preset === "MACRO" && <span className="inline-flex items-center gap-1.5"><Sparkles className="w-2.5 h-2.5" /> MACRO</span>}
              {preset === "CROWN" && <span>CROWN</span>}
            </button>
          ))}

          <button
            onClick={toggleAutoOrbit}
            className={`px-3 py-1.5 font-sans text-[9px] tracking-[0.25em] uppercase transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70 ${
              isAutoOrbit
                ? "bg-[#C6A972] text-[#0A0A0B] font-medium"
                : "text-[#9A968E] hover:text-[#F4F1EA] bg-transparent"
            }`}
          >
            <RotateCw className="w-2.5 h-2.5" />
            <span>ORBIT</span>
          </button>
        </div>

        {/* Dedicated Zoom Buttons (No Scroll Trap) */}
        <div className="flex items-center gap-1 bg-[#0A0A0B]/90 backdrop-blur-md p-1 border border-white/10 pointer-events-auto">
          <button
            onClick={() => handleZoom(-0.5)}
            className="p-1.5 text-[#9A968E] hover:text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(0.5)}
            className="p-1.5 text-[#9A968E] hover:text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A972]/70"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
