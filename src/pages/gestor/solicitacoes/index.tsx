import { useContext } from "react";
import { HeadTipo, HeadLista, Lista } from "../../../Components/Divisões/lista";
import { H1, Hstatus } from "../../../Components/texto";
import { ColaboradoresContext, SolicitacoesContext } from "../../../context/contextGestor";
import ListarSolicitações from "./listagem";


//Fazer ainda
export default function Solicitacoes() {
    const colaboradores = useContext(ColaboradoresContext)
    const solicitacoes = useContext(SolicitacoesContext)
    const solicitacoesPendentes = solicitacoes.filter((sol) => sol.status === "pendente");



    return (
        <>
            <H1>Solicitações</H1>
            <Lista tamanho="large">
                <HeadLista>
                    <HeadTipo tamanho="25%">
                        <Hstatus tamanho="21px" cor="">Nome</Hstatus>
                    </HeadTipo>
                    <HeadTipo tamanho="30%">
                        <Hstatus tamanho="21px" cor="">Inicio</Hstatus>
                    </HeadTipo>
                    <HeadTipo tamanho="15%">
                        <Hstatus tamanho="21px" cor="">Dias</Hstatus>
                    </HeadTipo>
                    <HeadTipo tamanho="30%">
                        <Hstatus tamanho="21px" cor="">Colaborador relacionado</Hstatus>
                    </HeadTipo>
                </HeadLista>
                {ListarSolicitações(colaboradores, solicitacoesPendentes)}
            </Lista>
        </>

    )
}