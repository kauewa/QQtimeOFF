import styled from "styled-components";

interface ListaProps{
    tamaho: string;
}

export const Lista = styled.section<ListaProps>`
    display: flex;
    flex-direction: column;
    background: var(--branco);
    border: solid 1px;
    box-shadow: 0px 0px 4px #000000;
    border-radius: 50px;
    width: ${props => props.tamaho === 'large' ? '70%' : '100%' };
    height: ${props => props.tamaho === 'large' ? '50em' : '20em' };
    margin: ${props => props.tamaho === 'large' ? '30px auto' : '20px 1px'};
    overflow: auto;
`;

export const HeadLista = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 5em;
    background: var(--fundo);

`;

export const HeadItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-grow: 1;
    border-right: solid 1px;
`;
