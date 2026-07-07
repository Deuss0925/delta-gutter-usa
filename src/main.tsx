import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted fonts (no network round-trip to Google Fonts)
import "@fontsource-variable/archivo";
import "@fontsource-variable/manrope";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
