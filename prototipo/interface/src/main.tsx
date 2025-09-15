import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { ProvedorEstados } from "./context/index.tsx";
import BarraNavegacao from "./components/navbar/index.tsx";
import Alerta from "./components/alerta/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvedorEstados>
      <Alerta />
      <BarraNavegacao />
      <App />
    </ProvedorEstados>
  </StrictMode>
);
