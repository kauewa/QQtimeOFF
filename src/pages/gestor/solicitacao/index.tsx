import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from 'react'
import { Conteudo, DivColuna, DivHorizontal, Head } from "../../../Components/Divisões/div";
import { HeadLista, HeadTipo, Item, ItemTipo, Lista } from "../../../Components/Divisões/lista";
import { ButtonSmall } from "../../../Components/botao";
import { H1, Hstatus } from "../../../Components/texto";
import { Colaborador, ColaboradoresContext, SolicitacoesPendentesContext } from "../../../context/contextGestor";
import ApiService from "../../../API";

export default function Solicitacao() {
    const { id, idsolicitacao } = useParams();
    const solicitacoes = useContext(SolicitacoesPendentesContext);
    const colaboradores = useContext(ColaboradoresContext)
    const solicitacao = solicitacoes.find((sol) => sol.id.toString() === idsolicitacao);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [resposta, setResposta] = useState('');

    if (!solicitacao) {
        return (
            <h1>Solicitação não encontrada</h1>
        )
    }
    

    const retorno = async (status: string) => {
        if (token !== null) {

            await ApiService.respostaSolicitacao(solicitacao.id, resposta, status, token)
            navigate(`/gestor/${id}/solicitacoes`)

        }
    }

    const colaborador = colaboradores.find(colab => colab.id === solicitacao.idSolicitante)

    const ColaboradoresRelacionados = () => {
        const colaboradoresRelacionados: Colaborador[] = colaboradores.filter((colab) => colab.funcao.idfuncao === colaborador?.funcao.idfuncao)

        return (
            <>
                {colaboradoresRelacionados.map((colab) => {
                    if (colaborador?.id !== colab.id) {
                        return (
                            <Item>
                                <ItemTipo tamanho="50%">
                                    <Hstatus tamanho="18px" cor={colab.status}>{colab.nome}</Hstatus>
                                </ItemTipo>
                                <ItemTipo tamanho="50%">
                                    <Hstatus tamanho="18px" cor={colab.status}>{colab.status}</Hstatus>
                                </ItemTipo>
                            </Item>
                        )
                    }
                })}
            </>
        )
    }


    return (
        <>
            <Head>
                <H1>{colaborador?.nome}</H1>
                <DivColuna tamanho="">
                    <Hstatus tamanho="35px" cor="Disponivel">Dev</Hstatus>
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
                            {ColaboradoresRelacionados()}
                        </Lista>
                    </DivHorizontal>
                </DivHorizontal>
                <div>
                    <h1><strong>Mensagem:</strong></h1>
                    <h1>{solicitacao.comentario}</h1>
                </div>
                <DivHorizontal tamanho="100%">
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
                    </DivHorizontal>

                    <DivHorizontal tamanho="">
                        <ButtonSmall cor='laranja' size='' onClick={() => retorno('reprovado')}>Recusar</ButtonSmall>
                        <ButtonSmall cor='' size='' onClick={() => retorno('aprovado')}>Aceitar</ButtonSmall>
                    </DivHorizontal>
                </DivHorizontal>
            </Conteudo>
        </>
    )
}