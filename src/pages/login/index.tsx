import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { ButtonSmall } from '../../Components/botao';
import { MainInicio, SectionInicio } from '../../Components/Divisões/pg1';
import { H1 } from '../../Components/texto';

const Logo: any = require('../../assets/TimeOFF.png');
interface InicioProps{
    usuario: string;
}

// Login, que talvez se torne a página principal
export default function Login({ usuario }:InicioProps){
    return(
        <MainInicio>
            <img src={Logo} alt="Logo" />
            <SectionInicio>
                <H1>Entrar</H1>
                <TextField id='email' placeholder='Email'/>
                <TextField id='senha' placeholder='Senha'/>
                <Link to={usuario === 'gestor'? '/gestor' : '/colaborador'}><ButtonSmall cor='' size=''>Entrar</ButtonSmall></Link>
            </SectionInicio>
        </MainInicio>
            
    )
}