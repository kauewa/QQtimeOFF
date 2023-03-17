import { TextField } from '@mui/material';
import { useState } from 'react';
import ApiService from '../../API';
import { ButtonSmall } from '../../Components/botao';
import { MainInicio, SectionInicio } from '../../Components/Divisões/pg1';
import { H1 } from '../../Components/texto';

const Logo: any = require('../../assets/TimeOFF.png');

export default function Login(){
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    const api = () => ApiService.login(matricula,senha);


    return(
        <MainInicio>
            <img src={Logo} alt="Logo" />
            <SectionInicio>
                <H1>Entrar</H1>
                <TextField id='Matricula' placeholder='Matricula' onChange={(e) => setMatricula(e.target.value)} value={matricula}/>
                <TextField id='senha' placeholder='Senha' onChange={(e) => setSenha(e.target.value)} value={senha}/>
                <ButtonSmall cor='' size='' onClick={api}>Entrar</ButtonSmall>
            </SectionInicio>
        </MainInicio>
            
    )
}