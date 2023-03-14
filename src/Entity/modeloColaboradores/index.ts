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

const colaborador1: Colaborador = {
  id: '1',
  nome: 'João Silva',
  cpf: '123.456.789-00',
  email: 'joao.silva@example.com',
  inicio_contratacao: dayjs('2022-01-01'),
  fim_aquisitivo: dayjs('2024-01-01'),
  gestor: false,
  clt: true,
  saldo_ferias: 30,
  senha: 'senha123',
  solicitacoes: [],
  ferias: null,
  status: 'Aceito',
  funcao: 'programador'
};

const colaborador2: Colaborador = {
  id: '2',
  nome: 'Maria Souza',
  cpf: '987.654.321-00',
  email: 'maria.souza@example.com',
  inicio_contratacao: dayjs('2022-03-15'),
  fim_aquisitivo: dayjs('2023-03-15'),
  gestor: false,
  clt: true,
  saldo_ferias: 0,
  senha: 'senha456',
  solicitacoes: [],
  ferias: null,
  status: 'Atraso',
  funcao: 'analista'
};

const colaborador3: Colaborador = {
  id: '3',
  nome: 'Pedro Santos',
  cpf: '111.222.333-44',
  email: 'pedro.santos@example.com',
  inicio_contratacao: dayjs('2022-05-01'),
  fim_aquisitivo: dayjs('2023-05-01'),
  gestor: false,
  clt: true,
  saldo_ferias: 0,
  senha: 'senha789',
  solicitacoes: [],
  ferias: null,
  status: 'Ferias',
  funcao: 'designer'
};

const colaborador4: Colaborador = {
  id: '4',
  nome: 'Ana Oliveira',
  cpf: '555.666.777-88',
  email: 'ana.oliveira@example.com',
  inicio_contratacao: dayjs('2022-09-01'),
  fim_aquisitivo: dayjs('2023-09-01'),
  gestor: false,
  clt: true,
  saldo_ferias: 0,
  senha: 'senhaabc',
  solicitacoes: [],
  ferias: null,
  status: 'Disponivel',
  funcao: 'dev'
};

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
export const colaboradores: Colaborador[] = [colaborador1, colaborador2, colaborador3, colaborador4];

//Adicionar colaborador na lista
export const adicionarColaborador = (colaborador: Colaborador) => {
    colaboradores.push(colaborador);
  };
