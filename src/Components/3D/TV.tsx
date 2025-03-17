import * as THREE from "three";
import { useData } from "../../Context/ContextProvider";
import { useEffect, useState, useMemo } from "react";
import { Nodes } from "../../Types/types"; // Importing custom types
import gsap from "gsap"; // Importing GSAP for animations
import { useFrame } from "@react-three/fiber"; // Importing useFrame to update animation on each frame
import TVScreen from "../UI/3DHTML/TVScreen"; // Importing TVScreen UI component
import fragment from "../../Shaders/TV/fragment"; // Importing fragment shader code
import vertex from "../../Shaders/TV/vertex"; // Importing vertex shader code
import { useTexture } from "@react-three/drei"; // Importing texture loader

/**
 * TV Component
 *
 * This component represents a TV screen in the 3D scene.
 * It applies a shader-based video texture to a mesh, simulating a functional TV display.
 *
 * @param {Nodes} nodes - The 3D model nodes containing the TV geometry.
 * @returns {JSX.Element} - The TV component.
 */
function TV({ nodes }: { nodes: Nodes }) {
  const { position } = useData(); // Access global state to determine TV visibility
  const [opacity, setOpacity] = useState(0); // State to control TV screen opacity

  // Load texture for the TV background
  const [Texture] = useTexture(["./Texture/TVBG.png"]);

  // Memoize ShaderMaterial to optimize performance and prevent unnecessary re-renders
  const tvShaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 }, // Time uniform for shader animation
          uTexture: { value: Texture }, // TV screen texture
        },
        vertexShader: vertex, // Assign vertex shader
        fragmentShader: fragment, // Assign fragment shader
      }),
    [Texture]
  );

  // Update the shader's time uniform every frame for animation effects
  useFrame(({ clock }) => {
    tvShaderMaterial.uniforms.uTime.value = clock.elapsedTime;
  });

  // Animate opacity based on the position state (visibility toggle)
  useEffect(() => {
    gsap.to(
      { value: opacity }, // Target opacity value
      {
        value: position === 1 ? 1 : 0, // Fully visible if position is 1, else hidden
        duration: 0.5, // Smooth transition duration
        ease: "power2.inOut", // Easing function for smooth animation
        onUpdate: function () {
          setOpacity(this.targets()[0].value); // Update opacity state dynamically
        },
      }
    );
  }, [position]);

  return (
    <>
      <mesh
        geometry={nodes.Lights_3.geometry} // Assign TV screen geometry
        position={[1.843, 1.358, -5.55]} // Set position in the scene
        rotation={[0, -Math.PI / 2, 0]} // Rotate to align with the scene
        scale={1} // Scale TV screen to fit scene
        material={tvShaderMaterial} // Apply shader-based material for display effects
      >
        <TVScreen opacity={opacity} /> {/* Render TV screen UI component with dynamic opacity */}
      </mesh>
    </>
  );
}

export default TV;
