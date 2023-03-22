import { createTheme } from "@mui/material/styles";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Hcolor } from "../../../Components/texto";


//////////////////////////////////// Divisão
export const MainDashboard = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 16px;
`;

export const DivTopo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%;
`;
/////////////////////////////////////

export const AddColaborador = styled.div`
    display: flex;
    margin-left: 24px;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    background: var(--verde-forte);
    border-radius: 30px;
    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25));
    transition: 300ms;
    position: relative;

    &:hover::before {
        content: "Novo colaborador!";
        position: absolute;
        left: 70px;
        top: 0;
        font-size: 14px;
        padding: 5px;
        transition: all 300ms ease-in-out; /* adicionar uma transição suave */
      }
    
      &:hover::before {
        left: 80px;
      }

    &:hover{
        background: #016601;
    }
`;
/////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////// Lista Equipe DASHBOARD
export const SectionEquipe = styled.section`
    display: flex;
    flex-direction: column;
    background: var(--branco);
    box-shadow: 0px 0px 15px 1px #BBFF84;
    border-radius: 50px;
    width: 60%;
    height: 700px;
    padding-top: 16px;
    overflow: auto;
`;

export const DivColaborador = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    height: 60px;
    padding: 24px 36px;
    border-bottom: solid 1px var(--fundo);

    &:hover{
        background: var(--fundo);
    }
`;
////////////////////////////////////////////////////////////

////////////////////////////////////////Calendário
export const Theme = createTheme({
    palette: {
        primary: {
            main: '#008000',
        },
        secondary: {
            main: '#E1FFCA',
        },
        background: {
            default: '#fff',
        }
    },
});
//////////////////////////////////////////

////////////////////////////////Filtros
const DivStatus = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    justify-content: space-between;
    width: 310px;
`;

const DivStatusDentro = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

interface DivStatusPequenosProps {
    cor: string;
}

const DivStatusPequenos = styled.div<DivStatusPequenosProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background: ${props => props.cor === 'verde' ? 'var(--verde-forte)' : (props.cor === 'amarelo' ? 'var(--amarelo-forte)' : (props.cor === 'laranja' ? 'var(--laranja)' : 'red'))};
    width: 131px;
    height: 100px;
    border-radius: 36px;

    &:hover{
        filter: drop-shadow(0px 0px 7px #BBFF84);
    }
`;


export const DivStatusGrande = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 136px;
    border-radius: 36px;
    background: #6C6C6C;
    padding: 16px;

    &:hover{
        filter: drop-shadow(0px 0px 15px #BBFF84);
    }
`;

interface StatusProps {
    numDisp: number;
    numAceito: number;
    numFerias: number;
    numAtraso: number;
    numGeral: number;
}

// Filtros da página dashboard
export function SectionStatus({ numDisp, numAceito, numFerias, numAtraso, numGeral }: StatusProps) {
    const {id} = useParams();
    const localizacao = useLocation();

    return (
        <DivStatus>
            <DivStatusDentro>
                <Link to={`/gestor/${id}/disponiveis`}>
                    <DivStatusPequenos cor='verde'>
                        <Hcolor tamanho="21px" cor={localizacao.pathname === `/gestor/${id}/disponiveis` ? 'var(--fundo)' : 'var(--branco)'}>Disponíveis</Hcolor>
                        <Hcolor tamanho="42px" cor={localizacao.pathname === `/gestor/${id}/disponiveis` ? 'var(--fundo)' : 'var(--branco)'} >{numDisp}</Hcolor>
                    </DivStatusPequenos>
                </Link>
                <Link to={`/gestor/${id}/aceitos`}>
                    <DivStatusPequenos cor='amarelo'>
                        <Hcolor tamanho="21px" cor={localizacao.pathname === `/gestor/${id}/aceitos` ? 'var(--fundo)' : 'var(--branco)'}>Aceitos</Hcolor>
                        <Hcolor tamanho="42px" cor={localizacao.pathname === `/gestor/${id}/aceitos`? 'var(--fundo)' : 'var(--branco)'}>{numAceito}</Hcolor>
                    </DivStatusPequenos>
                </Link>
            </DivStatusDentro>
            <DivStatusDentro>
                <Link to={`/gestor/${id}/ferias`}>
                    <DivStatusPequenos cor='laranja'>
                        <Hcolor tamanho="21px" cor={localizacao.pathname === `/gestor/${id}/ferias` ? 'var(--fundo)' : 'var(--branco)'}>Férias</Hcolor>
                        <Hcolor tamanho="42px" cor={localizacao.pathname === `/gestor/${id}/ferias` ? 'var(--fundo)' : 'var(--branco)'}>{numFerias}</Hcolor>
                    </DivStatusPequenos>
                </Link>
                <Link to={`/gestor/${id}/atrasos`}>
                    <DivStatusPequenos cor=''>
                        <Hcolor tamanho="21px" cor={localizacao.pathname === `/gestor/${id}/atrasos` ? 'var(--fundo)' : 'var(--branco)'}>Atrasos</Hcolor>
                        <Hcolor tamanho="42px" cor={localizacao.pathname === `/gestor/${id}/atrasos` ? 'var(--fundo)' : 'var(--branco)'}>{numAtraso}</Hcolor>
                    </DivStatusPequenos>
                </Link>
            </DivStatusDentro>
            <Link to={`/gestor/${id}`}>
                <DivStatusGrande>
                    <Hcolor tamanho="" cor={localizacao.pathname === `/gestor/${id}` ? 'var(--fundo)' : 'var(--branco)'}>Geral</Hcolor>
                    <Hcolor tamanho="42px" cor={localizacao.pathname === `/gestor/${id}` ? 'var(--fundo)' : 'var(--branco)'}>{numGeral}</Hcolor>
                </DivStatusGrande>
            </Link>
        </DivStatus>
    )
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////