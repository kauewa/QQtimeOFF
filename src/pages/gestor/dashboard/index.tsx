import { Link, useLocation, useParams } from "react-router-dom";
import { ColaboradoresContext, SolicitacoesContext } from "../../../context/contextGestor";
import { H1 } from "../../../Components/texto";
import { MainDashboard, AddColaborador, SectionStatus, DivTopo, Calendario } from "./styles";
import { DivBranco } from "../../../Components/Divisões/div";
import AddIcon from '@mui/icons-material/Add';
import { SpeedDial } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import dayjs from "dayjs";
import ApiRelatorios from "../../../API/Relatorios";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ListarColaboradores } from "./listagem";
import { Colaborador } from "../../../context/intefaces";
import { ColaboradorContext } from "../../../context/contextColaborador";




//Dashboard
export default function Dashboard() {
    const { id } = useParams()
    const localizacao = useLocation();
    const colaboradores = useContext(ColaboradoresContext)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const colaborador = useContext(ColaboradorContext)
    const emailGestor: string = colaborador?.email !== undefined ? colaborador.email : 'kaue.wa@gmail.com';
    
    
    
/////// display calendario
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
/////////////////////////////////



    // Tamanho da lista filtrada
    const numStatus = (status: string) => {
        const colaboradoresFiltrados: Colaborador[] = colaboradores.filter((item) => item.status === status)
        return colaboradoresFiltrados.length;
    }


    //Relatórios
    const actions = [
        { icon: <AssessmentIcon />, name: "Geral", onclick: async () => await ApiRelatorios.relatorioGeral(colaboradores, emailGestor) },
        { icon: <AirplanemodeActiveIcon />, name: "Férias concedidas", onclick: async () => await ApiRelatorios.relatorioFerias(colaboradores, emailGestor) },
        { icon: <AirplanemodeInactiveIcon />, name: "Férias acumuladas", onclick: async () => await ApiRelatorios.relatorioAtrasos(colaboradores, emailGestor) }
    ]



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
                {localizacao.pathname === `/gestor/${id}/disponiveis` ? ListarColaboradores(colaboradores ,'Disponivel') :
                    (localizacao.pathname === `/gestor/${id}/aceitos` ? ListarColaboradores(colaboradores ,'Aceito') :
                        (localizacao.pathname === `/gestor/${id}/ferias` ? ListarColaboradores(colaboradores ,'Ferias') :
                            (localizacao.pathname === `/gestor/${id}/atrasos` ? ListarColaboradores(colaboradores ,'Atraso') : ListarColaboradores(colaboradores ,''))))}
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
                        display: isMobile ? 'none' : '',
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