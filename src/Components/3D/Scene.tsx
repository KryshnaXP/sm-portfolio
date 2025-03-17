"use client";
import * as THREE from "three";
import {
  useGLTF,
  Float,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap"; // Import GSAP for smooth animations

// Importing custom components
import PC from "./PC";
import TV from "./TV";
import Lamps from "./Lamps";
import Room from "./Room";
import { Nodes } from "../../Types/types"; // Custom type for nodes
import { useData } from "../../Context/ContextProvider";
import useWindowSize from "../../Context/WindowResize";

/**
 * Scene Component
 *
 * This component renders a 3D interactive portfolio scene using react-three-fiber and Drei.
 * It includes dynamic camera controls, smooth animations, and various elements like TV, PC, and Lamps.
 *
 * @returns {JSX.Element} - The interactive 3D scene
 */
export default function Scene() {
  // Access global theme and position state
  const { theme, position, progress, setProgress } = useData();
  const [size, setSize] = useState(1);
  const { width, height } = useWindowSize();

  // Dynamically adjust size based on window width for responsive scaling
  useEffect(() => {
    if (width < 768) setSize((width - height / 10) / 768);
    else if (width < 1280) setSize(width / 1080);
    else if (width < 1736) setSize(width / 1536);
    else if (width > 2120) setSize(width / 2420);
    else setSize(width / 2560);
  }, [width, height]);

  // Load the 3D model using the useGLTF hook
  const { nodes } = useGLTF(
    "/Models/PortFolio_c.glb",
    true,
    false,
    () => {
      setProgress(progress + 1);
    }
  ) as unknown as {
    nodes: Nodes;
  };

  // Refs for model and camera
  const model = useRef<THREE.Group | null>(null);
  const { camera } = useThree();

  // State for visual effects and control settings
  const [blend, setBlend] = useState(0);
  const [intensity, setIntensity] = useState(1);
  const [orbitSetting, setOrbitSetting] = useState({
    x: 0,
    y: 1.45,
    z: 0,
    w: 1.55,
  });

  // Predefined camera and model positions for different views
  const cameraPosition = [
    new THREE.Vector3(40, 21, 40), // Main view
    new THREE.Vector3(0, 1, 9), // TV view
    new THREE.Vector3(8, 2, 0), // PC view
    new THREE.Vector3(4, 1, 2), // Trophy view
    new THREE.Vector3(3, 4, 3), // Couch view
  ];

  const modelPosition = [
    new THREE.Vector3(0, width > 768 ? -0.75 : 3, 0), // Main view
    new THREE.Vector3(-1.85 * size, -0.7 * size, 1 * size), // TV view
    new THREE.Vector3(2.5 * size, -1.5 * size, 1.65 * size), // PC view
    new THREE.Vector3(0 * size, -4 * size, 3 * size), // Trophy view
    new THREE.Vector3(-5 * size, 0 * size, -5 * size), // Couch view
  ];

  const orbitSettings = [
    new THREE.Vector4(0, 1.45, 0.2, 1.55), // Main view
    new THREE.Vector4(1.2, 1.55, 0, 0), // TV view
    new THREE.Vector4(0, 6.28, 0, 6.28), // Free view
  ];

  const modelIntensity = [1, 0.2, 0.2, 0.4, 0.4]; // Light intensity per view

  // Adjust theme blend factor
  useEffect(() => {
    setBlend(theme === "dark" ? 0.75 : theme === "light" ? 0.0 : 0.35);
  }, [theme]);

  // Initialize camera and model positions
  useEffect(() => {
    camera.position.set(40, 21, 40);
    model.current?.position.set(0, width > 768 ? -0.75 : 3, 0);
    setIntensity(modelIntensity[0]);
  }, [camera]);

  // Smooth transition effect when switching views
  useEffect(() => {
    gsap.killTweensOf(camera.position);
    if (model.current) gsap.killTweensOf(model.current.position);

    gsap.to(camera.position, {
      x: cameraPosition[position].x,
      y: cameraPosition[position].y,
      z: cameraPosition[position].z,
      duration: 2,
      ease: "power3.inOut",
    });

    if (model.current) {
      setOrbitSetting(orbitSettings[2]);
      gsap.to(model.current.position, {
        x: modelPosition[position].x,
        y: modelPosition[position].y,
        z: modelPosition[position].z,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.inOut",
        onComplete: () => {
          setOrbitSetting(position === 1 ? orbitSettings[1] : orbitSettings[0]);
        },
      });
    }

    setIntensity(modelIntensity[position]);
  }, [position, camera]);

  return (
    <>
      {/* 3D Model Group */}
      <group ref={model} scale={size}>
        {/* Floating effect for smooth movement */}
        <Float
          speed={1}
          rotationIntensity={intensity / 10}
          floatIntensity={intensity}
          floatingRange={[-0.25, 0.25]}
        >
          {/* Room structure with blend effect */}
          <Room nodes={nodes} blend={blend} />

          {/* Nested components: Lamps, TV, and PC */}
          <group position={[0, -3, 0]}>
            <Lamps nodes={nodes} />
            <TV nodes={nodes} />
            <PC nodes={nodes} />
          </group>
        </Float>
      </group>

      {/* Camera controls with orbit restrictions */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={60}
        enableDamping={true}
        dampingFactor={0.035}
        target={[0, 0, 0]}
        minPolarAngle={orbitSetting.x}
        maxPolarAngle={orbitSetting.y}
        minAzimuthAngle={orbitSetting.z}
        maxAzimuthAngle={orbitSetting.w}
      />

      {/* Perspective Camera for immersive depth perception */}
      <PerspectiveCamera makeDefault far={225} near={1} fov={16.554} />
    </>
  );
}
