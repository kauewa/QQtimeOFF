import { Link } from 'react-router-dom';
import { ButtonSmall } from '../../Components/inputs/inputs';
import { MainInicio, SectionInicio } from '../../Components/Divisões/SectionInicio';

const Logo: any = require('../../assets/TimeOFF.png');


// Ainda pendente, pois talvez faça um login só e coloque a solicitação de férias do gestor na própria página
export default function Inicio(){
    return(
        <MainInicio>
            <img src={Logo} alt='logo'/>
            <SectionInicio>
                <Link to='/loginColaborador'><ButtonSmall size='large'>Colaborador</ButtonSmall></Link>
                <Link to='/loginGestor'><ButtonSmall size='large'>Gestor</ButtonSmall></Link>
            </SectionInicio>
        </MainInicio>
            
    )
}