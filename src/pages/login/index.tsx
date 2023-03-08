import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { ButtonSmall } from '../../Components/inputs/inputs';
import { MainInicio, SectionInicio } from '../../Components/Divisões/SectionInicio';
import { H1 } from '../../Components/texto/textos';

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
                <Link to={usuario === 'gestor'? '/gestor' : '/colaborador'}><ButtonSmall size=''>Entrar</ButtonSmall></Link>
            </SectionInicio>
        </MainInicio>
            
    )
}