import React, { createContext, useState, useContext, useMemo } from "react";
import { Score, Theme, View } from "../Types/types";

// Define the structure of the context data
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  position: number;
  setPosition: (position: number) => void;
  view: View;
  setView: (view: View) => void;
  games: number;
  setGames: (games: number) => void;
  contact: boolean;
  setContact: (contact: boolean) => void;
  perf: boolean;
  setPerf: (perf: boolean) => void;
  score: Score;
  setScore: (score: Score) => void;
  symbol: boolean;
  setSymbol: (symbol: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

// Create a context with an undefined default value
const Context = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to access the context data
export const useData = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useData must be used within a ThemeProvider");
  }
  return context;
};

// ThemeProvider component to manage global state
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State for managing theme (light/dark mode)
  const [theme, setTheme] = useState<Theme>("light");

  // State for tracking user's position within the application
  const [position, setPosition] = useState<number>(0);

  // State to manage the current view (e.g., Overview, Projects, etc.)
  const [view, setView] = useState<View>({ x: -1, y: "Overview" });

  // State to count number of games played
  const [games, setGames] = useState<number>(0);

  // State to toggle contact section visibility
  const [contact, setContact] = useState<boolean>(false);

  // State to track if performance monitoring is enabled
  const [perf, setPerf] = useState<boolean>(false);

  // State for storing game scores
  const [score, setScore] = useState<Score>({ x: 0, y: 0 });

  // State to manage the player's symbol (X or O)
  const [symbol, setSymbol] = useState<boolean>(false);

  // State to manage the player's symbol (X or O)
  const [progress, setProgress] = useState<number>(0);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      position,
      setPosition,
      view,
      setView,
      games,
      setGames,
      contact,
      setContact,
      perf,
      setPerf,
      score,
      setScore,
      symbol,
      setSymbol,
      progress,
      setProgress,
    }),
    [theme, position, view, games, contact, perf, score, symbol, progress]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
