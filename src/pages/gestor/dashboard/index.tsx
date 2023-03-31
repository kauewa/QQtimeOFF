import { Link, useLocation, useParams } from "react-router-dom";
import { Colaborador, ColaboradoresContext, SolicitacoesContext } from "../../../context/contextGestor";
import { H1, Hstatus } from "../../../Components/texto";
import { MainDashboard, AddColaborador, SectionStatus, DivTopo, Calendario } from "./styles";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DivBranco } from "../../../Components/Divisões/div";
import AddIcon from '@mui/icons-material/Add';
import { SpeedDial } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import ApiRelatorios from "../../../Relatorios";
import { Item, ItemTipo, Lista } from "../../../Components/Divisões/lista";
import { PerfilFoto } from "../../../Components/Divisões/pg2";




//Dashboard
export default function Dashboard() {
    const { id } = useParams()
    const localizacao = useLocation();
    const colaboradores = useContext(ColaboradoresContext)
    console.log(colaboradores)
    const solicitacoes = useContext(SolicitacoesContext);
    const solicitacoesAprovada = solicitacoes.filter((sol) => sol.status === "aprovado");


    const listaSolicitacoesCalendario: any[] = []
    solicitacoesAprovada.forEach((sol) => {
        const cor = sol.inicio_ferias.isAfter(dayjs()) ? 'var(--amarelo-forte)' : 'var(--laranja)'

        const datas: any = {
            startDate: sol.inicio_ferias.toDate(),
            endDate: sol.fim_ferias.toDate(),
            color: cor,
            key: sol.id.toString()
        }
        listaSolicitacoesCalendario.push(datas)
    })



    // Tamanho da lista filtrada
    const numStatus = (status: string) => {
        const colaboradoresFiltrados: Colaborador[] = colaboradores.filter((item) => item.status === status)
        return colaboradoresFiltrados.length;
    }

    //Relatórios
    const actions = [
        { icon: <AssessmentIcon />, name: "Geral", onclick: async () => await ApiRelatorios.relatorioGeral(colaboradores, 'kaue.wa@gmail.com') },
        { icon: <AllInboxIcon />, name: "Histórico" },
        { icon: <AirplanemodeActiveIcon />, name: "Férias concedidas" },
        { icon: <AirplanemodeInactiveIcon />, name: "Férias acumuladas" }
    ]


    /////////////////////////////////////////////////////    // função para listar colaboradores existentes no front
    const ListarColaboradores = (status: string) => {
        // Verificação de filtro
        if (status !== '') {
            // filtro de colaboradores
            const colaboradoresFiltrados: Colaborador[] = colaboradores.filter((item) => item.status === status)

            return (
                <Lista tamanho="dashboard">
                    {colaboradoresFiltrados.map((item) => (
                        <Link to={{ pathname: `/gestor/${id}/colaborador/${item.id}` }} key={item.id} >
                            <Item key={item.id}>
                                <ItemTipo tamanho="10%">
                                    <PerfilFoto tamanho="60px" />
                                </ItemTipo>
                                <ItemTipo tamanho="20%">
                                    <Hstatus tamanho="21px" cor={item.status}>{item.nome}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="35%">
                                    <Hstatus tamanho="21px" cor={item.status}>{item.funcao.nome_funcao}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="35%">
                                    <Hstatus tamanho="21px" cor={item.status}>{
                                            item.status === 'Aceito' ? `${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.inicio_ferias.format('DD/MM/YYYY')} a ${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.fim_ferias.format('DD/MM/YYYY')}` :
                                            item.status === 'Ferias' ? `Volta ${item.ferias?.fim_ferias.format('DD/MM/YYYY')}` : 
                                            item.status === 'Atraso' ? `Vence ${item.fim_aquisitivo.format('DD/MM/YYYY')}`: item.status
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
                                <ItemTipo tamanho="10%">
                                    <PerfilFoto tamanho="60px" />
                                </ItemTipo>
                                <ItemTipo tamanho="20%">
                                    <Hstatus tamanho="21px" cor={item.status}>{item.nome}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="35%">
                                    <Hstatus tamanho="21px" cor={item.status}>{item.funcao.nome_funcao}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="35%">
                                    <Hstatus tamanho="21px" cor={item.status}>{
                                        item.status === 'Aceito' ? `${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.inicio_ferias.format('DD/MM/YYYY')} a ${item.solicitacoes.find((sol) => sol.status === 'aprovado' && sol.inicio_ferias.isAfter(dayjs()))?.fim_ferias.format('DD/MM/YYYY')}` :
                                            item.status === 'Ferias' ? `Volta ${item.ferias?.fim_ferias.format('DD/MM/YYYY')}` : 
                                            item.status === 'Atraso' ? `Vence ${item.fim_aquisitivo.format('DD/MM/YYYY')}`: item.status
                                    }</Hstatus>
                                </ItemTipo>
                            </Item>
                        </Link>
                    ))}
                </Lista>
            )
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <DivTopo>
                <H1>Equipe</H1>
                <Link to={{ pathname: `/gestor/${id}/cadastro` }}>
                    <AddColaborador>
                        <AddIcon fontSize="large" sx={{ color: "white" }} />
                    </AddColaborador>
                </Link>
            </DivTopo>
            <MainDashboard>
                {localizacao.pathname === `/gestor/${id}/disponiveis` ? ListarColaboradores('Disponivel') :
                    (localizacao.pathname === `/gestor/${id}/aceitos` ? ListarColaboradores('Aceito') :
                        (localizacao.pathname === `/gestor/${id}/ferias` ? ListarColaboradores('Ferias') :
                            (localizacao.pathname === `/gestor/${id}/atrasos` ? ListarColaboradores('Atraso') : ListarColaboradores(''))))}
                <div>
                    <SectionStatus numGeral={colaboradores.length} numDisp={numStatus('Disponivel')} numAceito={numStatus('Aceito')} numFerias={numStatus('Ferias')} numAtraso={numStatus('Atraso')} />
                    <DivBranco>
                        <Calendario
                            ranges={listaSolicitacoesCalendario}
                            showDateDisplay={false}
                        />
                    </DivBranco>
                </div>
            </MainDashboard>
            <Tooltip title="Relatórios">
                <SpeedDial
                    ariaLabel="Relatórios"
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                    }}
                    icon={<KeyboardArrowUpIcon />}
                    FabProps={{
                        sx: {
                            background: "var(--verde-forte)",
                            ":hover": { background: '#016601' }
                        }
                    }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClickCapture={action.onclick}
                        />
                    ))}
                </SpeedDial>
            </Tooltip>
        </>
    )
}