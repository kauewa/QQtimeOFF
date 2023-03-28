import { Switch, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DivHorizontal, Head, Conteudo } from '../../../Components/Divisões/div';
import { HeadTipo, HeadLista, Lista, Item, ItemTipo } from '../../../Components/Divisões/lista';
import { PerfilFoto } from '../../../Components/Divisões/pg2';
import { ButtonSmall } from '../../../Components/botao';
import { Hcolor, Hstatus } from '../../../Components/texto';
import { Colaborador, ColaboradoresContext } from '../../../context/contextGestor';
import { DivStatusGrande } from '../dashboard/styles';



// Página do perfil de colaborador
export default function GestorColaborador() {
    const navigate = useNavigate();
    const { idcolaborador } = useParams<{ idcolaborador: string }>();
    const colaboradores = useContext(ColaboradoresContext)
    const colaborador = colaboradores.find((colab) => colab.id === idcolaborador);


    const { id } = useParams();
    const [funcao, setFuncao] = useState('');
    const [gestor, setGestor] = useState(colaborador?.gestor);
    const [clt, setClt] = useState(colaborador?.clt);

    const atualizarColaborador = () => {
        // colaborador.funcao = funcao;
        // colaborador.gestor = !gestor ? false : gestor;
        // colaborador.clt = !clt ? false: clt;
        navigate(`/gestor/${id}`);
    }

    if (!colaborador) {
        return <p>Colaborador não encontrado</p>;
    }


    const ColaboradoresRelacionados = () => {
        const colaboradoresRelacionados: Colaborador[] = colaboradores.filter((colab) => colab.funcao.idfuncao === colaborador.funcao.idfuncao)

        return (
            <>
                {colaboradoresRelacionados.map((colab) => {
                    if (colaborador.id !== colab.id) {
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


    const ListarSolicitacoes = () => {

        return (
            <>
                {colaborador.solicitacoes.map((item) => (
                    <Item>
                        <ItemTipo tamanho="25%">
                            <h1>{item.data_criacao.format("DD/MM/YYYY")}</h1>
                        </ItemTipo>
                        <ItemTipo tamanho="25%">
                            <h1>{item.inicio_ferias.format("DD/MM/YYYY")}</h1>
                        </ItemTipo>
                        <ItemTipo tamanho="25%">
                            <h1>{item.qtd_dias}</h1>
                        </ItemTipo>
                        <ItemTipo tamanho="25%">
                            <h1>{item.status}</h1>
                        </ItemTipo>
                    </Item>
                ))}
            </>

        )

    }


    return (
        <>
            <Head>
                <DivHorizontal tamanho=''>
                    <PerfilFoto tamanho='' />
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
                            {ListarSolicitacoes()}
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
                            {ColaboradoresRelacionados()}
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
                        <h1>Função</h1>
                        <TextField
                            id="funcao"
                            label="Função"
                            variant="outlined"
                            value={funcao}
                            onChange={(e) => setFuncao(e.target.value)}
                        />
                    </div>
                    <DivHorizontal tamanho='20%'>
                        <ButtonSmall cor='laranja' size=''>Excluir</ButtonSmall>
                        <ButtonSmall cor='' size='' onClick={atualizarColaborador}>Pronto</ButtonSmall>
                    </DivHorizontal>
                </DivHorizontal>
            </Conteudo>
        </>

    )
}
