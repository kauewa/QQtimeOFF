import { HeadItem, HeadLista, Lista } from "../../../Components/Divisões/lista";
import { H1 } from "../../../Components/texto/textos";


//Fazer ainda
export default function Solicitacoes(){
    return(
        <>
            <H1>Solicitações</H1>
            <Lista tamaho="large">
                <HeadLista>
                    <HeadItem>
                        <h1>Nome</h1>
                    </HeadItem>
                    <HeadItem>
                        <h1>Inicio</h1>
                    </HeadItem>
                    <HeadItem>
                        <h1>Quantidade</h1>
                    </HeadItem>
                    <HeadItem>
                        <h1>Colaborador relacionado</h1>   
                    </HeadItem>
                    <HeadItem>
                        <h1>Confirmar</h1>
                    </HeadItem>
                </HeadLista>

            </Lista>
        </>
        
    )
}