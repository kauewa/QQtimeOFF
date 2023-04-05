import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../API/RegrasDeNegocio";
import { ColaboradorProvider } from "../contextColaborador";
import { Colaborador, Funcao, Solicitacao } from "../intefaces";


//Contextos
export const ColaboradoresContext = createContext<Colaborador[] | never[]>([])
export const SolicitacoesContext = createContext<Solicitacao[] | never[]>([])
export const FuncoesContext = createContext<Funcao[] | never[]>([])



//Provider que ficará por volta de todos os componentes da navegação do gestor
export function ListaProvider({ children }: { children: JSX.Element[] }) {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  //Atualiza os colaboradores, solicitações e funções
  const [colaboradores, setColaborares] = useState<Colaborador[]>([]);
  const [solicitacoes, setSolicitacoesPendentes] = useState<Solicitacao[]>([])
  const [funcoes, setFuncoes] = useState<Funcao[]>([])

  // A cada atualização da página, o useEffect é chamado e atualiza os colaboradores, solicitações e funções
  useEffect(() => {
    if (id !== undefined && token !== null) {
      const fetchGestor = async () => {
        const response = await ApiService.getGestor(id, token);
        if (response !== undefined) {
          setColaborares(response.colaboradores);
          setSolicitacoesPendentes(response.solicitacoes)
          setFuncoes(response.funcoes)
        }
      }
      fetchGestor()
    }
  }, [navigate])


  return (
    <FuncoesContext.Provider value={funcoes}>
      <ColaboradoresContext.Provider value={colaboradores}>
        <SolicitacoesContext.Provider value={solicitacoes}>

          {/* Colaborador provider é para vizualizar as próprias solicitações de férias do gestor */}
          <ColaboradorProvider>
            {children}
          </ColaboradorProvider>

        </SolicitacoesContext.Provider>
      </ColaboradoresContext.Provider>
    </FuncoesContext.Provider>
  );
}


