import dayjs, { Dayjs } from "dayjs";

export enum StatusSolicitacao{
    pendente = "pendente",
    confirmado = "confirmado",
    recusado = "recusado"
}

export interface Solicitacao{
    id: number;
    data_solicitacao: Dayjs;
    inicio_ferias: Dayjs;
    qtd_dias: number;
    fim_ferias: Dayjs;
    decimo_terceiro: boolean;
    confirmacao_gestor: StatusSolicitacao;
}

export const solicitacoes: Solicitacao[] = [
    {
      id: 1,
      data_solicitacao: dayjs(),
      inicio_ferias: dayjs().add(1, 'month'),
      qtd_dias: 10,
      fim_ferias: dayjs().add(1, 'month').add(10, 'day'),
      decimo_terceiro: true,
      confirmacao_gestor: StatusSolicitacao.confirmado,
    },
    {
      id: 2,
      data_solicitacao: dayjs(),
      inicio_ferias: dayjs().add(2, 'month'),
      qtd_dias: 15,
      fim_ferias: dayjs().add(2, 'month').add(15, 'day'),
      decimo_terceiro: true,
      confirmacao_gestor: StatusSolicitacao.pendente,
    },
    {
      id: 3,
      data_solicitacao: dayjs(),
      inicio_ferias: dayjs().add(3, 'month'),
      qtd_dias: 20,
      fim_ferias: dayjs().add(3, 'month').add(20, 'day'),
      decimo_terceiro: false,
      confirmacao_gestor: StatusSolicitacao.recusado,
    },
    {
      id: 4,
      data_solicitacao: dayjs(),
      inicio_ferias: dayjs().add(4, 'month'),
      qtd_dias: 25,
      fim_ferias: dayjs().add(4, 'month').add(25, 'day'),
      decimo_terceiro: false,
      confirmacao_gestor: StatusSolicitacao.confirmado,
    },
    {
      id: 5,
      data_solicitacao: dayjs(),
      inicio_ferias: dayjs().add(5, 'month'),
      qtd_dias: 30,
      fim_ferias: dayjs().add(5, 'month').add(30, 'day'),
      decimo_terceiro: true,
      confirmacao_gestor: StatusSolicitacao.pendente,
    },
  ];