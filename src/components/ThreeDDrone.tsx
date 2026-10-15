"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeDDroneProps {
  className?: string;
  interactive?: boolean;
}

export function ThreeDDrone({ className = "", interactive = true }: ThreeDDroneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [telemetry, setTelemetry] = useState({ pitch: 0, roll: 0, yaw: 0, rpm: 4850 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 5.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x2563eb, 3.5, 10);
    blueLight.position.set(-2, 1, 2);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 8);
    cyanLight.position.set(2, -1, -2);
    scene.add(cyanLight);

    // Drone Group
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.35,
    });

    const blueAccentMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.2,
    });

    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7,
    });

    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });

    // 1. Fuselage (Central Body)
    const bodyGeo = new THREE.ConeGeometry(0.42, 2.8, 8);
    bodyGeo.rotateX(Math.PI / 2);
    bodyGeo.scale(1, 0.55, 1);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.castShadow = true;
    droneGroup.add(bodyMesh);

    // Canopy (Cockpit)
    const canopyGeo = new THREE.SphereGeometry(0.32, 16, 12);
    canopyGeo.scale(0.65, 0.45, 1.4);
    const canopyMesh = new THREE.Mesh(canopyGeo, canopyMat);
    canopyMesh.position.set(0, 0.2, 0.2);
    droneGroup.add(canopyMesh);

    // Cube Orange+ Module on top
    const cubeGeo = new THREE.BoxGeometry(0.24, 0.12, 0.24);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.5,
      roughness: 0.3,
    });
    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.position.set(0, 0.26, -0.4);
    droneGroup.add(cubeMesh);

    // 2. Main Wings (VTOL QuadPlane Wings)
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(2.4, -0.3);
    wingShape.lineTo(2.2, -0.65);
    wingShape.lineTo(0, -0.5);
    wingShape.closePath();

    const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const rightWingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
    rightWingGeo.rotateX(-Math.PI / 2);

    const rightWing = new THREE.Mesh(rightWingGeo, bodyMat);
    rightWing.position.set(0, 0.05, 0);
    rightWing.castShadow = true;
    droneGroup.add(rightWing);

    // Left Wing (Mirrored)
    const leftWingShape = new THREE.Shape();
    leftWingShape.moveTo(0, 0);
    leftWingShape.lineTo(-2.4, -0.3);
    leftWingShape.lineTo(-2.2, -0.65);
    leftWingShape.lineTo(0, -0.5);
    leftWingShape.closePath();

    const leftWingGeo = new THREE.ExtrudeGeometry(leftWingShape, extrudeSettings);
    leftWingGeo.rotateX(-Math.PI / 2);
    const leftWing = new THREE.Mesh(leftWingGeo, bodyMat);
    leftWing.position.set(0, 0.05, 0);
    leftWing.castShadow = true;
    droneGroup.add(leftWing);

    // Winglet tips (Electric blue)
    const wingletGeo = new THREE.BoxGeometry(0.04, 0.28, 0.35);
    const rightWinglet = new THREE.Mesh(wingletGeo, blueAccentMat);
    rightWinglet.position.set(2.35, 0.14, -0.45);
    droneGroup.add(rightWinglet);

    const leftWinglet = new THREE.Mesh(wingletGeo, blueAccentMat);
    leftWinglet.position.set(-2.35, 0.14, -0.45);
    droneGroup.add(leftWinglet);

    // 3. VTOL Booms (Longitudinal carbon spars)
    const boomGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 12);
    boomGeo.rotateX(Math.PI / 2);

    const rightBoom = new THREE.Mesh(boomGeo, carbonMat);
    rightBoom.position.set(1.1, 0.08, -0.1);
    rightBoom.castShadow = true;
    droneGroup.add(rightBoom);

    const leftBoom = new THREE.Mesh(boomGeo, carbonMat);
    leftBoom.position.set(-1.1, 0.08, -0.1);
    leftBoom.castShadow = true;
    droneGroup.add(leftBoom);

    // 4. VTOL Motor Pods and Rotors
    const motorGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.16, 12);
    const propGroupList: THREE.Group[] = [];

    const propBladeGeo = new THREE.BoxGeometry(0.7, 0.015, 0.06);

    const motorPositions = [
      { x: 1.1, y: 0.18, z: 0.9 },   // Right Front
      { x: 1.1, y: 0.18, z: -1.1 },  // Right Rear
      { x: -1.1, y: 0.18, z: 0.9 },  // Left Front
      { x: -1.1, y: 0.18, z: -1.1 }, // Left Rear
    ];

    motorPositions.forEach((pos) => {
      const motorMesh = new THREE.Mesh(motorGeo, blueAccentMat);
      motorMesh.position.set(pos.x, pos.y, pos.z);
      motorMesh.castShadow = true;
      droneGroup.add(motorMesh);

      // Spinning Propeller
      const propGroup = new THREE.Group();
      propGroup.position.set(pos.x, pos.y + 0.1, pos.z);

      const blade1 = new THREE.Mesh(propBladeGeo, carbonMat);
      blade1.castShadow = true;
      propGroup.add(blade1);

      // Translucent rotor disc
      const discGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.01, 16);
      const discMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      propGroup.add(disc);

      droneGroup.add(propGroup);
      propGroupList.push(propGroup);
    });

    // 5. Downward Camera Gimbal (ArUco Optical Sensor)
    const gimbalGeo = new THREE.SphereGeometry(0.16, 16, 12);
    const gimbalMesh = new THREE.Mesh(gimbalGeo, carbonMat);
    gimbalMesh.position.set(0, -0.22, 0.5);
    droneGroup.add(gimbalMesh);

    const lensGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.06, 12);
    lensGeo.rotateX(Math.PI / 2);
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.position.set(0, -0.3, 0.55);
    droneGroup.add(lensMesh);

    // 6. Tail / Twin Vertical Stabilizer
    const vTailGeo = new THREE.BoxGeometry(0.03, 0.45, 0.35);
    const rightVTail = new THREE.Mesh(vTailGeo, bodyMat);
    rightVTail.position.set(0.35, 0.3, -1.35);
    rightVTail.rotation.z = -0.15;
    droneGroup.add(rightVTail);

    const leftVTail = new THREE.Mesh(vTailGeo, bodyMat);
    leftVTail.position.set(-0.35, 0.3, -1.35);
    leftVTail.rotation.z = 0.15;
    droneGroup.add(leftVTail);

    // Horizontal tail stabilizer
    const hTailGeo = new THREE.BoxGeometry(0.9, 0.03, 0.25);
    const hTail = new THREE.Mesh(hTailGeo, bodyMat);
    hTail.position.set(0, 0.2, -1.35);
    droneGroup.add(hTail);

    // Mouse Interaction
    let targetRotationX = 0.25;
    let targetRotationY = -0.45;
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (isMouseDown && interactive) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else if (interactive) {
        // Parallax tilt from mouse
        const rect = mount.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = normX * 0.9;
        targetRotationX = -normY * 0.6 + 0.2;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isMouseDown = true;
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    if (interactive) {
      window.addEventListener("mousemove", handlePointerMove);
      mount.addEventListener("mousedown", handlePointerDown);
      window.addEventListener("mouseup", handlePointerUp);
    }

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Spin props
      propGroupList.forEach((prop, idx) => {
        prop.rotation.y += (idx % 2 === 0 ? 1 : -1) * 32 * delta;
      });

      // Smooth floating bob
      droneGroup.position.y = Math.sin(time * 2) * 0.08;

      // Smooth damped rotation
      droneGroup.rotation.x += (targetRotationX - droneGroup.rotation.x) * 0.08;
      droneGroup.rotation.y += (targetRotationY - droneGroup.rotation.y) * 0.08;
      droneGroup.rotation.z = Math.sin(time * 1.5) * 0.04 - (targetRotationY * 0.2);

      // Render
      renderer.render(scene, camera);

      // Update telemetry display throttle
      if (Math.floor(time * 10) % 3 === 0) {
        setTelemetry({
          pitch: Math.round(THREE.MathUtils.radToDeg(droneGroup.rotation.x)),
          roll: Math.round(THREE.MathUtils.radToDeg(droneGroup.rotation.z)),
          yaw: Math.round(THREE.MathUtils.radToDeg(droneGroup.rotation.y)),
          rpm: Math.round(4800 + Math.sin(time * 4) * 80),
        });
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handlePointerMove);
        mount.removeEventListener("mousedown", handlePointerDown);
        window.removeEventListener("mouseup", handlePointerUp);
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          isDragging ? "cursor-grabbing" : ""
        }`}
      />

      {/* 3D HUD Telemetry overlay */}
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-black/60 backdrop-blur-xs text-white/90 px-3 py-1.5 rounded-full border border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold">KRTI 2026 VTOL 3D</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>PITCH: <strong className="text-cyan-300">{telemetry.pitch}°</strong></span>
          <span>ROLL: <strong className="text-cyan-300">{telemetry.roll}°</strong></span>
          <span>YAW: <strong className="text-cyan-300">{telemetry.yaw}°</strong></span>
        </div>
        <div className="text-cyan-400 font-bold">
          {telemetry.rpm} RPM
        </div>
      </div>
    </div>
  );
}
