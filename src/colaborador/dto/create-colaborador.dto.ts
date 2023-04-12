import { Colaborador } from "../entities/colaborador.entity";

export class CreateColaboradorDto {
    readonly matricula: string;
    readonly nome: string;
    readonly cpf: string;
    readonly email: string;
    readonly inicio_contratacao: Date;
    readonly fim_aquisitivo: Date;
    readonly gestor: boolean;
    readonly clt: boolean;
    readonly saldo_ferias: number;
    readonly senha: string;
    readonly funcao_idfuncao: number;
}
