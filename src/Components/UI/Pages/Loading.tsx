import { useEffect, useRef} from "react";
import gsap from "gsap"; // Library for smooth animations
import Lottie from "lottie-react"; // Lottie component to render animations
import animationData from "../../../Assets/Loaders/Loader.json"; // Lottie animation file
import { useData } from "../../../Context/ContextProvider";

/**
 * LottieAnimation Component
 * Renders a responsive Lottie animation loader.
 *
 * @returns {JSX.Element} A resizable Lottie animation container.
 */
const LottieAnimation = () => {
  return (
    <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

/**
 * Loading Component
 * Displays a full-screen loading animation that disappears when assets are fully loaded.
 *
 * - Uses @react-three/drei's `useProgress` to track asset loading progress.
 * - Uses GSAP to animate the loader sliding down once loading is complete.
 *
 * @returns {JSX.Element} A loading screen component with animation.
 */
function Loading() {
  const { progress } = useData();
  const loaderRef = useRef<HTMLDivElement | null>(null); // Reference to the loader container

  useEffect(() => {

    // When loading progress reaches 100%, slide the loader down and remove it from the DOM
    if (progress === 1 && loaderRef.current) {
      gsap.to(loaderRef.current, {
        y: "120%", // Move loader down off-screen
        duration: 0.8, // Animation duration
        delay: 1.5, // Delay before animation starts
        ease: "power3.inOut", // Smooth easing function
        onComplete: () => {
          loaderRef.current?.remove(); // Remove the loader element from the DOM after animation
        },
      });
    }

  }, [progress]); // Runs when `progress` changes

  

  return (
    <div
      ref={loaderRef}
      className="fixed bg-gradient-full w-screen h-[120%] z-20 bottom-0 flex justify-center items-center"
    >
      <LottieAnimation />
    </div>
  );
}

export default Loading;
