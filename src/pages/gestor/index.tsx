import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContainerLateralGestor, Main } from "../../Components/Divisões/pg2";
import { ListaProvider } from "../../context/contextGestor";
import CadastrarColaborador from "./cadastro";
import Dashboard from "./dashboard";
import GestorColaborador from "./gColaborador";
import Solicitacao from "./solicitacao";
import Solicitacoes from "./solicitacoes";


//O centro de todo o gestor
export default function Gestor() {
    const { idcolaborador, id } = useParams();
    const localizacao = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            const m: any = jwtDecode(token)
            if (localStorage.getItem('gestor') === "false") {
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
                            (localizacao.pathname === `/gestor/${id}solicitacoes/${idcolaborador}` ? (<Solicitacao />) : <Dashboard />)))}
            </Main>
        </ListaProvider>
    )
}