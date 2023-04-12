import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ColaboradorService } from './colaborador.service';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';



@Controller('colaborador')
@UseGuards(AuthGuard('jwt'))
export class ColaboradorController {
  constructor(
    private readonly colaboradorService: ColaboradorService,
    ) {}
    

  @Post(':id')
  create(@Body() createColaboradorDto: CreateColaboradorDto, @Param('id') id: string) {
    return this.colaboradorService.create(createColaboradorDto, id);
  }

  @Get('gestor/:id')
  findAll(@Param('id') id: string) {
    return this.colaboradorService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colaboradorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColaboradorDto: UpdateColaboradorDto) {
    return this.colaboradorService.update(id, updateColaboradorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colaboradorService.remove(id);
  }
}
