import dayjs, { Dayjs } from "dayjs";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../API";
import { Solicitacao } from "../contextColaborador";

export interface Funcao {
  idfuncao: number;
  nome_funcao: string
}

// Classe colaborador
export interface Colaborador {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  inicio_contratacao: Dayjs;
  fim_aquisitivo: Dayjs;
  gestor: boolean;
  clt: boolean;
  saldo_ferias: number;
  senha: string;
  solicitacoes: Solicitacao[];
  ferias: Solicitacao | null;
  status: string;
  funcao: Funcao;
}

export const setStatus = (colaborador: Colaborador) => {
  if (colaborador.solicitacoes.find(c => c.status === "aprovado") && !colaborador.ferias) {
    colaborador.status = 'Aceito'
  } else if (colaborador.ferias) {
    colaborador.status = 'Ferias'
  } else if (colaborador.saldo_ferias > 0 && dayjs(2, "month").isBefore(colaborador.fim_aquisitivo)) {
    colaborador.status = 'Atraso'
  } else {
    colaborador.status = 'Disponivel'
  }
}


export const ColaboradoresContext = createContext<Colaborador[] | never[]>([])
export const SolicitacoesPendentesContext = createContext<Solicitacao[] | never[]>([])
export const FuncoesContext = createContext<Funcao[] | never[]>([])



export function ListaProvider({ children }: { children: JSX.Element[] }) {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [colaboradores, setColaborares] = useState<Colaborador[]>([]);
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState<Solicitacao[]>([])
  const [funcoes, setFuncoes] = useState<Funcao[]>([])
  const navigate = useNavigate()


  useEffect(() => {
    if (id !== undefined && token !== null) {
      const fetchGestor = async () => {
        const response = await ApiService.getGestor(id, token);
        if (response !== undefined) {
          setColaborares(response.colaboradores);
          setSolicitacoesPendentes(response.solicitacoesPendentes)
          setFuncoes(response.funcoes)
        }
      }
      fetchGestor()
    }
  }, [navigate])

  return (
    <FuncoesContext.Provider value={funcoes}>
      <ColaboradoresContext.Provider value={colaboradores}>
        <SolicitacoesPendentesContext.Provider value={solicitacoesPendentes}>
          {children}
        </SolicitacoesPendentesContext.Provider>
      </ColaboradoresContext.Provider>
    </FuncoesContext.Provider>
  );
}


