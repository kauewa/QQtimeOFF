import dayjs, { Dayjs } from "dayjs";

export interface Funcao {
  idfuncao: number;
  nome_funcao: string
}

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

export interface Solicitacao {
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


//Status para melhor vizualização da situacao do colaborador
export const setStatus = (colaborador: Colaborador) => {
  if (colaborador.ferias) {
    colaborador.status = 'Ferias'
  } else if (colaborador.solicitacoes.find(c => c.status === "aprovado" && c.inicio_ferias.isAfter(dayjs())) ) {
    colaborador.status = 'Aceito'
  } else if (colaborador.saldo_ferias > 0 && dayjs().isBetween(colaborador.fim_aquisitivo.subtract(2, 'month'), colaborador.fim_aquisitivo)) {
    colaborador.status = 'Atraso'
  } else {
    colaborador.status = 'Disponivel'
  }
}
