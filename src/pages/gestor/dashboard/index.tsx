import { Link, useLocation, useParams } from "react-router-dom";
import { Colaborador, ColaboradoresContext } from "../../../context/contextGestor";
import { H1, Hstatus } from "../../../Components/texto";
import { MainDashboard, AddColaborador, DivColaborador, SectionEquipe, SectionStatus, Theme, DivTopo } from "./styles";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
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

//Dashboard
export default function Dashboard() {
    const { id } = useParams()
    const localizacao = useLocation();
    const colaboradores = useContext(ColaboradoresContext)


    // Tamanho da lista filtrada
    const numStatus = (status: string) => {
        const colaboradoresFiltrados: Colaborador[] = colaboradores.filter((item) => item.status === status)
        return colaboradoresFiltrados.length;
    }

    //Relatórios
    const actions = [
        { icon: <AssessmentIcon />, name: "Geral" },
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
                <SectionEquipe>
                    {colaboradoresFiltrados.map((item) => (
                        <Link to={{ pathname: `/gestor/${id}/colaborador/${item.id}` }}>
                            <DivColaborador key={item.id}>
                                <Hstatus tamanho="21px" cor={item.status}>{item.nome}</Hstatus>
                                <Hstatus tamanho="21px" cor={item.status}>{item.funcao}</Hstatus>
                                <Hstatus tamanho="21px" cor={item.status}>{item.status}</Hstatus>
                            </DivColaborador>
                        </Link>
                    ))}
                </SectionEquipe>
            )
        } else {
            // sem filtro 
            return (
                <SectionEquipe>
                    {colaboradores.map((item) => (
                        <Link to={{ pathname: `/gestor/${id}/colaborador/${item.id}` }}>
                            <DivColaborador key={item.id}>
                                <Hstatus tamanho="21px" cor={item.status}>{item.nome}</Hstatus>
                                <Hstatus tamanho="21px" cor={item.status}>{item.funcao}</Hstatus>
                                <Hstatus tamanho="21px" cor={item.status}>{item.status}</Hstatus>
                            </DivColaborador>
                        </Link>
                    ))}
                </SectionEquipe>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ThemeProvider theme={Theme}>
                                <DateCalendar />
                            </ThemeProvider>
                        </LocalizationProvider>
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
                        />
                    ))}
                </SpeedDial>
            </Tooltip>
        </>
    )
}