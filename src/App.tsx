import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/login";
import Gestor from "./pages/gestor";
import Colaborador from "./pages/colaborador";

//Pesquisar mais sobre as rotas, mas depois que tiver todo o resto pronto//////////////

//Rotas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/colaborador" element={<Colaborador />}/>
        <Route path="/gestor" element={<Gestor />}/>
        <Route path="/gestor/colaborador/:id" element={<Gestor />}/>
        <Route path="/gestor/solicitacoes/:id" element={<Gestor />}/>
        <Route path="/gestor/cadastro" element={<Gestor />}/>
        <Route path="/gestor/disponiveis" element={<Gestor />}/>
        <Route path="/gestor/aceitos" element={<Gestor />}/>
        <Route path="/gestor/ferias" element={<Gestor />}/>
        <Route path="/gestor/atrasos" element={<Gestor />}/>
        <Route path="/gestor/solicitacoes" element={<Gestor />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
