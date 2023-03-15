import { Link, useLocation } from "react-router-dom";
import { Colaborador, colaboradores } from "../../../Entity/modeloColaboradores";
import { H1, Hstatus } from "../../../Components/texto";
import { MainDashboard, AddColaborador, DivColaborador, SectionEquipe, SectionStatus, Theme, DivTopo } from "./styles";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { DivBranco } from "../../../Components/Divisões/div";
import AddIcon from '@mui/icons-material/Add';




//Dashboard
export default function Dashboard() {
    const localizacao = useLocation();
    // Tamanho da lista filtrada
    const numStatus = (status: string) => {
        const colaboradoresFiltrados: Colaborador[] = colaboradores.filter((item) => item.status === status)
        return colaboradoresFiltrados.length;
    }

    // função para listar colaboradores existentes no front
    const ListarColaboradores = (status: string) => {
        // Verificação de filtro
        if (status !== '') {
            // filtro de colaboradores
            const colaboradoresFiltrados: Colaborador[] = colaboradores.filter((item) => item.status === status)

            return (
                <SectionEquipe>
                    {colaboradoresFiltrados.map((item) => (
                        <Link to={`${localizacao.pathname.split('/').slice(0, -1).join('/')}/colaborador/${item.id}`}>
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
                        <Link to={`colaborador/${item.id}`}>
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

    return (
        <>
            <DivTopo>
                <H1>Equipe</H1>
                <Link to='/gestor/cadastro'>
                    <AddColaborador>
                        <AddIcon fontSize="large" />
                    </AddColaborador>
                </Link>
            </DivTopo>
            <MainDashboard>
                {localizacao.pathname === '/gestor/disponiveis' ? ListarColaboradores('Disponivel') :
                    (localizacao.pathname === '/gestor/aceitos' ? ListarColaboradores('Aceito') :
                        (localizacao.pathname === '/gestor/ferias' ? ListarColaboradores('Ferias') :
                            (localizacao.pathname === '/gestor/atrasos' ? ListarColaboradores('Atraso') : ListarColaboradores(''))))}
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
        </>
    )
}