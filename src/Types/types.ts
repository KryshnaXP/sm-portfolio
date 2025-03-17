import * as THREE from "three";

// Define node structure for 3D scene
export type Nodes = {
  Scene: THREE.Group;
  Room: THREE.Mesh;
  Lights_1: THREE.Mesh;
  Lights_2: THREE.Mesh;
  Lights_3: THREE.Mesh;
};

// Theme options
export type Theme = "light" | "neutral" | "dark";

// Define available views
export type View = { 
  x: number; 
  y: "Overview" | "Projects" | "Skills" | "Journey" | string; // Allow predefined views + custom names
};

// Info type with defined condition states
export type Info = {
  id: number;
  condition: -1 | 0 | 1; // Example: -1 = inactive, 0 = neutral, 1 = active
};

// Define the Project type
export type Project = {
  id: number;
  title: string;
  bg: string;
  description: string;
  keyPoints: string[];
  link: string;
};

// Score type
export type Score = { x: number; y: number };
