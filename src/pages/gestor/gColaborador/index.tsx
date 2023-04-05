import { Autocomplete, Box, CircularProgress, Fade, Switch, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DivHorizontal, Head, Conteudo } from '../../../Components/Divisões/div';
import { HeadTipo, HeadLista, Lista } from '../../../Components/Divisões/lista';
import { PerfilFoto } from '../../../Components/Divisões/pg2';
import { ButtonSmall } from '../../../Components/botao';
import { Hcolor, Hstatus } from '../../../Components/texto';
import { ColaboradoresContext, FuncoesContext } from '../../../context/contextGestor';
import { DivStatusGrande } from '../dashboard/styles';
import ApiService from '../../../API/RegrasDeNegocio';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColaboradoresRelacionados, ListarSolicitacoes } from '../../../utils';
import { enqueueSnackbar } from 'notistack';



// Página do perfil de colaborador
export default function GestorColaborador() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Identifica o colaborador
    const { idcolaborador } = useParams<{ idcolaborador: string }>();
    const colaboradores = useContext(ColaboradoresContext)
    const colaborador = colaboradores.find((colab) => colab.id === idcolaborador);


    // Variáveis para atualizar o colaborador
    const { id } = useParams();
    const [funcao, setFuncao] = useState<number | undefined>(colaborador?.funcao.idfuncao);
    const [gestor, setGestor] = useState(colaborador?.gestor);
    const [clt, setClt] = useState(colaborador?.clt);
    const funcoes = useContext(FuncoesContext);
    const [inputValue, setInputValue] = useState(colaborador?.funcao.nome_funcao);


    // opções para o autocomplete com as funções ja cadastradas
    const optionsFuncoes: any[] = []
    funcoes.forEach((func) => {
        const option = {
            label: func.nome_funcao,
            id: func.idfuncao,
            value: func.idfuncao
        }
        optionsFuncoes.push(option)
    })




    const atualizarColaborador = async () => {
        setLoading(true);
        const verificaDados = idcolaborador !== undefined && token && gestor !== undefined && clt !== undefined
        const possuiAlteracao = funcao !== colaborador?.funcao.idfuncao || gestor !== colaborador?.gestor || clt !== colaborador?.clt;
        const funcaoExiste = funcao !== undefined;

        if (verificaDados) {
            if (possuiAlteracao) {
                if (funcaoExiste) {

                    await ApiService.atualizarColaborador(idcolaborador, token, gestor, clt, funcao)
                    navigate(`/gestor/${id}`);

                } else if (inputValue !== undefined) {
                    const response = await ApiService.cadastrarFuncao(inputValue)

                    if (typeof response === "number") {
                        await ApiService.atualizarColaborador(idcolaborador, token, gestor, clt, response)
                        navigate(`/gestor/${id}`);
                    }
                    enqueueSnackbar(response, { variant: "warning" });
                }
            }
            navigate(`/gestor/${id}`);
        }
        setLoading(false)
    }



    const deletarColaborador = async () => {
        setLoading(true)
        if (idcolaborador !== undefined && token !== null) {
            await ApiService.deletarColaborador(idcolaborador, token)
            navigate(`/gestor/${id}`)
        }
        setLoading(false)
    }

    if (!colaborador) {
        return <p>Colaborador não encontrado</p>;
    }


    return (
        <>
            <Head>
                <DivHorizontal tamanho=''>
                    <PerfilFoto tamanho={isMobile ? '90px' : '140px'} />
                    <Hstatus cor={colaborador.status} tamanho='36px'>{colaborador.nome}</Hstatus>
                </DivHorizontal>
                <DivHorizontal tamanho='200px'>
                    <DivStatusGrande>
                        <Hcolor tamanho='28px' cor='var(--branco)'>Saldo férias</Hcolor>
                        <Hcolor tamanho='42px' cor='var(--branco)'>{colaborador.saldo_ferias}</Hcolor>
                    </DivStatusGrande>
                </DivHorizontal>

            </Head>
            <Conteudo>
                <h1>{colaborador.email}</h1>
                <h1>Fim periodo aquisitivo: {colaborador.fim_aquisitivo.format('DD/MM/YYYY')}</h1>

                {isMobile ? <br /> : <>
                    <DivHorizontal tamanho='100%'>
                        <DivHorizontal tamanho='45%'>
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
                                {ListarSolicitacoes(colaborador, false)}
                            </Lista>
                        </DivHorizontal>
                        <DivHorizontal tamanho='45%'>
                            <Hstatus cor='Disponivel' tamanho='16px'>Relacionados</Hstatus>
                            <Lista tamanho=''>
                                <HeadLista>
                                    <HeadTipo tamanho='50%'>
                                        <h1>Nome</h1>
                                    </HeadTipo>
                                    <HeadTipo tamanho='50%'>
                                        <h1>Status</h1>
                                    </HeadTipo>
                                </HeadLista>
                                {ColaboradoresRelacionados(colaboradores, colaborador)}
                            </Lista>

                        </DivHorizontal>
                    </DivHorizontal>
                    <div>
                        <h1>Gestor</h1>
                        <Switch
                            checked={gestor}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setGestor(e.target.checked); console.log(e.target.checked) }}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />

                    </div>
                    <div>
                        <h1>CLT</h1>
                        <Switch
                            checked={clt}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClt(e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />

                    </div>
                    <DivHorizontal tamanho='90%'>
                        <div >
                            <Autocomplete
                                disablePortal
                                freeSolo
                                options={optionsFuncoes}
                                onChange={(e, newValue) => { setFuncao(newValue.value); }}
                                inputValue={inputValue}
                                onInputChange={(e, newValue) => { setFuncao(undefined); setInputValue(newValue); }}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Funções" color="success" />}
                            />
                        </div>
                        <DivHorizontal tamanho='20%'>
                            <ButtonSmall cor='laranja' size='' onClick={deletarColaborador}>Excluir</ButtonSmall>
                            <ButtonSmall cor='' size='' onClick={atualizarColaborador}>Pronto</ButtonSmall>
                        </DivHorizontal>
                    </DivHorizontal>
                </>
                }


            </Conteudo>
            <Box sx={{
                position: 'absolute', bottom: 20,
                right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <Box sx={{ height: 60 }}>
                    <Fade
                        in={loading}
                        unmountOnExit
                    >
                        <CircularProgress
                            size={60}
                            color='success'
                        />
                    </Fade>
                </Box>
            </Box>
        </>

    )
}
