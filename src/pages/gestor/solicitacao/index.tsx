import { H1 } from "../../../Components/texto/textos";
import { HeadItem, HeadLista, ListaSolicitações } from "./styles";

//Fazer ainda
export default function Solicitacoes(){
    return(
        <>
            <H1>Solicitações</H1>
            <ListaSolicitações>
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

            </ListaSolicitações>
        </>
        
    )
}