import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/home";
import Alerta from "./components/alerta";
import BarraNavegacao from "./components/navbar";
import Orgao from "./views/orgao";
import { useEstadoGlobal } from "./context/useEstadoGlobal";
import { RotaProtegida } from "./routes/rota";

function App() {
  const { permissoes } = useEstadoGlobal();

  return (
    <Router>
      <BarraNavegacao />
      <Alerta />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {permissoes.orgao.length && (
            <Route
              path="/orgao"
              element={
                <RotaProtegida podeAcessar={!!permissoes.orgao.length}>
                  <Orgao />
                </RotaProtegida>
              }
            />
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

{
  /* <Route path="/orgao" element={<Home />} /> */
}
{
  /* <Route path="/orgao" element={<Profile />}>
            <Route path="users/:userId" element={<UserDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route> */
}
{
  /* <Route path="/contact" element={<Contact />} /> */
}
