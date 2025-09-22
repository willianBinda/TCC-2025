import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ProvedorEstados } from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvedorEstados>
      <App />
    </ProvedorEstados>
  </StrictMode>
);
