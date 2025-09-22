import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Alerta from "./components/alerta";
import BarraNavegacao from "./components/navbar";
import Orgao from "./views/orgao";

function App() {
  return (
    <Router>
      <BarraNavegacao />
      <Alerta />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orgao" element={<Orgao />} />
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
