import { useData } from "../../../Context/ContextProvider";
import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Project } from "../../../Types/types";
import { BiCollapseAlt, BiExpandAlt } from "react-icons/bi";

/**
 * ProjectCards Component
 * - Displays individual project cards with expandable details.
 * - Uses GSAP for smooth expansion animations.
 * - Supports theme-based styling.
 */
function ProjectCards({ project }: { project: Project }) {
  const { theme } = useData();
  const cardRef = useRef<HTMLDivElement>(null);

  // State for theme-based inversion effect
  const [invert, setInvert] = useState("invert-0");

  // State to track expanded view
  const [expand, setExpand] = useState(false);

  // Update inversion effect based on theme
  useEffect(() => {
    setInvert(
      theme === "dark" ? "invert-75" : theme === "light" ? "invert-0" : "invert-95"
    );
  }, [theme]);

  /**
   * Toggles card expansion using GSAP animation.
   */
  const handleClick = useCallback(() => {
    gsap.to(cardRef.current, {
      width: expand ? 300 : 600,
      duration: 0.3,
      ease: "power2.out",
    });
    setExpand((prev) => !prev);
  }, [expand]);

  return (
    <div
      ref={cardRef}
      className={`${
        project.bg
      } w-full md:w-[300px] h-full mx-auto md:mx-1 rounded-2xl md:grid md:grid-cols-[300px_300px] overflow-hidden md:grid-rows-1 shadow-lg border-2 ${
        theme === "light" ? "border-gray-900" : "border-slate-200"
      }`}
    >
      {/* Left Section: Iframe, Title, Description (Mobile), Buttons */}
      <div className="w-full md:w-[300px] h-full flex flex-col justify-evenly py-2 items-center">
        {/* Embedded Project Preview */}
        <iframe
          src={project.link}
          className="w-4/5 md:w-[260px] h-4/7 md:5/7 rounded-2xl"
          title="Embedded Page"
          scrolling="no"
        />

        {/* Project Title */}
        <h3 className={`${invert} text-lg font-semibold w-3/4 text-center lobster my-0.5 sm:my-1 md:my-2`}>
          {project.title}
        </h3>

        {/* Mobile-Only Description */}
        <div className="mx-4 mb-1.25 md:mb-2 italic text-xs bg-white/10 rounded-lg px-2 py-0.5 md:py-1 md:hidden">
          {project.description}
        </div>

        {/* Buttons: Visit & Expand */}
        <div className="flex justify-center items-center md:gap-2">
          {/* Visit Button */}
          <a
            href={project.link}
            className={`${invert} ${
              theme === "light" ? "border-slate-200" : "border-gray-900"
            } invert-100 bg-cyan-300 py-1 px-1.5 rounded-lg lobster border-2`}
          >
            Visit
          </a>

          {/* Expand Button (Only on Desktop) */}
          <div
            className={`${invert} ${
              theme === "light" ? "border-slate-200" : "border-gray-900"
            } hidden md:flex invert-100 bg-yellow-600 py-1 px-1.5 rounded-lg lobster border-2 cursor-pointer h-9 w-11 justify-center items-center text-xl`}
            onClick={handleClick}
          >
            {expand ? <BiCollapseAlt /> : <BiExpandAlt />}
          </div>
        </div>
      </div>

      {/* Right Section: Detailed Description & Key Points (Desktop Only) */}
      <div className="w-[300px] h-full py-4 px-2 hidden md:block">
        {/* Detailed Description */}
        <div className="my-3 font-semibold italic bg-white/30 rounded-lg px-2 py-1">
          {project.description}
        </div>

        {/* Key Points List */}
        {project.keyPoints.map((data, index) => (
          <div key={index} className="my-2 rounded-lg py-1 px-4 bg-white/10 text-sm">
            &#9673; {data}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectCards;
