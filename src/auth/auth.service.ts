import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Colaborador)
        private readonly colaboradorRepository: Repository<Colaborador>,
        private readonly jwtService: JwtService) { }


    async login(credentials: any) {
        try{
            const user = await this.validateUser(credentials.matricula, credentials.senha);
            // Gera um token JWT para o usuário autenticado
            const payload = { matricula: credentials.matricula, nome: user.nome, gestor: user.gestor, email: user.email};
            return {
                access_token: this.jwtService.sign(payload),
            };
        }catch(e){
            console.error(e)
        }
    }

    async validateUser(matricula: string, senha: string) {
        const colaborador = await this.colaboradorRepository.findOne({ where: { matricula: matricula } });
        const senhaCorreta = await bcrypt.compare(senha, colaborador.senha)


        if (colaborador !== null && senhaCorreta) {
            return colaborador;
        }
        return null;
    }

    
    async validateJwt(matricula: string, email: string){
        const colaborador = await this.colaboradorRepository.findOne({where:{matricula: matricula, email: email}})

        if(colaborador !== null){
            return colaborador
        }
        return null
        
    }

}



