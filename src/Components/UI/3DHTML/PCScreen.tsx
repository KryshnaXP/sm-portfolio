import { Html } from "@react-three/drei";
import { ImCalculator } from "react-icons/im";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { PiCpuFill, PiReadCvLogoFill } from "react-icons/pi";
import { useData } from "../../../Context/ContextProvider";
import MyCalendar from "../Widgets/Calender";
import { useState } from "react";
import Clock from "../Widgets/Clock";
import Calculator from "../Widgets/Calculator";

/**
 * PCScreen Component
 * - Simulates a 3D desktop screen with interactive icons for various applications.
 * - Uses `@react-three/drei`'s `Html` for rendering UI elements in a 3D scene.
 * - Provides access to a **Calculator, Clock, Calendar, Resume**, and **Performance Tracker**.
 * - Uses **GSAP-style transitions** to control opacity and visibility.
 * - Prevents interaction when opacity is `0` to optimize performance.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.opacity - Controls the visibility of the screen and elements.
 * @returns {JSX.Element} - A UI-rendered interactive screen inside a 3D scene.
 */
function PCScreen({ opacity }: { opacity: number }) {
  const { perf, setPerf } = useData(); // Access global performance state
  const [App, setApp] = useState(2); // State to manage active app (Calculator, Calendar, or Clock)

  return (
    <Html
      transform
      position={[0, 1.4, 0.065]}
      rotation={[0, -Math.PI / 2, 0]}
      className={opacity === 0 ? "hidden" : "block"}
      distanceFactor={1.17}
    >
      {/* Desktop UI Container */}
      <div
        className="w-222 h-130 bg-desktop text-white transition-opacity flex justify-center items-center gap-12"
        style={{
          opacity,
          pointerEvents: opacity === 0 ? "none" : "auto", // Disable interaction when hidden
        }}
      >
        {/* Left Column - Calculator & Performance Tracker */}
        <div className="mt-10">
          {/* Calculator Icon */}
          <div
            className="bg-teal-600 w-28 h-28 cursor-pointer rounded-2xl hover:brightness-125 hover:scale-105 text-5xl flex justify-center items-center"
            onClick={() => setApp(0)}
          >
            <ImCalculator />
          </div>
          <div className="text-center mt-4 mb-8 bg-black/20 rounded-full text-lg italic">
            Calc
          </div>

          {/* Performance Tracker Toggle */}
          <div
            className={`bg-teal-600 w-28 h-28 cursor-pointer rounded-2xl hover:brightness-125 hover:scale-105 text-5xl flex justify-center items-center ${
              perf ? " brightness-120" : null
            }`}
            onClick={() => setPerf(!perf)}
          >
            <PiCpuFill />
          </div>
          <div className="text-center mt-4 mb-8 bg-black/20 rounded-full text-lg italic">
            Perf
          </div>
        </div>

        {/* Middle Column - Calendar & Resume */}
        <div className="mt-10">
          {/* Calendar Icon */}
          <div
            className="bg-teal-600 w-28 h-28 cursor-pointer rounded-2xl hover:brightness-125 hover:scale-105 text-5xl flex justify-center items-center"
            onClick={() => setApp(1)}
          >
            <FaCalendarAlt />
          </div>
          <div className="text-center mt-4 mb-8 bg-black/20 rounded-full text-lg italic">
            Calendar
          </div>

          {/* Resume Link */}
          <a
            className="bg-teal-600 w-28 h-28 cursor-pointer rounded-2xl hover:brightness-125 hover:scale-105 text-5xl flex justify-center items-center"
            href="/PDF/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PiReadCvLogoFill />
          </a>
          <div className="text-center mt-4 mb-8 bg-black/20 rounded-full text-lg italic">
            Resume
          </div>
        </div>

        {/* Right Column - Clock & AI (Disabled) */}
        <div className="mt-10">
          {/* Clock Icon */}
          <div
            className="bg-teal-600 w-28 h-28 cursor-pointer rounded-2xl hover:brightness-125 hover:scale-105 text-5xl flex justify-center items-center"
            onClick={() => setApp(2)}
          >
            <FaClock />
          </div>
          <div className="text-center mt-4 mb-8 bg-black/20 rounded-full text-lg italic">
            Clock
          </div>

          {/* AI Button (Currently Disabled) */}
          <div className="bg-teal-600 w-28 h-28 cursor-not-allowed rounded-2xl hover:brightness-125 hover:scale-105 lobster flex justify-center items-center text-4xl">
            A.I
          </div>
          <div className="text-center mt-4 mb-8 bg-black/20 rounded-full text-lg italic">
            A.I
          </div>
        </div>

        {/* Dynamic App Display: Shows Calculator, Calendar, or Clock */}
        {App === 0 ? <Calculator /> : App === 1 ? <MyCalendar /> : <Clock />}
      </div>
    </Html>
  );
}

export default PCScreen;
