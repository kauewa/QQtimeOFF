import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Gestor from "./pages/gestor";
import Colaborador from "./pages/colaborador";



//Rotas
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gestor/:id" element={<Gestor />} />
        <Route path="/gestor/:id/perfil" element={<Gestor />} />
        <Route path="/gestor/:id/colaborador/:idcolaborador" element={<Gestor />} />
        <Route path="/gestor/:id/solicitacoes/:idsolicitacao" element={<Gestor />} />
        <Route path="/gestor/:id/minhasolicitacao/:idsolicitacao" element={<Gestor />} />
        <Route path="/gestor/:id/cadastro" element={<Gestor />} />
        <Route path="/gestor/:id/disponiveis" element={<Gestor />} />
        <Route path="/gestor/:id/aceitos" element={<Gestor />} />
        <Route path="/gestor/:id/ferias" element={<Gestor />} />
        <Route path="/gestor/:id/atrasos" element={<Gestor />} />
        <Route path="/gestor/:id/solicitacoes" element={<Gestor />} />
        <Route path="/colaborador/:id" element={<Colaborador />} />
        <Route path="/colaborador/:id/minhasolicitacao/:idsolicitacao" element={<Colaborador />} />
        <Route path="*" element={<h1>error</h1>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;


