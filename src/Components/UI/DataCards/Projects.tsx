import ProjectCards from "./ProjectCards";
import projects from "../../../Data/ProjectData";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useData } from "../../../Context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Projects Component
 * - Displays a horizontally scrollable list of project cards.
 * - Uses GSAP for smooth scrolling animations.
 * - Adapts styles dynamically based on the selected theme.
 */
function Projects() {
  // Access theme from context provider
  const { theme } = useData();
  
  // Reference for the scrollable container
  const containerRef = useRef<HTMLDivElement>(null);

  // State for controlling invert filter based on theme
  const [invert, setInvert] = useState("invert-0");

  /**
   * Updates the invert filter class based on theme selection.
   * - "dark" → High inversion (invert-90).
   * - "light" → No inversion (invert-0).
   * - "neutral" themes → Maximum inversion (invert-95).
   */
  useEffect(() => {
    if (theme === "dark") {
      setInvert("invert-90");
    } else if (theme === "light") {
      setInvert("invert-0");
    } else {
      setInvert("invert-95");
    }
  }, [theme]);

  /**
   * Handles left scroll movement using GSAP.
   * - Moves the container 650px to the left with smooth animation.
   */
  const handleScrollLeft = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scrollLeft: "-=650",
        duration: 0.8,
        ease: "expo.out",
      });
    }
  };

  /**
   * Handles right scroll movement using GSAP.
   * - Moves the container 650px to the right with smooth animation.
   */
  const handleScrollRight = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scrollLeft: "+=650",
        duration: 0.8,
        ease: "expo.out",
      });
    }
  };

  return (
    <div className="md:flex h-full md:h-auto">
      {/* Left Scroll Button (Only visible on larger screens) */}
      <div className="w-1/12 hidden md:flex items-center p-2">
        <div
          className="text-4xl flex justify-center items-center w-full bg-white/30 h-1/3 rounded-l-3xl rounded-r-lg cursor-pointer"
          onClick={handleScrollLeft}
        >
          <span className={invert}>
            <FaAngleDoubleLeft />
          </span>
        </div>
      </div>

      {/* Scrollable Project Cards Container */}
      <div
        className="h-full w-full md:w-5/6 md:flex overflow-x-scroll md:space-x-4 custom-scrollbar"
        ref={containerRef}
      >
        {projects.map((project) => (
          <div key={project.id} className="snap-center h-5/6 md:h-auto w-full p-2 md:p-0">
            <ProjectCards project={project} />
          </div>
        ))}
      </div>

      {/* Right Scroll Button (Only visible on larger screens) */}
      <div className="w-1/12 items-center p-2 hidden md:flex">
        <div
          className="text-4xl flex justify-center items-center w-full bg-white/30 h-1/3 rounded-r-3xl rounded-l-lg cursor-pointer"
          onClick={handleScrollRight}
        >
          <span className={invert}>
            <FaAngleDoubleRight />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Projects;
