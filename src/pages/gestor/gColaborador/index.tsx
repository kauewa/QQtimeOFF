import { useParams } from 'react-router-dom';
import { PerfilFoto } from '../../../Components/Divisões/SectionLateral';
import { H1 } from '../../../Components/texto/textos';
import { colaboradores } from '../modeloColaboradores';
import { Head, MainPerfil } from './styles';


//Alinhamentos específicos



// Página do perfil de colaborador
export default function GestorColaborador(){
    const {id} = useParams<{id: string}>();
    const colaborador = colaboradores.find((colab) => colab.id === Number(id));

    if (!colaborador) {
        return <p>Colaborador não encontrado</p>;
    }

    return (
        <>
            <Head>
                <PerfilFoto tamanho=''/>
                <H1>{colaborador.nome}</H1>
            </Head>
            <MainPerfil>
                
            </MainPerfil>
        </>
        
    )
}
