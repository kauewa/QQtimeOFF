import { Dayjs } from "dayjs";

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