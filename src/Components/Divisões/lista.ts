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
    overflow: auto;
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

        @media only screen and  (max-width: 600px) {
            width: 90%;
        }


        ${props => props.tamanho === 'dashboard' || 'large' ? '@media only screen and (max-width: 600px) {height: 630px;}' : '@media only screen and (max-width: 600px) {display: none;}'}

                
`;

export const HeadLista = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 5em;
    background: var(--fundo-secundario);
    border-bottom: solid 1px; 
    position: sticky;
    top: 0;

`;

export const HeadTipo = styled.div<ListaProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.tamanho};
    height: 100%;
    border-right: solid 1px;
    overflow: hidden;
    word-break: break-word;
`;

export const Item = styled(HeadLista)`
    background: transparent;
    height: 4.5em;
    border-bottom: solid 1px var(--fundo-secundario);

    &:hover{
        background: var(--fundo);
    }

    overflow: auto;

    @media only screen and (max-width: 600px) {
        height: 6em;
    }

`;

export const ItemTipo = styled(HeadTipo)`
    border-right: none;
`;
