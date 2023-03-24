import { Link } from "react-router-dom";
import { HeadTipo, HeadLista, Lista, Item, ItemTipo } from "../../../Components/Divisões/lista";
import { H1 } from "../../../Components/texto";
import { Solicitacao, solicitacoes} from "../../../context/contextColaborador";



//Fazer ainda
export default function Solicitacoes(){
    
    const ListarSolicitações = () => {
        const filtroSolicitações: Solicitacao[] = solicitacoes.filter((sol) => sol.status === "pendente") 
        return(
            <>
                {filtroSolicitações.map(sol => (
                    <Link to={`/gestor/solicitacoes/${sol.id}`}>
                        <Item>
                            <ItemTipo tamanho="20%">
                                <h1>NOME</h1>
                            </ItemTipo>
                            <ItemTipo tamanho="20%">
                                <h1>{sol.inicio_ferias.format('DD/MM/YYYY')}</h1>
                            </ItemTipo>
                            <ItemTipo tamanho="20%">
                                <h1>{sol.qtd_dias}</h1>
                            </ItemTipo>
                            <ItemTipo tamanho="20%">
                                <h1>Disponível</h1>
                            </ItemTipo>
                            <ItemTipo tamanho="20%">
                                <h1>1</h1>
                            </ItemTipo>
                        </Item>
                    </Link>
                ))}
            </>
            
        )
    }
    
    
    
    
    
    
    return(
        <>
            <H1>Solicitações</H1>
            <Lista tamanho="large">
                <HeadLista>
                    <HeadTipo tamanho="20%">
                        <h1>Nome</h1>
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Inicio</h1>
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Quantidade</h1>
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Colaborador relacionado</h1>   
                    </HeadTipo>
                    <HeadTipo tamanho="20%">
                        <h1>Confirmar</h1>
                    </HeadTipo>
                </HeadLista>
                {ListarSolicitações()}
            </Lista>
        </>
        
    )
}