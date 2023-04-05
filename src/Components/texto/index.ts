import styled from "styled-components";


export const H1 = styled.h1`
font-weight: 900;
font-size: 36px;

`;

interface textoProps{
    tamanho: string;
    cor: string;
}

export const Hstatus = styled(H1)<textoProps>`
    font-size: ${props => props.tamanho};
    color: ${props => props.cor === 'Disponivel' ? 'var(--verde-forte)' : 
    (props.cor === 'Aceito' ? 'var(--amarelo-forte)' : 
    (props.cor === 'Ferias' ? 'var(--laranja)' : 
    (props.cor === 'Atraso' ? 'red' : '')))};

    @media only screen and (max-width: 600px) {
        font-size: 16px;
    }
`;

export const Hcolor = styled(Hstatus)`
    color: ${props => props.cor}
`;


