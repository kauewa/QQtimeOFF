import isBetween from 'dayjs/plugin/isBetween';
import { useContext } from "react";
import { Cadastrar, Conteudo, DivColuna, DivHorizontal, Head } from "../../Components/Divisões/div";
import { HeadLista, HeadTipo, Lista } from "../../Components/Divisões/lista";
import { Hcolor, Hstatus } from "../../Components/texto";
import { ColaboradorContext } from "../../context/contextColaborador";
import { DivStatusGrande } from "../gestor/dashboard/styles";
import { CadastrarSolcitacao } from "./style";
import { ListarSolicitacoes } from '../../utils';
import { Solicitacao } from '../../context/intefaces';
import { useMediaQuery, useTheme } from '@mui/material';


export function MinhaSolicitacao() {
    const colaborador = useContext(ColaboradorContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!colaborador) {
        return (
            <h1>Colaborador não encontrado</h1>
        )
    }


    const feriasNoAno: Solicitacao[] = colaborador.solicitacoes.filter((sol) => sol.status === "aprovado" && sol.inicio_ferias.isBetween(colaborador.fim_aquisitivo.subtract(1, 'year'), colaborador.fim_aquisitivo))

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
                    {isMobile ? '' :
                        <DivColuna tamanho=''>
                            <h1>{colaborador.clt ? 'CLT' : 'PJ'}</h1>
                        </DivColuna>}
                    <DivHorizontal tamanho='100%'>

                        {isMobile ? '' :
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
                                    {ListarSolicitacoes(colaborador, true)}
                                </Lista>
                            </DivHorizontal>
                        }

                        <DivHorizontal tamanho={isMobile ? '100%' : '45%'}>
                            {/* Requisito 8 */}
                            {feriasNoAno.length < 3 ? <CadastrarSolcitacao /> : <br />}
                        </DivHorizontal>
                    </DivHorizontal>
                    <DivColuna tamanho=''>
                        <Hstatus tamanho='21px' cor={colaborador.status}>Fim periodo aquisitivo: {colaborador.fim_aquisitivo.format('DD/MM/YYYY')}</Hstatus>
                    </DivColuna>
                </Cadastrar>
            </Conteudo>
        </>
    )
}