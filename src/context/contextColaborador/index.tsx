import { Dayjs } from "dayjs";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../API";
import Solicitacao from "../../pages/gestor/solicitacao";
import { Colaborador } from "../contextGestor";



export interface Solicitacao{
    id: number;
    idSolicitante: string;
    data_criacao: Dayjs;
    inicio_ferias: Dayjs;
    qtd_dias: number;
    fim_ferias: Dayjs;
    decimo_terceiro: boolean;
    comentario: string;
    retorno: string;
    status: string;
}

export const ColaboradorContext = createContext<Colaborador | undefined>(undefined)


export function ColaboradorProvider ({children}: {children: JSX.Element[]})  {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [colaborador, setColaborador] = useState<Colaborador | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined && token !== null) {
            const fetchColaborador = async () => {
                try {
                    const response = await ApiService.getColaborador(id, token);
                    if (response !== undefined) {
                        setColaborador(response)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            fetchColaborador()
        }
    }, [navigate, alert])

    return(
        <ColaboradorContext.Provider value={colaborador}>
            {children}
        </ColaboradorContext.Provider>
    )
}






export const solicitacoes: Solicitacao[] = [];