import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ContainerLateralColaborador, Main } from "../../Components/Divisões/SectionLateral";
import { H1, Hcolor } from "../../Components/texto/textos";
import { Switch, TextField } from '@mui/material';
import { Conteudo, DivColuna, DivHorizontal, Head, Cadastrar } from '../../Components/Divisões/div';
import { ButtonSmall } from '../../Components/inputs/inputs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { DivStatusGrande, NumStatus, TxtStatus } from '../gestor/dashboard/styles';
import { HeadLista, HeadTipo, Lista } from '../../Components/Divisões/lista';




// Falta fazer o cadastro de solicitação
export default function Colaborador(){
    const [value, setValue] = useState<Dayjs | null>(null);

    return(
        <>
            <ContainerLateralColaborador/>
        <Main>
            <Head>
                <H1>Kauê Wandscher</H1> 
                <DivHorizontal tamanho='200px'>
                <DivStatusGrande>
                    <TxtStatus cor=''>Saldo férias</TxtStatus>
                    <NumStatus cor=''>0</NumStatus>
                </DivStatusGrande>
                </DivHorizontal>
            </Head>
            
            <Conteudo>
                <Cadastrar>
                    <DivColuna tamanho=''>
                        <h1>Dev Junior</h1>
                        <h1>CLT</h1>
                    </DivColuna>
                <DivHorizontal tamanho='100%'>
                    <DivHorizontal tamanho='50%'>
                    <Hcolor status='Disponivel' tamanho='16px'>Solicitações</Hcolor>
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
                    <Hcolor tamanho='24px' status='Disponivel'>Solicitar</Hcolor>
                    <h1>Inicio</h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD/MM/YYYY" value={value} onChange={(newValue) => {
                                setValue(newValue);
                                console.log(value);
                                }} />
                    </LocalizationProvider>
                
                
                    <h1>Quantidade de dias</h1>
                    <TextField type="number" placeholder='dias'/>
                
                
                
                    <h1>Décimo terceiro</h1>
                    <Switch  />
                
                
                    <ButtonSmall cor='' size='large'>
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