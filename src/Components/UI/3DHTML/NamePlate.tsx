import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useData } from "../../../Context/ContextProvider";
import { IconType } from "react-icons";

/**
 * NamePlate Component
 * - Displays a floating nameplate with an optional symbol or text.
 * - Uses `@react-three/drei`'s `Html` to integrate with Three.js scenes.
 * - Implements GSAP animations for smooth fade-in and fade-out effects.
 * - Handles click interactions to update the context state.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.name - Display text for the nameplate
 * @param {Vector3} props.position - 3D position in the scene
 * @param {boolean} props.hide - Controls visibility with animations
 * @param {boolean} props.left - Determines the placement of decorative dots
 * @param {number} props.index - Identifier for interaction logic
 * @param {IconType} props.Symbol - React Icon to display instead of text
 * @returns {JSX.Element} - A nameplate UI element in a 3D scene
 */
function NamePlate({ name, position, hide, left, index, Symbol }: {
  name: string;
  position: Vector3;
  hide: boolean;
  left: boolean;
  index: number;
  Symbol: IconType;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setPosition, setView, symbol } = useData();

  /**
   * Handles click interactions to change the view or set a new position.
   * 
   * @param {number} index - Identifier for scene navigation
   * @param {string} name - Name of the section being interacted with
   */
  const handleClick = useCallback((index: number, name: string) => {
    index === 5 ? setPosition(1) : setView({ x: index, y: name });
  }, [setPosition, setView]);

  // GSAP animation for showing and hiding the nameplate
  useEffect(() => {
    if (containerRef.current) {
      gsap.killTweensOf(containerRef.current); // Stop any ongoing animations

      gsap.fromTo(
        containerRef.current,
        { opacity: 0.5, scale: 0 },
        { opacity: hide ? 1 : 0, scale: hide ? 1 : 0, duration: hide ? 1.8 : 0.3, ease: hide ? "expo.out" : "power2.out" }
      );
    }
  }, [hide]);

  return (
    <Html position={position}>
      <div
        ref={containerRef}
        className="bg-black/50 text-slate-300 px-2 py-1 md:px-4 md:py-2 rounded-2xl flex items-center justify-center gap-0.75 md:gap-2 cursor-pointer"
        style={{ opacity: hide ? 1 : 0, transform: `scale(${hide ? 1 : 0})` }}
        onClick={() => handleClick(index, name)}
      >
        {symbol ? (
          <span className="text-2xl rounded-full p-0.5">
            <Symbol />
          </span>
        ) : (
          <>
            <span className={`text-xs sm:text-sm md:text-base ${left ? "block" : "hidden"}`}>&#9673;</span>
            <span className="text-xs sm:text-sm md:text-base">{name}</span>
            <span className={`text-xs sm:text-sm md:text-base ${left ? "hidden" : "block"}`}>&#9673;</span>
          </>
        )}
      </div>
    </Html>
  );
}

export default NamePlate;
