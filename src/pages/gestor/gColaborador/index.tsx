import { Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DivHorizontal, Head, Conteudo } from '../../../Components/Divisões/div';
import { HeadItem, HeadLista, Lista } from '../../../Components/Divisões/lista';
import { PerfilFoto } from '../../../Components/Divisões/SectionLateral';
import { ButtonSmall } from '../../../Components/inputs/inputs';
import { Hcolor } from '../../../Components/texto/textos';
import { colaboradores } from '../../../Entity/modeloColaboradores';
import { DivStatusGrande, NumStatus, TxtStatus } from '../dashboard/styles';



// Página do perfil de colaborador
export default function GestorColaborador(){
    const navigate = useNavigate();
    

    ///////////Passar alterações para o colaborador
    ////////////botao de excluir

    const {id} = useParams<{id: string}>();
    const colaborador = colaboradores.find((colab) => colab.id === id);

    const [funcao, setFuncao] = useState('');
    const [gestor, setGestor] = useState(colaborador?.gestor);
    const [clt, setClt] = useState(colaborador?.clt);

    const atualizarColaborador = () => {
        // colaborador.funcao = funcao;
        // colaborador.gestor = !gestor ? false : gestor;
        // colaborador.clt = !clt ? false: clt;
        navigate('/gestor');
    }

    if (!colaborador) {
        return <p>Colaborador não encontrado</p>;
    }

    return (
        <>
            <Head>
                <DivHorizontal tamanho=''>
                    <PerfilFoto tamanho=''/>
                    <Hcolor status={colaborador.status} tamanho='36px'>{colaborador.nome}</Hcolor>
                </DivHorizontal>
                <DivHorizontal tamanho='200px'>
                <DivStatusGrande>
                    <TxtStatus cor=''>Saldo férias</TxtStatus>
                    <NumStatus cor=''>{colaborador.saldo_ferias}</NumStatus>
                </DivStatusGrande>
                </DivHorizontal>
                
            </Head>
            <Conteudo>
                <h1>{colaborador.email}</h1>
                <h1>Fim periodo aquisitivo: {colaborador.fim_aquisitivo.format('DD/MM/YYYY')}</h1>
                <DivHorizontal tamanho='100%'>
                <DivHorizontal tamanho='45%'>
                    <Hcolor status='Disponivel' tamanho='16px'>Solicitações</Hcolor>
                    <Lista tamaho=''>
                        <HeadLista>
                            <HeadItem>
                                <h1>Inicio</h1>
                            </HeadItem>
                            <HeadItem>
                                <h1>Quantidade</h1>
                            </HeadItem>
                            <HeadItem>
                                <h1>Status</h1>
                            </HeadItem>
                        </HeadLista>
                    </Lista>
                    </DivHorizontal>
                    <DivHorizontal tamanho='45%'>
                    <Hcolor status='Disponivel' tamanho='16px'>Relacionados</Hcolor>
                    <Lista tamaho=''>
                        <HeadLista>
                            <HeadItem>
                                <h1>Nome</h1>
                            </HeadItem>
                            <HeadItem>
                                <h1>Status</h1>
                            </HeadItem>
                        </HeadLista>
                    </Lista>
                    
                    </DivHorizontal>
                </DivHorizontal>
                <div>
                    <h1>Gestor</h1>
                    <Switch
                    checked={gestor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setGestor(e.target.checked); console.log(e.target.checked)}}
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
