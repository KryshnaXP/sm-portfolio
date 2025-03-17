import { Info } from "../Types/types";

// Initial game board state for Tic-Tac-Toe
const TTTdata: Info[] = [
  { id: 1, condition: -1 }, // -1 represents an empty cell
  { id: 2, condition: -1 },
  { id: 3, condition: -1 },
  { id: 4, condition: -1 },
  { id: 5, condition: -1 },
  { id: 6, condition: -1 },
  { id: 7, condition: -1 },
  { id: 8, condition: -1 },
  { id: 9, condition: -1 },
];

// Winning patterns for Tic-Tac-Toe (0-based index)
export const winPatterns = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Main diagonal
  [2, 4, 6], // Anti-diagonal
];

export default TTTdata;
