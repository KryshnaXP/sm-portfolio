import { HiMiniAcademicCap } from "react-icons/hi2";
import { GrTechnology } from "react-icons/gr";
import { FaBrain, FaTrophy, FaSchool } from "react-icons/fa";
import achievements from "../../../Data/AchievementsData";

/**
 * Achievements Component
 * - Displays a responsive grid layout showcasing various achievements.
 * - Uses Tailwind CSS for styling and animations.
 * - Assigns specific icons to each achievement dynamically.
 */

// Grid layout configuration for different screen sizes
const layout = [
  { position: "md:row-start-1 md:col-start-1 bg-red-600/20" }, // Left Small Box
  { position: "md:row-start-2 md:col-span-2 bg-yellow-600/20" }, // Bottom Left
  { position: "md:row-start-2 md:col-start-3 bg-purple-600/20" }, // Bottom Right
  { position: "md:row-start-1 md:col-span-2 bg-blue-600/20" }, // Center Wide Box
  { position: "md:row-span-2 md:col-start-4 bg-green-600/20" }, // Tall Right Box
];

// Define icons for each achievement
const icons = [FaBrain, GrTechnology, FaSchool, FaTrophy, HiMiniAcademicCap];

export default function Achievements() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 p-1 md:p-2 xl:p-4">
      {achievements.map((achievement, index) => {
        const Icon = icons[index]; // Get the corresponding icon for each achievement

        return (
          <div
            key={index}
            className={`border-2 hover:brightness-125 hover:scale-105 transition-all px-4 py-6 rounded-2xl flex flex-col justify-center items-center shadow-md ${layout[index]?.position}`}
          >
            {/* Achievement Icon */}
            <Icon className="text-2xl xl:text-4xl mb-1.25 xl:mb-2 text-gray-800" />
            
            {/* Achievement Title */}
            <span className="text-sm xl:text-lg font-bold text-center">
              {achievement.title}
            </span>
            
            {/* Achievement Value */}
            <span className="text-center text-xs xl:text-sm bg-white/20 p-1 xl:p-2 rounded-lg">
              {achievement.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
