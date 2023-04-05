import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContainerLateralGestor, Main } from "../../Components/Divisões/pg2";
import { ListaProvider } from "../../context/contextGestor";
import { MinhaSolicitacao } from "../minhaSolicitacao";
import CadastrarColaborador from "./cadastro";
import Dashboard from "./dashboard";
import GestorColaborador from "./gColaborador";
import Solicitacao from "../solicitacao";
import Solicitacoes from "./solicitacoes";


//Navegação do gestor
export default function Gestor() {
    const { idcolaborador, id, idsolicitacao } = useParams();
    const localizacao = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    //Privacidade de rotas
    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            const m: any = jwtDecode(token)
            if (m.gestor === false) {
                navigate(`/colaborador/${m.matricula}`)
            }
        }
    }, [])



    return (
        <ListaProvider>
            <ContainerLateralGestor />
            <Main>
                {/* verificação da rota */}
                {localizacao.pathname === `/gestor/${id}/solicitacoes` ? (<Solicitacoes />) :
                    (localizacao.pathname === `/gestor/${id}/cadastro` ? (<CadastrarColaborador />) :
                        (localizacao.pathname === `/gestor/${id}/colaborador/${idcolaborador}` ? (<GestorColaborador />) :
                            (localizacao.pathname === `/gestor/${id}/solicitacoes/${idsolicitacao}` ? (<Solicitacao />) :
                                (localizacao.pathname === `/gestor/${id}/perfil` ? <MinhaSolicitacao /> :
                                    (localizacao.pathname === `/gestor/${id}/minhasolicitacao/${idsolicitacao}`) ? <Solicitacao /> : <Dashboard />))))}
            </Main>
        </ListaProvider>
    )
}