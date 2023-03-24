import { ContainerLateralColaborador, Main } from "../../Components/Divisões/pg2";
import { Hcolor, Hstatus } from "../../Components/texto";
import { Conteudo, DivColuna, DivHorizontal, Head, Cadastrar } from '../../Components/Divisões/div';
import { useContext, useEffect } from 'react';
import { DivStatusGrande } from '../gestor/dashboard/styles';
import { HeadLista, HeadTipo, Lista } from '../../Components/Divisões/lista';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { CadastrarSolcitacao } from './cadastro';
import { ColaboradorContext, ColaboradorProvider } from "../../context/contextColaborador";




// Falta fazer o cadastro de solicitação
export default function Colaborador() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const colaborador = useContext(ColaboradorContext);

    useEffect(() => {
        if(!token){
            navigate('/')
        }else{
            const m: any = jwtDecode(token)
            if (localStorage.getItem('gestor') === "true") {
                navigate(`/gestor/${m.matricula}`)
            }
        }
    }, [])
    

    return (
        <ColaboradorProvider>
            <ContainerLateralColaborador />
            <Main>
                <Head>
                    <DivHorizontal tamanho='200px'>
                        <DivStatusGrande>
                            <Hcolor tamanho='28px' cor='var(--branco)'>Saldo férias</Hcolor>
                            <Hcolor tamanho='42px' cor='var(--branco)'>{colaborador !== undefined ? colaborador.saldo_ferias : 0}</Hcolor>
                        </DivStatusGrande>
                    </DivHorizontal>
                </Head>
                <Conteudo>
                    <Cadastrar>
                        <DivColuna tamanho=''>
                            <Hstatus cor='Disponivel' tamanho='24px'>Dev Junior</Hstatus>
                            <h1>CLT</h1>
                        </DivColuna>
                        <DivHorizontal tamanho='100%'>
                            <DivHorizontal tamanho='40%'>
                                <Hstatus cor='Disponivel' tamanho='16px'>Solicitações</Hstatus>
                                <Lista tamanho=''>
                                    <HeadLista>
                                        <HeadTipo tamanho="25%">
                                            <h1>Criado</h1>
                                        </HeadTipo>
                                        <HeadTipo tamanho="25%">
                                            <h1>Inicio</h1>
                                        </HeadTipo>
                                        <HeadTipo tamanho="25%">
                                            <h1>Quantidade</h1>
                                        </HeadTipo>
                                        <HeadTipo tamanho="25%">
                                            <h1>Status</h1>
                                        </HeadTipo>
                                    </HeadLista>
                                </Lista>
                            </DivHorizontal>
                            <DivHorizontal tamanho='40%'>
                                <CadastrarSolcitacao />
                            </DivHorizontal>
                        </DivHorizontal>
                        <DivColuna tamanho=''>
                            <h1>Fim periodo aquisitivo: 01/09/2023</h1>
                        </DivColuna>
                    </Cadastrar>
                </Conteudo>
            </Main>
        </ColaboradorProvider>

    )
}