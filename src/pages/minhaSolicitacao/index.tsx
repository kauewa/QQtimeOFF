import isBetween from 'dayjs/plugin/isBetween';
import { useContext } from "react";
import { Cadastrar, Conteudo, DivColuna, DivHorizontal, Head } from "../../Components/Divisões/div";
import { HeadLista, HeadTipo, Item, ItemTipo, Lista } from "../../Components/Divisões/lista";
import { Hcolor, Hstatus } from "../../Components/texto";
import { ColaboradorContext, Solicitacao } from "../../context/contextColaborador";
import { DivStatusGrande } from "../gestor/dashboard/styles";
import { CadastrarSolcitacao } from "./style";


export function MinhaSolicitacao() {
    const colaborador = useContext(ColaboradorContext);

    if(!colaborador){
        return(
            <h1>Colaborador não encontrado</h1>
        )
    }

    const feriasNoAno: Solicitacao[] = colaborador.solicitacoes.filter((sol) => sol.status === "aprovado" && sol.inicio_ferias.isBetween(colaborador.fim_aquisitivo.subtract(1, 'year'), colaborador.fim_aquisitivo))

    const ListarSolicitacoes = () => {
        if (colaborador !== undefined) {
            return (
                <>
                    {colaborador.solicitacoes.map((item) => (
                        <Item>
                            <ItemTipo tamanho="25%">
                                <h1>{item.data_criacao.format("DD/MM/YYYY")}</h1>
                            </ItemTipo>
                            <ItemTipo tamanho="25%">
                                <h1>{item.inicio_ferias.format("DD/MM/YYYY")}</h1>
                            </ItemTipo>
                            <ItemTipo tamanho="25%">
                                <h1>{item.qtd_dias}</h1>
                            </ItemTipo>
                            <ItemTipo tamanho="25%">
                                <h1>{item.status}</h1>
                            </ItemTipo>
                        </Item>
                    ))}
                </>

            )
        }

    }

    return (
        <>
            <Head>
                <DivHorizontal tamanho='200px'>
                    <DivStatusGrande>
                        <Hcolor tamanho='28px' cor='var(--branco)'>Saldo férias</Hcolor>
                        <Hcolor tamanho='42px' cor='var(--branco)'>{colaborador !== undefined ? colaborador.saldo_ferias : 0}</Hcolor>
                    </DivStatusGrande>
                </DivHorizontal>
            </Head>
            <Conteudo>
                <Cadastrar>
                    <DivColuna tamanho=''>
                        <Hstatus cor='Disponivel' tamanho='24px'>{colaborador.funcao.nome_funcao}</Hstatus>
                        <h1>{colaborador.clt ? 'CLT' : 'PJ'}</h1>
                    </DivColuna>
                    <DivHorizontal tamanho='100%'>
                        <DivHorizontal tamanho='45%'>
                            <Hstatus cor='Disponivel' tamanho='16px'>Solicitações</Hstatus>
                            <Lista tamanho=''>
                                <HeadLista>
                                    <HeadTipo tamanho="25%">
                                        <h1>Criado</h1>
                                    </HeadTipo>
                                    <HeadTipo tamanho="25%">
                                        <h1>Inicio</h1>
                                    </HeadTipo>
                                    <HeadTipo tamanho="25%">
                                        <h1>Quantidade</h1>
                                    </HeadTipo>
                                    <HeadTipo tamanho="25%">
                                        <h1>Status</h1>
                                    </HeadTipo>
                                </HeadLista>
                                {ListarSolicitacoes()}
                            </Lista>
                        </DivHorizontal>
                        <DivHorizontal tamanho='45%'>
                            {/* Requisito 8 */}
                            { feriasNoAno.length < 3 ? <CadastrarSolcitacao /> : <br/>}
                        </DivHorizontal>
                    </DivHorizontal>
                    <DivColuna tamanho=''>
                        <h1>Fim periodo aquisitivo: {colaborador.fim_aquisitivo.format('DD/MM/YYYY')}</h1>
                    </DivColuna>
                </Cadastrar>
            </Conteudo>
        </>
    )
}