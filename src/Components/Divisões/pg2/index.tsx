import styled from 'styled-components';
import { SmallImage } from "../../imagem/imagem";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import { Badge, useMediaQuery, useTheme } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext, useState } from 'react';
import { SolicitacoesContext } from '../../../context/contextGestor';
import { ColaboradorContext } from '../../../context/contextColaborador';
import MenuIcon from '@mui/icons-material/Menu';

const logo: any = require('../../../assets/TimeOFF.png');
const person: any = require('../../../assets/person.png');

const BarraBranca = styled.div`
  background-color: white;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
    top: 0;
        left: 0;
    right: 0;
    z-index: 9999;
    box-shadow: 0px 0px 15px 0.5px var(--verde-forte);

    @media only screen and (min-width: 600px){
        display: none;
    }

`;

const SectionLateral = styled.section`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    height: 100%;
    background-color: var(--branco);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 16px;
    z-index: 999;

    &.aberto {
        transform: translateX(0%);
        transition: transform 0.3s ease-in-out;
      }
    
      &.fechado {
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
      }

    @media only screen and (max-width: 600px){
        height: calc(100% - 60px);
`;

const CardPerfil = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    width: 291px;
    height: 423px;
    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.4);
    border-radius: 30px;
    background-color: var(--fundo-secundario);

    @media only screen and (max-width: 600px){
        width: 270px;
        height: 350px;
    }
`;

interface PerfilFotoProps {
    tamanho: string;
}

const FotoPerfil = styled.section<PerfilFotoProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${props => props.tamanho};
    height: ${props => props.tamanho};
    padding-top: 15px;
    background-color: var(--verde-forte);
    box-shadow: 0px 0px 15px 1px #BBFF84;
    border-radius: 300px;

    ${props => props.tamanho === '60px' ? `@media only screen and (max-width: 600px){
        height: 100%;
        border-radius: 0px;
    }` : ``}


`;

interface LinksProps {
    localidade: string;
}

const Links = styled.div<LinksProps>`
    display: flex;
    align-items: center;
    width: 110%;
    justify-content: center;
    color: ${props => props.localidade === 'ativo' ? "var(--amarelo-forte)" : "var(--preto)"};

    &:hover{
        color: var(--amarelo-forte);
        text-decoration: underline;
    }
`;


const Sair = styled(Links)`
    &:hover{
        color: #F13838;
    }
    cursor: pointer;
`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Main = styled.section`
    margin-left: 350px; /* largura do menu lateral */
    width: calc(100% - 350px); /* largura que sobra para o conteúdo principal */
    padding: 24px 40px;

    @media only screen and (max-width: 600px){
        margin-left: 0px;
        width: 100%;
        margin-top: 60px;
        padding: 24px 1px;
    }
`;

//////////////////////////////////////////////////////// Trocar pela imagem da pessoa
export function PerfilFoto({ tamanho }: { tamanho: string }) {
    return (
        <FotoPerfil tamanho={tamanho}>
            <SmallImage src={person} alt="Logo" />
        </FotoPerfil>
    )
}
////////////////////////////////////////////////////////////



export function ContainerLateralColaborador() {
    const navigate = useNavigate();
    const colaborador = useContext(ColaboradorContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams();


    const [menuAberto, setMenuAberto] = useState(!isMobile); // estado para controlar a visibilidade do menu
    // função para atualizar o estado quando o usuário clicar no botão do menu hamburguer
    function toggleMenu() {
        setMenuAberto(!menuAberto);
    }



    const logout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }


    return (
        <>
            <BarraBranca>
                <MenuIcon onClick={toggleMenu} fontSize='large' />
                <SmallImage src={logo} alt="Logo" />
            </BarraBranca>
            <SectionLateral className={menuAberto ? 'aberto' : 'fechado'}>
                <SmallImage src={logo} alt="Logo" />
                <Link to={`/colaborador/${id}`}>
                    <CardPerfil>
                        <PerfilFoto tamanho='200px' />
                        <h1>{colaborador?.nome}</h1>
                    </CardPerfil>
                </Link>
                <Sair localidade='' onClick={logout}>
                    <ClearIcon fontSize='large' sx={{ color: 'red' }} />
                    <h1>Sair</h1>
                </Sair>
            </SectionLateral>
        </>
    )
}



export function ContainerLateralGestor() {
    const localizacao = useLocation()
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const gestor = useContext(ColaboradorContext);


    const [menuAberto, setMenuAberto] = useState(!isMobile); // estado para controlar a visibilidade do menu
    // função para atualizar o estado quando o usuário clicar no botão do menu hamburguer
    function toggleMenu() {
        setMenuAberto(!menuAberto);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('gestor');
        navigate('/')
    }



    // Solicitações pendentes
    const solicitacoes = useContext(SolicitacoesContext);
    const solicitacoesPendentes = solicitacoes.filter((sol) => sol.status === "pendente")


    return (
        <>
            <BarraBranca>
                <MenuIcon onClick={toggleMenu} fontSize='large' />
                <SmallImage src={logo} alt="Logo" />
            </BarraBranca>
            <SectionLateral className={menuAberto ? 'aberto' : 'fechado'}>
                <SmallImage src={logo} alt="Logo" />
                <Link to={`/gestor/${id}/perfil`}>
                    <CardPerfil onClick={() => isMobile ? toggleMenu() : ''}>
                        <PerfilFoto tamanho='200px' />
                        <h1>{gestor?.nome}</h1>
                    </CardPerfil>
                </Link>

                <Link to={`/gestor/${id}`}>
                    <Links localidade={localizacao.pathname === `/gestor/${id}` ? 'ativo' : ''} onClick={() => isMobile ? toggleMenu() : ''}>
                        <GroupsIcon fontSize='large' />
                        <h1>Dashboard</h1>
                    </Links>
                </Link>

                <Link to={`/gestor/${id}/solicitacoes`}>
                    <Links localidade={localizacao.pathname === `/gestor/${id}/solicitacoes` ? 'ativo' : ''} onClick={() => isMobile ? toggleMenu() : ''}>
                        <Badge badgeContent={solicitacoesPendentes.length} color='success'>
                            <MailIcon fontSize='large' />
                        </Badge>
                        <h1>Solicitações</h1>
                    </Links>
                </Link>

                <Sair localidade='' onClick={logout}>
                    <ClearIcon fontSize='large' sx={{ color: 'red' }} />
                    <h1>Sair</h1>
                </Sair>
            </SectionLateral>
        </>
    )
}