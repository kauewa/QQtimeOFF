import { Badge } from "@mui/material";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { HeadTipo, HeadLista, Lista, Item, ItemTipo } from "../../../Components/Divisões/lista";
import { H1 } from "../../../Components/texto";
import CheckIcon from '@mui/icons-material/Check';
import { Colaborador, ColaboradoresContext, SolicitacoesContext } from "../../../context/contextGestor";



//Fazer ainda
export default function Solicitacoes() {
    const { id } = useParams();
    const colaboradores = useContext(ColaboradoresContext)
    const solicitacoes = useContext(SolicitacoesContext)
    const solicitacoesPendentes = solicitacoes.filter((sol) => sol.status === "pendente");


    const ListarSolicitações = () => {
        return (
            <>
                {solicitacoesPendentes.map(sol => {
                    const colaborador = colaboradores.find((colab) => sol.idSolicitante === colab.id)

                    if (colaborador) {
                        const colaboradoresRelacionados: Colaborador[] = colaboradores.filter((colab) => colab.funcao.idfuncao === colaborador.funcao.idfuncao && colab.status === "Aceito")
                        return (
                            <Link to={`/gestor/${id}/solicitacoes/${sol.id}`}>
                                <Item>
                                    <ItemTipo tamanho="20%">
                                        <h1>{colaborador.nome}</h1>
                                    </ItemTipo>
                                    <ItemTipo tamanho="20%">
                                        <h1>{sol.inicio_ferias.format('DD/MM/YYYY')}</h1>
                                    </ItemTipo>
                                    <ItemTipo tamanho="20%">
                                        <h1>{sol.qtd_dias}</h1>
                                    </ItemTipo>
                                    <ItemTipo tamanho="20%">
                                        {
                                            colaboradores.length > 0 ?
                                                <Badge badgeContent={colaboradoresRelacionados.length} color='success'>
                                                    <h1>Observações</h1>
                                                </Badge> :
                                                <h1>Disponíveis</h1>
                                        }
                                    </ItemTipo>
                                    <ItemTipo tamanho="20%">
                                        <CheckIcon />
                                    </ItemTipo>
                                </Item>
                            </Link>
                        )
                    }
                })}
            </>

        )
    }






    return (
        <>
            <H1>Solicitações</H1>
            <Lista tamanho="large">
                <HeadLista>
                    <HeadTipo tamanho="20%">
                        <h1>Nome</h1>
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Inicio</h1>
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Quantidade</h1>
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Colaborador relacionado</h1>
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Confirmar</h1>
                    </HeadTipo>
                </HeadLista>
                {ListarSolicitações()}
            </Lista>
        </>

    )
}