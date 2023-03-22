import { useLocation, useParams } from "react-router-dom";
import { ContainerLateralGestor, Main } from "../../Components/Divisões/pg2";
import CadastrarColaborador from "./cadastro";
import Dashboard from "./dashboard";
import GestorColaborador from "./gColaborador";
import Solicitacao from "./solicitacao";
import Solicitacoes from "./solicitacoes";


//O centro de todo o gestor
export default function Gestor(){
    const { idcolaborador, id } = useParams();
    const localizacao = useLocation();
    
    return(
        <>
            <ContainerLateralGestor/>
            <Main>
                {/* verificação da rota */}
                {localizacao.pathname === `/gestor/${id}/solicitacoes` ? (<Solicitacoes/>) : 
                (localizacao.pathname === `/gestor/${id}/cadastro` ? (<CadastrarColaborador/>): 
                (localizacao.pathname === `/gestor/${id}/colaborador/${idcolaborador}` ? (<GestorColaborador/>): 
                (localizacao.pathname === `/gestor/${id}solicitacoes/${idcolaborador}` ? (<Solicitacao/>):  <Dashboard/>)))}
            </Main>
        </>
    )
}