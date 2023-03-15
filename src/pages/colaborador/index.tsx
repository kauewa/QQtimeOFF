import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ContainerLateralColaborador, Main } from "../../Components/Divisões/pg2";
import { Hcolor, Hstatus } from "../../Components/texto";
import { Switch, TextField } from '@mui/material';
import { Conteudo, DivColuna, DivHorizontal, Head, Cadastrar } from '../../Components/Divisões/div';
import { ButtonSmall } from '../../Components/botao';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { DivStatusGrande } from '../gestor/dashboard/styles';
import { HeadLista, HeadTipo, Lista } from '../../Components/Divisões/lista';




// Falta fazer o cadastro de solicitação
export default function Colaborador() {
    const [value, setValue] = useState<Dayjs | null>(null);

    return (
        <>
            <ContainerLateralColaborador />
            <Main>
                <Head>
                    <DivHorizontal tamanho='200px'>
                        <DivStatusGrande>
                            <Hcolor tamanho='' cor=''>Saldo férias</Hcolor>
                            <Hcolor tamanho='' cor=''>0</Hcolor>
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
                                <Lista tamanho=''>
                                    <DivColuna tamanho=''>
                                        <Hstatus tamanho='24px' cor='Disponivel'>Solicitar</Hstatus>
                                        <h1>Inicio</h1>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker format="DD/MM/YYYY" value={value} onChange={(newValue) => {
                                                setValue(newValue);
                                                console.log(value);
                                            }} />
                                        </LocalizationProvider>
                                        <h1>Quantidade de dias</h1>
                                        <TextField type="number" placeholder='dias' />
                                        <h1>Décimo terceiro</h1>
                                        <Switch />
                                        <ButtonSmall cor='' size=''>
                                            Solicitar
                                        </ButtonSmall>
                                    </DivColuna>
                                </Lista>
                            </DivHorizontal>
                        </DivHorizontal>
                        <DivColuna tamanho=''>
                            <h1>Fim periodo aquisitivo: 01/09/2023</h1>
                        </DivColuna>
                    </Cadastrar>
                </Conteudo>
            </Main>
        </>

    )
}