import styled from "styled-components";


interface ListaProps {
    tamanho: string;
}

export const Lista = styled.section<ListaProps>`
    display: flex;
    flex-direction: column;
    background: var(--branco);
    box-shadow: 0px 0px 15px 0.5px var(--verde-forte);
    border-radius: 50px;
    width: ${props =>
        props.tamanho === 'large'
          ? '70%'
          : props.tamanho === 'dashboard'
          ? '60%'
          : '80%'};
      height: ${props =>
        props.tamanho === 'large'
          ? '50em'
          : props.tamanho === 'dashboard'
          ? '700px'
          : '24em'};
      margin: ${props =>
        props.tamanho === 'large'
          ? '30px auto'
          : props.tamanho === 'dashboard'
          ? '20px' 
          : '20px 1px'};
    overflow: scroll;
`;

export const HeadLista = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 5em;
    background: var(--fundo-secundario);
    border-bottom: solid 1px; 

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
    height: 4.5em;
    border-bottom: solid 1px var(--fundo-secundario);

    &:hover{
        background: var(--fundo);
    }
`;

export const ItemTipo = styled(HeadTipo)`
    border-right: none;
    
`;
