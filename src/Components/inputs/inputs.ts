import styled from 'styled-components';

interface ButtonSmallProps{
    size: string;
}

export const ButtonSmall = styled.button<ButtonSmallProps>`
width: ${props => props.size === 'large' ? '150px' : '100px'};
padding: ${props => props.size === 'large' ? '24px' : '16px'};
background-color: var(--verde-forte);
color: var(--branco);
border: none;
border-radius: 1rem;
box-shadow: 0 0 8px #00000042;
transition: 500ms;

&:hover{
    cursor: pointer;
    box-shadow: 0 0 10px var(--verde-forte);
}`;

