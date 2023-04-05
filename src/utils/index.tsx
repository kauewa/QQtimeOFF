import { Link, useParams } from "react-router-dom";
import { Item, ItemTipo } from "../Components/Divisões/lista"
import { Hstatus } from "../Components/texto"
import dayjs from "dayjs";
import { Colaborador } from "../context/intefaces";

export function ColaboradoresRelacionados(colaboradores: Colaborador[], colaborador: Colaborador | undefined) {
    const { id } = useParams();
    const colaboradoresRelacionados: Colaborador[] = colaboradores.filter((colab) => colab.funcao.idfuncao === colaborador?.funcao.idfuncao)

    if(!colaborador) return null;

    return (
        <>
            {colaboradoresRelacionados.map((colab) => {
                if (colaborador.id !== colab.id) {
                    return (
                        <Link to={{ pathname: `/gestor/${id}/colaborador/${colab.id}` }} key={colab.id}>
                            <Item key={colab.id}>
                                <ItemTipo tamanho="50%">
                                    <Hstatus tamanho="18px" cor={colab.status}>{colab.nome}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="50%">
                                    <Hstatus tamanho="18px" cor={colab.status}>{colab.status === 'Aceito' ? `${colab.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.inicio_ferias.format('DD/MM/YYYY')} a ${colab.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.fim_ferias.format('DD/MM/YYYY')}` :
                                        colab.status === 'Ferias' ? `Volta ${colab.ferias?.fim_ferias.format('DD/MM/YYYY')}` :
                                            colab.status === 'Atraso' ? `Vence ${colab.fim_aquisitivo.format('DD/MM/YYYY')}` : colab.status}</Hstatus>
                                </ItemTipo>
                            </Item>
                        </Link>
                    )
                }
            })}
        </>
    )
}



export function ListarSolicitacoes(colaborador: Colaborador, minhaSolicitacao: boolean){
    const { id } = useParams();

    return (
        <>
            {colaborador.solicitacoes.map((item) => (
                <Link to={minhaSolicitacao ? colaborador.gestor ? {pathname: `/gestor/${id}/minhasolicitacao/${item.id}`} :  {pathname: `/colaborador/${id}/minhasolicitacao/${item.id}`} : { pathname: `/gestor/${id}/solicitacoes/${item.id}` }} key={item.id}>
                    <Item key={item.id}>
                        <ItemTipo tamanho="25%">
                            <Hstatus tamanho='18px' cor={item.status === "aprovado" ? 'Disponivel' : item.status === "reprovado" ? "Ferias" : "Aceito"}>{item.data_criacao.format("DD/MM/YYYY")}</Hstatus>
                        </ItemTipo>
                        <ItemTipo tamanho="25%">
                            <Hstatus tamanho='18px' cor={item.status === "aprovado" ? 'Disponivel' : item.status === "reprovado" ? "Ferias" : "Aceito"}>{item.inicio_ferias.format("DD/MM/YYYY")}</Hstatus>
                        </ItemTipo>
                        <ItemTipo tamanho="25%">
                            <Hstatus tamanho='18px' cor={item.status === "aprovado" ? 'Disponivel' : item.status === "reprovado" ? "Ferias" : "Aceito"}>{item.qtd_dias}</Hstatus>
                        </ItemTipo>
                        <ItemTipo tamanho="25%">
                            <Hstatus tamanho='18px' cor={item.status === "aprovado" ? 'Disponivel' : item.status === "reprovado" ? "Ferias" : "Aceito"}>{item.status}</Hstatus>
                        </ItemTipo>
                    </Item>

                </Link>
            ))}
        </>

    )

}