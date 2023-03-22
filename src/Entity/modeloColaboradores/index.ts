import dayjs, { Dayjs } from "dayjs";
import { Solicitacao, StatusSolicitacao } from "../modeloSolicitacao";

// Classe colaborador
export interface Colaborador{
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
ferias: Solicitacao | null ;
status: string;
funcao: string;
}

export const setStatus = (colaborador:Colaborador) => {
  if(colaborador.solicitacoes.find(c => c.confirmacao_gestor === StatusSolicitacao.confirmado) && !colaborador.ferias){
    colaborador.status = 'Aceito'
  }else if(colaborador.ferias){
    colaborador.status = 'Ferias'
  }else if(colaborador.saldo_ferias >  0 && dayjs(2, "month").isBefore(colaborador.fim_aquisitivo)){
    colaborador.status = 'Atraso'
  }else{
    colaborador.status = 'Disponivel'
  }
}

//Lista de itens para teste de front-end
export let colaboradores: Colaborador[] = [];

//Adicionar colaborador na lista
export const adicionarColaborador = (colaborador: Colaborador) => {
    colaboradores.push(colaborador);
}

export const esvaziarColaboradores = () => {
  colaboradores = [];
}