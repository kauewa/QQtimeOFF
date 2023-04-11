import { Box, CircularProgress, Fade, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from 'react'
import { Conteudo, DivColuna, DivHorizontal, Head } from "../../Components/Divisões/div";
import { HeadLista, HeadTipo, Lista } from "../../Components/Divisões/lista";
import { ButtonSmall } from "../../Components/botao";
import { H1, Hstatus } from "../../Components/texto";
import { ColaboradoresContext, SolicitacoesContext } from "../../context/contextGestor";
import ApiService from "../../API/RegrasDeNegocio";
import { ColaboradoresRelacionados } from "../../utils";
import { ColaboradorContext } from "../../context/contextColaborador";

export default function Solicitacao() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const colaboradores = useContext(ColaboradoresContext);
    const [resposta, setResposta] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const localizacao = useLocation();
    const colab = useContext(ColaboradorContext)
    const { id, idsolicitacao } = useParams();

    // Identifica se a solicitação é minha ou de outro colaborador
    const minhaSolicitacao = localizacao.pathname === `/colaborador/${id}/minhasolicitacao/${idsolicitacao}` || localizacao.pathname === `/gestor/${id}/minhasolicitacao/${idsolicitacao}`;

    // Identifica a solicitação

    const solicitacoes = useContext(SolicitacoesContext);
    const solicitacao = minhaSolicitacao ? colab?.solicitacoes.find((sol) => sol.id.toString() === idsolicitacao) : solicitacoes.find((sol) => sol.id.toString() === idsolicitacao);


    if (!solicitacao) {
        return (
            <h1>Solicitação não encontrada</h1>
        )
    }

    // Identifica o colaborador que fez a solicitação
    const colaborador = minhaSolicitacao ? colab : colaboradores.find(colab => colab.id === solicitacao.idSolicitante)


    const retorno = async (status: string) => {
        setLoading(true)
        if (token !== null) {

            await ApiService.respostaSolicitacao(solicitacao.id, resposta, status, token)
            navigate(`/gestor/${id}/solicitacoes`)

        }
        setLoading(false)
    }


    return (
        <>
            <Head>
                <H1>{colaborador?.nome}</H1>
                <DivColuna tamanho="">
                    <Hstatus tamanho="35px" cor="Disponivel">{colaborador?.funcao.nome_funcao}</Hstatus>
                    <h1>{colaborador?.clt ? "CLT" : "PJ"}</h1>
                </DivColuna>
            </Head>
            <Conteudo>
                <DivHorizontal tamanho="100%">
                    <div>
                        <h1>Socilitação criada dia: {solicitacao.data_criacao.format('DD/MM/YYYY')}</h1>
                        <br />
                        <h1>Inicio das férias: {solicitacao.inicio_ferias.format('DD/MM/YYYY')}</h1>
                        <br />
                        <h1>Quantidade de dias: {solicitacao.qtd_dias}</h1>
                        <br />
                        <h1>Retorno: {solicitacao.fim_ferias.format('DD/MM/YYYY')}</h1>
                        <br />
                        <h1>Décimo terceiro: {solicitacao.decimo_terceiro ? "Solicitado" : "Não solicitado"}</h1>
                    </div>

                    {isMobile || minhaSolicitacao ?
                        '' :
                        <DivHorizontal tamanho="40%">
                            <h1>Relacionados</h1>
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
                    }

                </DivHorizontal>
                <div>
                    <h1><strong>Mensagem:</strong></h1>
                    <h1>{minhaSolicitacao ? solicitacao.retorno : solicitacao.comentario}</h1>
                </div>

                <DivHorizontal tamanho="100%">
                    {
                        minhaSolicitacao ? '' :
                            <DivHorizontal tamanho="50%">
                                <TextField
                                    multiline
                                    focused
                                    value={resposta}
                                    color="success"
                                    rows={4}
                                    onChange={(e: any) => setResposta(e.target.value)}
                                    fullWidth
                                    label="Mensagem de retorno"
                                    placeholder="Mensagem"
                                />
                            </DivHorizontal>}

                    <DivHorizontal tamanho="">
                        {solicitacao.status === "pendente" && !minhaSolicitacao ?
                            <>
                                <ButtonSmall cor='laranja' size='' onClick={() => retorno('reprovado')}>Recusar</ButtonSmall>
                                <ButtonSmall cor='' size='' onClick={() => retorno('aprovado')}>Aceitar</ButtonSmall>
                            </> :
                            <Hstatus tamanho="21px" cor={solicitacao.status ==="aprovado"? 'Disponivel' : 'Atraso'}>{solicitacao.status}</Hstatus>}
                    </DivHorizontal>
                </DivHorizontal>
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