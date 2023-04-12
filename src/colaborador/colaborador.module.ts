import { Module } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { ColaboradorController } from './colaborador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { PassportModule } from '@nestjs/passport';
import { Funcao } from 'src/funcao/entities/funcao.entity';
import { Solicitacoes } from 'src/solicitacoes/entities/solicitacoe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborador, Funcao, Solicitacoes]), PassportModule],
  controllers: [ColaboradorController],
  providers: [ColaboradorService],
  exports:[ColaboradorService]
})
export class ColaboradorModule {}
