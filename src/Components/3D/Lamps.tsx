import * as THREE from "three";
import { Nodes } from "../../Types/types"; // Importing custom types for nodes
import { useData } from "../../Context/ContextProvider";
import { useMemo } from "react";

/**
 * Lamps Component - Renders a mesh that simulates a lamp light with an emissive material.
 * The emissive intensity of the lamp can be dynamically controlled based on the theme.
 *
 * @param {Object} props - The props for the component.
 * @param {Nodes} props.nodes - Contains the geometry data for the lamp mesh.
 *
 * @returns {JSX.Element} The lamp mesh with emissive material applied.
 */
function Lamps({ nodes }: { nodes: Nodes }) {
  const { theme } = useData();

  // Compute color based on theme using useMemo to optimize performance
  const color = useMemo(() => {
    if (theme === "light") return new THREE.Color("#ffffaa");
    if (theme === "neutral") return new THREE.Color("#ffff45");
    return new THREE.Color("#fff020");
  }, [theme]);

  return (
    <mesh
      geometry={nodes.Lights_2.geometry} // Use geometry from the passed nodes prop
      position={[5.265, 0, -4.543]} // Position of the lamp in the 3D world
    >
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default Lamps;
