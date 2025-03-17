import * as THREE from "three";
import { useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Nodes } from "../../Types/types";
import fragment from "../../Shaders/PC/fragment";
import vertex from "../../Shaders/PC/vertex";
import { useData } from "../../Context/ContextProvider";
import gsap from "gsap";
import PCScreen from "../UI/3DHTML/PCScreen";

/**
 * PC Component
 * This component renders the PC screen in the 3D environment, applying a custom shader for effects.
 * The opacity of the screen is animated based on user interactions.
 *
 * @param {Object} props - The props for the component.
 * @param {Nodes} props.nodes - The nodes from the loaded 3D model.
 *
 * @returns {JSX.Element} The PC screen with shader effects and UI overlay.
 */
function PC({ nodes }: { nodes: Nodes }) {
  const { position, view } = useData(); // Get the current scene position and view context
  const [opacity, setOpacity] = useState(0); // State to control screen opacity

  /**
   * Determines the duration of the opacity transition based on the current view and position.
   * If the user is not focusing on the PC, the transition should be instant.
   *
   * @returns {number} Transition duration (0 for instant, 1 for smooth fade-in/fade-out)
   */
  const TimeOut = () => {
    if (view.x !== -1) {
      return 0; // Instantly change opacity if another view is active
    }
    if (position !== 1) {
      return 1; // Smooth transition otherwise
    }
  };

  /**
   * Effect to animate the opacity of the PC screen when the position or view changes.
   * Uses GSAP to create a smooth transition effect.
   */
  useEffect(() => {
    gsap.to(
      { value: opacity },
      {
        value: position === 2 && view.x === -1 ? 1 : 0, // Opacity is 1 if the PC view is active
        duration: TimeOut(),
        ease: "power2.inOut",
        onUpdate: function () {
          setOpacity(this.targets()[0].value); // Update opacity state
        },
      }
    );
  }, [position, view]);

  /**
   * Creates a custom shader material for the PC screen, with a time-based effect.
   * The material is memoized to ensure it is not re-created unnecessarily.
   */
  const pcShaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 }, // Time uniform for dynamic effects
        },
        vertexShader: vertex,
        fragmentShader: fragment,
      }),
    []
  );

  /**
   * Updates the shader's time uniform on each frame for animated effects.
   */
  useFrame(({ clock }) => {
    pcShaderMaterial.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh
      geometry={nodes.Lights_1.geometry} // Apply the correct geometry from the model
      material={pcShaderMaterial} // Assign the custom shader material
      position={[-5.172, 2.681, -1.792]} // Set the PC screen position
      rotation={[Math.PI, 0, Math.PI]} // Rotate to match the correct orientation
    >
      {/* Keep PC screen UI mounted and update opacity dynamically */}
      <PCScreen opacity={opacity} />
    </mesh>
  );
}

export default PC;