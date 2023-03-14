import { createTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

 //////////////////////////////////// 
export const MainDashboard = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 16px;
`;
/////////////////////////////////////



export const DivTopo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%;
`;

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
        color: var(--verde-forte);
        transition: all 300ms ease-in-out; /* adicionar uma transição suave */
      }
    
      &:hover::before {
        left: 80px; /* ajustar a posição do texto para o outro lado */
      }

    &:hover{
        transform: scale(1.04);
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

interface DivStatusPequenosProps{
    cor: string;
}

export const TxtStatus = styled.h1<DivStatusPequenosProps>`
    color: ${props => props.cor === 'ativo' ? 'var(--fundo-secundario)' : 'var(--branco)'};
    font-weight: 900;
`;

export const NumStatus = styled(TxtStatus)`
    font-size: 42px;
`;

const DivStatusPequenos = styled.div<DivStatusPequenosProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background: ${props => props.cor === 'verde' ? 'var(--verde-forte)' : (props.cor === 'amarelo' ? 'var(--amarelo-forte)' : (props.cor === 'laranja' ? 'var(--laranja)': 'red'))};
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

interface StatusProps{
    numDisp: number;
    numAceito: number;
    numFerias: number;
    numAtraso: number;
    numGeral: number;
}

// Filtros da página dashboard
export function SectionStatus( {numDisp, numAceito, numFerias, numAtraso, numGeral}: StatusProps){
    const localizacao = useLocation();

    return(
        <DivStatus>
            <DivStatusDentro>
                <Link to='/gestor/disponiveis'>
                    <DivStatusPequenos cor='verde'>
                        <TxtStatus cor={localizacao.pathname === '/gestor/disponiveis' ? 'ativo' : ''}>Disponíveis</TxtStatus>
                        <NumStatus cor={localizacao.pathname === '/gestor/disponiveis' ? 'ativo' : ''} >{numDisp}</NumStatus>
                    </DivStatusPequenos>
                </Link>
                <Link to='/gestor/aceitos'>
                    <DivStatusPequenos cor='amarelo'>
                        <TxtStatus cor={localizacao.pathname === '/gestor/aceitos' ? 'ativo' : ''}>Aceitos</TxtStatus>
                        <NumStatus cor={localizacao.pathname === '/gestor/aceitos' ? 'ativo' : ''}>{numAceito}</NumStatus>
                    </DivStatusPequenos>       
                </Link>
            </DivStatusDentro>
            <DivStatusDentro>
                <Link to='/gestor/ferias'>
                    <DivStatusPequenos cor='laranja'>
                        <TxtStatus cor={localizacao.pathname === '/gestor/ferias' ? 'ativo' : ''}>Férias</TxtStatus>
                        <NumStatus cor={localizacao.pathname === '/gestor/ferias' ? 'ativo' : ''}>{numFerias}</NumStatus>
                    </DivStatusPequenos>
                </Link>
                <Link to='/gestor/atrasos'>
                    <DivStatusPequenos cor =''>
                        <TxtStatus cor={localizacao.pathname === '/gestor/atrasos' ? 'ativo' : ''}>Atrasos</TxtStatus>
                        <NumStatus cor={localizacao.pathname === '/gestor/atrasos' ? 'ativo' : ''}>{numAtraso}</NumStatus>
                    </DivStatusPequenos>
                </Link>
            </DivStatusDentro>
            <Link to='/gestor'>
                <DivStatusGrande>
                    <TxtStatus cor={localizacao.pathname === '/gestor' ? 'ativo' : ''}>Geral</TxtStatus>
                    <NumStatus cor={localizacao.pathname === '/gestor' ? 'ativo' : ''}>{numGeral}</NumStatus>
                </DivStatusGrande>
            </Link>
        </DivStatus>
    )
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////