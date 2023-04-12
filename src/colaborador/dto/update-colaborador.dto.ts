import { PartialType } from '@nestjs/mapped-types';
import { CreateColaboradorDto } from './create-colaborador.dto';

export class UpdateColaboradorDto extends PartialType(CreateColaboradorDto) {
    readonly gestor: boolean;
    readonly clt: boolean;
    readonly funcao_idfuncao: number;
}
