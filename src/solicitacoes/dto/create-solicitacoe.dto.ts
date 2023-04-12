export class CreateSolicitacoeDto {
    readonly data_criacao: Date;
    readonly inicio_ferias: Date;
    readonly qtd_dias: number;
    readonly fim_ferias: Date;
    readonly decimo_terceiro: boolean;
    readonly comentario: string;
    readonly status: string;
    readonly retorno: string;
}
