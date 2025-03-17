import {
  SiHtml5,
  SiCss3,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiExpress,
  SiThreedotjs,
  SiBlender,
  SiNodedotjs,
  SiTensorflow,
  SiChartdotjs,
} from "react-icons/si";
import { FaSquareJs, FaVuejs, FaCodeBranch } from "react-icons/fa6";
import { TbBrandReact, TbBrandVite, TbSql, TbMathFunction } from "react-icons/tb";
import { GiTwoHandedSword } from "react-icons/gi";

const skills = [
  {
    // Frontend development technologies
    title: "Frontend",
    value: [
      <SiHtml5 />, // HTML5 - Markup language for structuring web content
      <SiCss3 />, // CSS3 - Styling for web pages
      <FaSquareJs />, // JavaScript - Core scripting language for web development
      <SiTypescript />, // TypeScript - Typed superset of JavaScript
      <FaVuejs />, // Vue.js - Progressive JavaScript framework
      <TbBrandReact />, // React - JavaScript library for building UI components
      <SiNextdotjs />, // Next.js - React framework for SSR & static site generation
      <TbBrandVite />, // Vite - Fast frontend tooling for modern web development
      <SiTailwindcss />, // Tailwind CSS - Utility-first CSS framework
    ],
  },
  {
    // Backend technologies
    title: "Backend",
    value: [
      <SiNodedotjs />, // Node.js - JavaScript runtime for server-side development
      <SiExpress />, // Express.js - Minimalist web framework for Node.js
    ],
  },
  {
    // 3D Modeling & Graphics-related technologies
    title: "3D & Graphics",
    value: [
      <SiThreedotjs />, // Three.js - 3D JavaScript library for WebGL
      <div className="-rotate-45">
        <GiTwoHandedSword /> {/* Symbolizing advanced 3D & game development */}
      </div>,
      <SiBlender />, // Blender - 3D modeling and animation software
    ],
  },
  {
    // Databases & storage solutions
    title: "Databases",
    value: [
      <SiMongodb />, // MongoDB - NoSQL database for scalable applications
      <TbSql />, // SQL - Structured Query Language for relational databases
      <SiFirebase />, // Firebase - Backend-as-a-service with real-time DB & authentication
    ],
  },
  {
    // Core computing concepts & logic
    title: "Computing & Logic",
    value: [
      <TbMathFunction />, // Symbolizing algorithms & optimization techniques
      <FaCodeBranch />, // Represents data structures and version control
      <SiTensorflow />, // TensorFlow - AI/ML framework for deep learning models
      <SiChartdotjs />, // Chart.js - Data visualization and statistical modeling
    ],
  },
];

export default skills;
