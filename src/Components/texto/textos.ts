import styled from "styled-components";

export const H1 = styled.h1`
font-weight: 900;
font-size: 36px;
`;

interface h1StatusProps{
    status: string;
}

export const Hcolor = styled.h1<h1StatusProps>`
    font-size: 21px;
    color: ${props => props.status === 'Disponivel' ? 'var(--verde-forte)' : 
    (props.status === 'Aceito' ? 'var(--amarelo-forte)' : 
    (props.status === 'Ferias' ? 'var(--laranja)' : 
    (props.status === 'Atraso' ? 'red' : '')))}
`;