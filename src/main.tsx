import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles/global.css";
import "./Styles/fonts.css";
import "./Styles/tailwind.css";
import App from "./App.js";
import { ThemeProvider } from "./Context/ContextProvider.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
