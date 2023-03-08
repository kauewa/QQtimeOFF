import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Cadastrar } from "../../Components/Divisões/SectionCadastro";
import { ContainerLateralColaborador, Main } from "../../Components/Divisões/SectionLateral";
import { H1 } from "../../Components/texto/textos";
import { HeadCadastroSolicitacao } from "./styles";
import { Switch, TextField } from '@mui/material';
import { Div } from '../../Components/Divisões/div';
import { ButtonSmall } from '../../Components/inputs/inputs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';



// Falta fazer o cadastro de solicitação
export default function Colaborador(){
    const [value, setValue] = useState<Dayjs | null>(null);

    return(
        <>
            <ContainerLateralColaborador/>
        <Main>
            <H1>Solicitar</H1> 
            <Cadastrar>
                <HeadCadastroSolicitacao>
                    <h1>Kauê Wandscher</h1>
                    <Div>
                        <h1>Dev Junior</h1>
                        <h1>CLT</h1>
                    </Div>
                </HeadCadastroSolicitacao>
                <Div>
                    <h1>Inicio</h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD/MM/YYYY" value={value} onChange={(newValue) => {
                                setValue(newValue);
                                console.log(value);
                                }} />
                    </LocalizationProvider>
                </Div>
                <Div>
                    <h1>Quantidade de dias</h1>
                    <TextField type="number" placeholder='dias'/>
                </Div>
                <Div>
                    <h1>Décimo terceiro</h1>
                    <Switch  />
                </Div>
                <ButtonSmall size='large'>
                    Solicitar
                </ButtonSmall>
                
            </Cadastrar>
        </Main>
        </>
        
    )
}