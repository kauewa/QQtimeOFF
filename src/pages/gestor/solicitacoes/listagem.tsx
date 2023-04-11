import { Link, useParams } from "react-router-dom"
import { Item, ItemTipo } from "../../../Components/Divisões/lista"
import { Badge } from "@mui/material";
import { Colaborador, Solicitacao } from "../../../context/intefaces";
import { Hstatus } from "../../../Components/texto";

export default function ListarSolicitações(colaboradores: Colaborador[], solicitacoes: Solicitacao[]) {
    const { id } = useParams();


    return (
        <>
            {solicitacoes.map(sol => {

                // procura o colaborador que fez a solicitação
                const colaborador = colaboradores.find((colab) => sol.idSolicitante === colab.id)

                if (colaborador) {
                    // procura os colaboradores que tem a mesma função do colaborador que fez a solicitação e que estão com o status aceito (observação)
                    const colaboradoresRelacionados: Colaborador[] = colaboradores.filter((colab) => colab.funcao.idfuncao === colaborador.funcao.idfuncao && colab.status === "Aceito" && colab.id !== colaborador.id)
                    

                    return (
                        <Link to={`/gestor/${id}/solicitacoes/${sol.id}`}>
                            <Item>
                                <ItemTipo tamanho="25%">
                                    <Hstatus tamanho="21px" cor=''>{colaborador.nome}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="30%">
                                <Hstatus tamanho="21px" cor=''>{sol.inicio_ferias.format('DD/MM/YYYY')}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="15%">
                                <Hstatus tamanho="21px" cor=''>{sol.qtd_dias}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="30%">
                                    {
                                        colaboradoresRelacionados.length > 0 ?
                                            <Badge badgeContent={colaboradoresRelacionados.length} color='success'>
                                                <Hstatus tamanho="21px" cor=''>Observações</Hstatus>
                                            </Badge> :
                                            <Hstatus tamanho="21px" cor=''>Disponíveis</Hstatus>
                                    }
                                </ItemTipo>
                            </Item>
                        </Link>
                    )
                }
            })}
        </>

    )
}