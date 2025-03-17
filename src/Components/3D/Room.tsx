import * as THREE from "three";
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { Nodes } from "../../Types/types"; // Importing custom types
import fragment from "../../Shaders/Room/fragment"; // Importing fragment shader code
import vertex from "../../Shaders/Room/vertex"; // Importing vertex shader code
import NamePlate from "../UI/3DHTML/NamePlate";
import { useData } from "../../Context/ContextProvider";
import { TbCircleLetterIFilled, TbCodeCircle2Filled } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa";
import { MdOutlineShareLocation } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { IoGameController } from "react-icons/io5";

/**
 * Room Component
 *
 * This component represents the room's 3D environment with a custom shader-based material.
 * It dynamically blends between two textures (light and dark) based on the blend factor.
 *
 * @param {Nodes} nodes - The 3D model nodes containing the room geometry.
 * @param {number} blend - The blend factor controlling the transition between light and dark textures.
 * @returns {JSX.Element} - The Room component.
 */
function Room({ nodes, blend }: { nodes: Nodes; blend: number }): any {
  const { position, view } = useData();

  // Load both textures for the room (light mode and dark mode)
  const [lightTexture, darkTexture] = useTexture([
    "./Texture/Final_Light_Texture_c.jpg",
    "./Texture/Final_Dark_Texture_c.jpg",
  ]);

  // Ensure textures are not flipped (for correct mapping)
  lightTexture.flipY = darkTexture.flipY = false;

  // Memoize ShaderMaterial to optimize performance and prevent unnecessary re-renders
  const basicShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: lightTexture }, // Light mode texture
        uTexture2: { value: darkTexture }, // Dark mode texture
        uBlend: { value: blend }, // Blend factor for dynamic transitions
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
  }, [lightTexture, darkTexture]);

  // Update blend factor dynamically to enable smooth transitions
  basicShaderMaterial.uniforms.uBlend.value = blend;

  return (
    <mesh
      geometry={nodes.Room.geometry} // Assign room geometry
      material={basicShaderMaterial} // Apply shader-based material
      position={[0, -3, 0]} // Set position in the scene
    >
      <NamePlate
        name={"About"}
        position={new THREE.Vector3(-4.3, 3.05, -0.6)}
        hide={position === 2 && view.x === -1}
        left={true}
        index={0}
        Symbol={TbCircleLetterIFilled}
      />
      <NamePlate
        name={"Achievements"}
        position={new THREE.Vector3(-4.5, 6.75, -5.8)}
        hide={position === 3 && view.x === -1}
        left={true}
        index={1}
        Symbol={FaTrophy}
      />
      <NamePlate
        name={"Skills"}
        position={new THREE.Vector3(-5, 5.85, -5.15)}
        hide={position === 3 && view.x === -1}
        left={false}
        index={2}
        Symbol={TbCodeCircle2Filled}
      />
      <NamePlate
        name={"Location"}
        position={new THREE.Vector3(-5.5, 6.45, -4.4)}
        hide={position === 3 && view.x === -1}
        left={false}
        index={3}
        Symbol={MdOutlineShareLocation}
      />
      <NamePlate
        name={"Projects"}
        position={new THREE.Vector3(4.3, 1.5, 3.7)}
        hide={position === 4 && view.x === -1}
        left={true}
        index={4}
        Symbol={GoProjectRoadmap}
      />
      <NamePlate
        name={"Games"}
        position={new THREE.Vector3(2.7, 1.5, 4.1)}
        hide={position === 4 && view.x === -1}
        left={false}
        index={5}
        Symbol={IoGameController}
      />
    </mesh>
  );
}

export default Room;
