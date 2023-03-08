import styled from "styled-components";


export const ListaSolicitações = styled.section`
    display: flex;
    flex-direction: column;
    background: var(--branco);
    border: solid 1px;
    box-shadow: 0px 0px 4px #000000;
    border-radius: 50px;
    width: 70%;
    height: 50em;
    margin: 30px auto auto auto;
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