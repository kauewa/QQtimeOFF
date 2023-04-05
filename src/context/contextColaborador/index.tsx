import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../API/RegrasDeNegocio";
import { Colaborador } from "../intefaces";


//Contexto do colaborador
export const ColaboradorContext = createContext<Colaborador | undefined>(undefined)

//Provider que ficará por volta de todos os componentes da navegação do colaborador
export function ColaboradorProvider ({children}: {children: JSX.Element[]})  {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    //Atualiza o colaborador
    const [colaborador, setColaborador] = useState<Colaborador | undefined>(undefined);
    
    // A cada atualização da página, o useEffect é chamado e atualiza o colaborador
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
    }, [navigate])

    
    return(
        <ColaboradorContext.Provider value={colaborador}>
            {children}
        </ColaboradorContext.Provider>
    )
}




