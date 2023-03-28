import styled from 'styled-components';
import { SmallImage } from "../../imagem/imagem";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext } from 'react';
import { SolicitacoesPendentesContext } from '../../../context/contextGestor';

const logo: any = require('../../../assets/TimeOFF.png');
const person: any = require('../../../assets/person.png');

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
`;

interface PerfilFotoProps {
    tamanho: string;
}

const FotoPerfil = styled.section<PerfilFotoProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${props => props.tamanho === "large" ? "200px" : "140px"};
    height: ${props => props.tamanho === "large" ? "190px" : "130px"};
    padding-top: 15px;
    background-color: var(--verde-forte);
    box-shadow: 0px 0px 15px 1px #BBFF84;
    border-radius: 300px;

`;

interface LinksProps {
    localidade: string;
}

const Links = styled.div<LinksProps>`
    display: flex;
    align-items: center;
    width: 110%;
    justify-content: space-between;
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
`;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Main = styled.section`
    margin-left: 350px; /* largura do menu lateral */
    width: calc(100% - 350px); /* largura que sobra para o conteúdo principal */
    padding: 24px 40px;
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

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('gestor');
        navigate('/')
    }


    return (
        <SectionLateral>
            <SmallImage src={logo} alt="Logo" />
            <CardPerfil>
                <PerfilFoto tamanho='large' />
                <h1>Gestor</h1>
            </CardPerfil>
                <Sair localidade='' onClick={logout}>
                    <ClearIcon fontSize='large' sx={{ color: 'red' }} />
                    <h1>Sair</h1>
                </Sair>
        </SectionLateral>
    )
}

export function ContainerLateralGestor() {
    const localizacao = useLocation()
    const navigate = useNavigate();
    const { id } = useParams();
    const solicitacoesPendentes = useContext(SolicitacoesPendentesContext);

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('gestor');
        navigate('/')
    }

    return (
        <SectionLateral>
            <SmallImage src={logo} alt="Logo" />
            <CardPerfil>
                <PerfilFoto tamanho='large' />
                <h1>Gestor</h1>
            </CardPerfil>

            <Link to={`/gestor/${id}`}>
                <Links localidade={localizacao.pathname === `/gestor/${id}` ? 'ativo' : ''}>
                    <GroupsIcon fontSize='large' />
                    <h1>Dashboard</h1>
                </Links>
            </Link>

            <Link to={`/gestor/${id}/solicitacoes`}>
                <Links localidade={localizacao.pathname === `/gestor/${id}/solicitacoes` ? 'ativo' : ''}>
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
    )
}