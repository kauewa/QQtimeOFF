import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorModule } from 'src/colaborador/colaborador.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forFeature([Colaborador]) , PassportModule, ColaboradorModule, JwtModule.register({
    privateKey: `${process.env.JWT_SECRET_KEY}`,
    signOptions: {expiresIn: '24h'}
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
