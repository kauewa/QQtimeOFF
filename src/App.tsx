import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Gestor from "./pages/gestor";
import Colaborador from "./pages/colaborador";

//Pesquisar mais sobre as rotas, mas depois que tiver todo o resto pronto//////////////

//Rotas
function App() {

  const token = localStorage.getItem('token');
  const gestor = localStorage.getItem('gestor') === "true";

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        {token ? 
            (gestor ? <> <Route path="/gestor" element={<Gestor />} />
            <Route path="/gestor/colaborador/:id" element={<Gestor />} />
            <Route path="/gestor/solicitacoes/:id" element={<Gestor />} />
            <Route path="/gestor/cadastro" element={<Gestor />} />
            <Route path="/gestor/disponiveis" element={<Gestor />} />
            <Route path="/gestor/aceitos" element={<Gestor />} />
            <Route path="/gestor/ferias" element={<Gestor />} />
            <Route path="/gestor/atrasos" element={<Gestor />} />
            <Route path="/gestor/solicitacoes" element={<Gestor />} />
            </> 
            : <Route path="/colaborador" element={<Colaborador />} />)
         : 
          <Route path="*" element={<h1>error</h1>} />
        }


      </Routes>
    </BrowserRouter>

  );
}

export default App;


