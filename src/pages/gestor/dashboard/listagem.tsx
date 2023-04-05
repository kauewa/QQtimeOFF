import { Link, useParams } from "react-router-dom"
import { Item, ItemTipo, Lista } from "../../../Components/Divisões/lista"
import { PerfilFoto } from "../../../Components/Divisões/pg2"
import { Hstatus } from "../../../Components/texto";
import dayjs from "dayjs";
import { Colaborador } from "../../../context/intefaces";
import { useMediaQuery, useTheme } from "@mui/material";

export function ListarColaboradores(colaboradores: Colaborador[], status: string) {
    const { id } = useParams();
    const isFiltro = status !== '';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isFiltro) {
        // filtro de colaboradores
        const colaboradoresFiltrados: Colaborador[] = colaboradores.filter((item) => item.status === status)

        return (
            <Lista tamanho="dashboard">
                {colaboradoresFiltrados.map((item) => (
                    <Link to={{ pathname: `/gestor/${id}/colaborador/${item.id}` }} key={item.id} >
                        <Item key={item.id}>
                            {
                                isMobile ? '' :
                                    <ItemTipo tamanho="10%">
                                        <PerfilFoto tamanho="60px" />
                                    </ItemTipo>
                            }

                            <ItemTipo tamanho={isMobile ? "30%" : "20%"}>
                                <Hstatus tamanho="21px" cor={item.status}>{item.nome}</Hstatus>
                            </ItemTipo>
                            <ItemTipo tamanho={isMobile ? "25%" : "35%"}>
                                <Hstatus tamanho="21px" cor={item.status}>{item.funcao.nome_funcao}</Hstatus>
                            </ItemTipo>
                            <ItemTipo tamanho={isMobile ? "45%" : "35%"}>
                                <Hstatus tamanho="21px" cor={item.status}>{
                                    item.status === 'Aceito' ? `${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.inicio_ferias.format('DD/MM/YYYY')} a ${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.fim_ferias.format('DD/MM/YYYY')}` :
                                        item.status === 'Ferias' ? `Volta ${item.ferias?.fim_ferias.format('DD/MM/YYYY')}` :
                                            item.status === 'Atraso' ? `Vence ${item.fim_aquisitivo.format('DD/MM/YYYY')}` : item.status
                                }</Hstatus>
                            </ItemTipo>
                        </Item>
                    </Link>
                ))}
            </Lista>
        )
    } else {
        // sem filtro 
        return (
            <Lista tamanho="dashboard">
                {colaboradores.map((item) => (
                    <Link to={{ pathname: `/gestor/${id}/colaborador/${item.id}` }} key={item.id}>
                        <Item key={item.id}>
                            {
                                isMobile ? '' :
                                    <ItemTipo tamanho="10%">
                                        <PerfilFoto tamanho="60px" />
                                    </ItemTipo>
                            }
                            <ItemTipo tamanho="20%">
                                <Hstatus tamanho="21px" cor={item.status}>{item.nome}</Hstatus>
                            </ItemTipo>
                            <ItemTipo tamanho="35%">
                                <Hstatus tamanho="21px" cor={item.status}>{item.funcao.nome_funcao}</Hstatus>
                            </ItemTipo>
                            <ItemTipo tamanho={isMobile ? "45%" : "35%"}>
                                <Hstatus tamanho="21px" cor={item.status}>{
                                    item.status === 'Aceito' ? `${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.inicio_ferias.format('DD/MM/YYYY')} a ${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.fim_ferias.format('DD/MM/YYYY')}` :
                                        item.status === 'Ferias' ? `Volta ${item.ferias?.fim_ferias.format('DD/MM/YYYY')}` :
                                            item.status === 'Atraso' ? `Vence ${item.fim_aquisitivo.format('DD/MM/YYYY')}` : item.status
                                }</Hstatus>
                            </ItemTipo>
                        </Item>
                    </Link>
                ))}
            </Lista>
        )
    }
}