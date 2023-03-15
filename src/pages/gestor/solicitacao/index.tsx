import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { Conteudo, DivColuna, DivHorizontal, Head } from "../../../Components/Divisões/div";
import { HeadLista, HeadTipo, Lista } from "../../../Components/Divisões/lista";
import { ButtonSmall } from "../../../Components/inputs/inputs";
import { H1, Hcolor } from "../../../Components/texto/textos";
import { solicitacoes } from "../../../Entity/modeloSolicitacao";

export default function Solicitacao(){
    const {id} = useParams();
    const solicitacao = solicitacoes.find((sol) => sol.id.toString() === id);
    return(
        <>
        <Head>
            <H1>Nome</H1>
            <DivColuna tamanho="">
                <Hcolor tamanho="35px" status="Disponivel">Dev</Hcolor>
                <h1>CLT</h1>
            </DivColuna>
        </Head>
        <Conteudo>
            <DivHorizontal tamanho="100%">
                <div>
                    <h1>Socilitação criada dia: {solicitacao?.data_solicitacao.format('DD/MM/YYYY')}</h1>
                    <br/>
                    <h1>Inicio das férias: {solicitacao?.inicio_ferias.format('DD/MM/YYYY')}</h1>
                    <br/>
                    <h1>Quantidade de dias: {solicitacao?.qtd_dias}</h1>
                    <br/>
                    <h1>Retorno: {solicitacao?.fim_ferias.format('DD/MM/YYYY')}</h1>
                    <br/>
                    <h1>Décimo terceiro: Não solicitado</h1>
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
                    </Lista>
                </DivHorizontal>
            </DivHorizontal>
            <div>
                <h1><strong>Mensagem:</strong></h1>
                <h1>Estou planejando umas férias com minha família, ai queria ver se é possível tirar férias nesse período.</h1>
            </div>
            <DivHorizontal tamanho="100%">
                <DivHorizontal tamanho="50%">
                    <TextField
                    multiline
                    focused
                    color="success"
                    rows={4}
                    fullWidth
                    label="Mensagem de retorno"
                    placeholder="Mensagem"
                    />
                </DivHorizontal>
            
            <DivHorizontal tamanho="">
                <ButtonSmall cor='laranja' size=''>Excluir</ButtonSmall>
                <ButtonSmall cor='' size=''>Pronto</ButtonSmall>
            </DivHorizontal>
            </DivHorizontal>
        </Conteudo>
        </>
    )
}