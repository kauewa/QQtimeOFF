import { ContainerLateralColaborador, Main } from "../../Components/Divisões/pg2";
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { ColaboradorContext, ColaboradorProvider } from "../../context/contextColaborador";
import { MinhaSolicitacao } from "../minhaSolicitacao";
import Solicitacao from "../solicitacao";




// Falta fazer o cadastro de solicitação
export default function Colaborador() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const colaborador = useContext(ColaboradorContext);
    const localizacao = useLocation();
    console.log(colaborador)
    const {id, idsolicitacao } = useParams();


    //Privacidade de rotas
    useEffect(() => {
        if(!token){
            navigate('/')
        }else{
            const m: any = jwtDecode(token)
            if (m.gestor === true) {
                navigate(`/gestor/${m.matricula}`)
            }
        }
    }, [])

    
    

    return (
        <ColaboradorProvider>
            <ContainerLateralColaborador />
            <Main>
                {localizacao.pathname === `/colaborador/${id}/minhasolicitacao/${idsolicitacao}` ? <Solicitacao /> : <MinhaSolicitacao/>}
            </Main>
        </ColaboradorProvider>

    )
}