import { useLocation, useParams } from "react-router-dom";
import { ContainerLateralGestor, Main } from "../../Components/Divisões/pg2";
import CadastrarColaborador from "./cadastro";
import Dashboard from "./dashboard";
import GestorColaborador from "./gColaborador";
import Solicitacao from "./solicitacao";
import Solicitacoes from "./solicitacoes";


//O centro de todo o gestor
export default function Gestor(){
    const { id } = useParams();
    const localizacao = useLocation();
    
    return(
        <>
            <ContainerLateralGestor/>
            <Main>
                {/* verificação da rota */}
                {localizacao.pathname === '/gestor/solicitacoes' ? (<Solicitacoes/>) : 
                (localizacao.pathname === '/gestor/cadastro' ? (<CadastrarColaborador/>): 
                (localizacao.pathname === `/gestor/colaborador/${id}` ? (<GestorColaborador/>): 
                (localizacao.pathname === `/gestor/solicitacoes/${id}` ? (<Solicitacao/>):  <Dashboard/>)))}
            </Main>
        </>
    )
}