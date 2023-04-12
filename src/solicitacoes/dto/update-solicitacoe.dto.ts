import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitacoeDto } from './create-solicitacoe.dto';

export class UpdateSolicitacoeDto extends PartialType(CreateSolicitacoeDto) {
    readonly retorno: string;
    readonly status: string;
}
