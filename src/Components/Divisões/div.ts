import styled from "styled-components";



/////////////////////// Divisões principais
export const Head = styled.div`
    display: flex;
    margin: 12px auto;
    width: 80%;
    justify-content: space-between;
    align-items: center;
`;

export const Conteudo = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 80%;
    height: 44em;
    background-color: var(--branco);
    box-shadow: 0px 0px 15px 1px #BBFF84;
    border-radius: 50px;
    margin: auto auto;
    padding: 30px 50px;
`;
////////////////////////////////////////////



/////////////////////////// Divisões extra
interface Tamanho{
    tamanho: string;
}

export const DivColuna = styled.div<Tamanho>`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${props => props.tamanho};
    justify-content: space-evenly;
`; 

export const DivBranco = styled.div`
    margin-top: 16px;
    background: var(--branco);
    border-radius: 36px;
    box-shadow: 0px 0px 15px 1px #BBFF84;
`;

export const DivHorizontal = styled.div<Tamanho>`
    display: flex;
    width: ${props => props.tamanho};
    align-items: center;
    justify-content: space-between;
    
`;

export const Cadastrar = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    padding: 30px;
`;
