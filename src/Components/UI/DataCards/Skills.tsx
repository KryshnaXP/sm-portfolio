import { FaCode, FaServer, FaDatabase, FaCube, FaBrain } from "react-icons/fa";
import skills from "../../../Data/SkillsData.tsx";

/**
 * Layout Configuration for Skill Categories
 * - Defines grid positioning and background color for each category.
 */
const layout = [
  { position: "md:row-start-1 md:col-span-2 bg-red-600/20" }, // Frontend
  { position: "md:row-start-2 md:col-span-1 bg-yellow-600/20" }, // Backend
  { position: "md:row-start-2 md:col-span-2 bg-purple-600/20" }, // Databases
  { position: "md:row-start-1 md:col-span-1 bg-blue-600/20" }, // 3D & Graphics
  { position: "md:row-span-2 md:col-start-4 bg-green-600/20" }, // Core Concepts
];

/**
 * Icon Mapping for Skill Categories
 * - Each category is assigned an appropriate icon.
 */
const icons = [
  FaCode, // Frontend
  FaServer, // Backend
  FaCube, // 3D & Graphics
  FaDatabase, // Databases
  FaBrain, // Core Concepts
];

/**
 * Skills Component
 * - Displays a grid layout of skill categories.
 * - Each category includes:
 *   - An icon representing the category.
 *   - A title for the category.
 *   - A list of relevant skills.
 * - Uses TailwindCSS for styling and hover effects.
 */
export default function Skills() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 p-4">
      {skills.map((skill, index) => {
        const Icon = icons[index]; // Assign corresponding icon dynamically

        return (
          <div
            key={index}
            className={`border-2 hover:brightness-125 hover:scale-105 transition-all px-4 py-6 rounded-2xl flex flex-col justify-center items-center shadow-md ${layout[index]?.position}`}
          >
            {/* Skill Category Icon */}
            <div className="w-7 h-7 xl:w-10 xl:h-10 flex justify-center items-center">
              <Icon className="text-2xl xl:text-4xl mb-1.25 xl:mb-2 text-gray-800" />
            </div>

            {/* Skill Category Title */}
            <span className="text-base xl:text-lg font-bold text-center">{skill.title}</span>

            {/* Skill List */}
            <div className="w-full flex flex-wrap justify-center gap-1.5">
              {skill.value.map((value, index) => (
                <div
                  className="p-2.5 rounded-lg bg-white/20 hover:scale-105 hover:brightness-110"
                  key={index}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
