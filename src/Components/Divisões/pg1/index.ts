import styled from 'styled-components';

export const MainInicio = styled.main`
    width: 50%;
    margin: auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

export const SectionInicio = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--branco);
    height: 500px;
    justify-content: space-evenly;
    padding: 50px 150px;
    border-radius: 2rem;
    box-shadow: 0 0 20px 1px #bbff846c;

    @media only screen and (max-width: 768px) {
        padding: 50px 100px;
    }

`;
