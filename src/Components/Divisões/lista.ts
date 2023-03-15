import styled from "styled-components";

interface ListaProps{
    tamanho: string;
}

export const Lista = styled.section<ListaProps>`
    display: flex;
    flex-direction: column;
    background: var(--branco);
    border: solid 1px;
    box-shadow: 0px 0px 4px #000000;
    border-radius: 50px;
    width: ${props => props.tamanho === 'large' ? '70%' : '80%' };
    height: ${props => props.tamanho === 'large' ? '50em' : '20em' };
    margin: ${props => props.tamanho === 'large' ? '30px auto' : '20px 1px'};
    overflow: scroll;
`;

export const HeadLista = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 5em;
    background: var(--fundo);

`;

export const HeadTipo = styled.div<ListaProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.tamanho};
    height: 100%;
    border-right: solid 1px;
    overflow: auto;
`;

export const Item = styled(HeadLista)`
    background: transparent;
    height: 4em;

    &:hover{
        background: var(--fundo);
    }
`;

export const ItemTipo = styled(HeadTipo)`
    border-right: none;

`;
