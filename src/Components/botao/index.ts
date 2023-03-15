import styled from 'styled-components';

interface ButtonSmallProps{
    size: string;
    cor: string;
}

export const ButtonSmall = styled.button<ButtonSmallProps>`
width: ${props => props.size === 'large' ? '150px' : '100px'};
padding: ${props => props.size === 'large' ? '24px' : '16px'};
background-color: ${props => props.cor === 'laranja' ? 'var(--laranja)' : 'var(--verde-forte)'};
color: var(--branco);
border: none;
border-radius: 1rem;
box-shadow: ${props => props.cor === 'laranja' ? '' : '0 0 8px #00000042'};
transition: 500ms;

&:hover{
    cursor: pointer;
    box-shadow: ${props => props.cor === 'laranja' ? '0 0 8px var(--laranja)' : '0 0 8px var(--verde-forte)'};
}`;

