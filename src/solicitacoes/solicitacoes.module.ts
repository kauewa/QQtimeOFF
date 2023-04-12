import { Module } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { SolicitacoesController } from './solicitacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitacoes } from './entities/solicitacoe.entity';
import { PassportModule } from '@nestjs/passport';
import { ColaboradorModule } from 'src/colaborador/colaborador.module';
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';
import { HttpModule } from '@nestjs/axios';



@Module({
  imports: [TypeOrmModule.forFeature([Solicitacoes, Colaborador]), PassportModule, ColaboradorModule, HttpModule],
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService]
})
export class SolicitacoesModule {}
