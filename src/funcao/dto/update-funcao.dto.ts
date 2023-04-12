import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncaoDto } from './create-funcao.dto';

export class UpdateFuncaoDto extends PartialType(CreateFuncaoDto) {}
