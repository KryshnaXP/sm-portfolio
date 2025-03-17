import { useData } from "../../../Context/ContextProvider";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Achievements from "./Achievements";
import Skills from "./Skills";
import Location from "./Location";
import About from "./About";
import Projects from "./Projects";

/**
 * DataCard Component
 * - Displays detailed views for About, Achievements, Skills, Location, and Projects.
 * - Uses GSAP for smooth entrance and exit animations.
 * - Supports dark, light, and custom themes with conditional inversion.
 * - Controlled via `view` state from the global context.
 */

function DataCard() {
  const { theme, view, setView } = useData();
  const [invert, setInvert] = useState("invert-0");
  const cardRef = useRef<HTMLDivElement>(null); // Ref for GSAP animation

  /**
   * Effect Hook: Handles slide-in and slide-out animations based on `view.x`.
   * - Moves card into view when `view.x` is not -1.
   * - Moves card out of view when `view.x` is -1.
   */
  useEffect(() => {
    if (view.x !== -1) {
      gsap.to(cardRef.current, {
        x: 0, // Move into view
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(cardRef.current, {
        x: "-100%", // Move out of view
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [view.x]);

  /**
   * Effect Hook: Updates image inversion based on the selected theme.
   * - Dark theme applies moderate inversion (invert-75).
   * - Light theme applies no inversion (invert-0).
   * - Custom theme applies slight inversion (invert-95).
   */
  useEffect(() => {
    setInvert(
      theme === "dark" ? "invert-75" : theme === "light" ? "invert-0" : "invert-95"
    );
  }, [theme]);

  /**
   * Handles closing the DataCard view by resetting `view` state.
   */
  const handleClose = () => {
    setView({ x: -1, y: "Overview" });
  };

  return (
    <div
      ref={cardRef}
      className="fixed w-screen h-screen md:h-[75%] md:w-[75%] top-0 pt-[15%] md:pt-0 md:top-[15%] bg-secondary md:rounded-r-4xl pb-32 pl-2 pr-12 md:p-4 z-5"
      style={{ transform: "translateX(-100%)", opacity: 0 }} // Initial position off-screen
    >
      {/* Header Section - Displays title and close button */}
      <div
        className={`${invert} lobster text-2xl xl:text-3xl 2xl:text-4xl px-6 md:px-10 xl:px-16 py-8 flex justify-between`}
      >
        <span>&#9673; {view.y}</span>
        <span
          className="coustard rotate-45 scale-200 cursor-pointer"
          onClick={handleClose}
        >
          +
        </span>
      </div>

      {/* Content Section - Conditionally renders selected view */}
      {view.x !== 4 ? (
        <div
          className={`${invert} w-full h-[calc(100%-100px)] rounded-[16px] overflow-scroll custom-scrollbar bg-white/1`}
        >
          {view.x === 0 && <About />}
          {view.x === 1 && <Achievements />}
          {view.x === 2 && <Skills />}
          {view.x === 3 && <Location />}
        </div>
      ) : (
        <div className="w-full h-[calc(100%-100px)] rounded-[16px]">
          <Projects />
        </div>
      )}
    </div>
  );
}

export default DataCard;
