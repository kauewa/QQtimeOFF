import styled from 'styled-components';
import { SmallImage } from "../imagem/imagem";
import { Link, useLocation } from 'react-router-dom';

const logo:any = require('../../assets/TimeOFF.png');
const logout:any = require('../../assets/logout.png');
const time:any = require('../../assets/dashboard.png');
const solicitacoes:any = require('../../assets/Solicitacoes.png');
const person:any = require('../../assets/person.png');

export const Main = styled.section`
    margin-left: 350px; /* largura do menu lateral */
    width: calc(100% - 350px); /* largura que sobra para o conteúdo principal */
    padding: 24px 40px;
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

interface PerfilFotoProps{
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

export function PerfilFoto({tamanho}:{tamanho: string}){
    return(
        <FotoPerfil tamanho={tamanho}>
            <SmallImage src={person} alt="Logo"/>
        </FotoPerfil>
    )
}

interface LinksProps{
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




export function ContainerLateralColaborador(){
    return(
        <SectionLateral>
             <SmallImage src={logo} alt="Logo" />
            <CardPerfil>
                <PerfilFoto tamanho='large'/>
                <h1>Gestor</h1>
            </CardPerfil>
            <Link to="/" >
                <Sair localidade=''>
                    <img src={logout} alt="Logo"/>
                    <h1>Sair</h1>
                </Sair>
            </Link>
        </SectionLateral>
    )
}







export function ContainerLateralGestor(){
    const localizacao = useLocation()

    return(
        <SectionLateral>
            <SmallImage src={logo} alt="Logo" />
            <CardPerfil>
                <PerfilFoto tamanho='large'/>
                <h1>Gestor</h1>
            </CardPerfil>
            
            <Link to='/gestor'>
                <Links localidade={localizacao.pathname === '/gestor' ? 'ativo' : ''}>
                    <img src={time} alt="Logo"/>
                    <h1>Dashboard</h1>
                </Links>
            </Link>
                
            <Link to='/gestor/solicitacoes'>
                <Links localidade={localizacao.pathname === '/gestor/solicitacoes' ? 'ativo' : ''}>
                    <img src={solicitacoes} alt="Logo"/>
                    <h1>Solicitações</h1>
                </Links>
            </Link>
                
            <Link to="/" >
                <Sair localidade=''>
                    <img src={logout} alt="Logo"/>
                    <h1>Sair</h1>
                </Sair>
            </Link>
        </SectionLateral>
    )
}