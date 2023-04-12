import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { FuncaoModule } from './funcao/funcao.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { AuthModule } from './auth/auth.module';
import { Colaborador } from './colaborador/entities/colaborador.entity';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Colaborador],
      logging: true,
      schema: 'QQtimeOFF',
      autoLoadEntities: true
    }as TypeOrmModuleOptions),
    FuncaoModule,
    ColaboradorModule,
    SolicitacoesModule,
    AuthModule,
    PassportModule
  ],
})
export class AppModule {}



