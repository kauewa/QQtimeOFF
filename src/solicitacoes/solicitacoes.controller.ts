import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { CreateSolicitacoeDto } from './dto/create-solicitacoe.dto';
import { UpdateSolicitacoeDto } from './dto/update-solicitacoe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('solicitacoes')
@UseGuards(AuthGuard('jwt'))
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) {}

  @Post(':id')
  create(@Body() createSolicitacoeDto: CreateSolicitacoeDto, @Param('id') id: string) {
    return this.solicitacoesService.create(createSolicitacoeDto, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitacoeDto: UpdateSolicitacoeDto) {
    return this.solicitacoesService.update(+id, updateSolicitacoeDto);
  }

}
