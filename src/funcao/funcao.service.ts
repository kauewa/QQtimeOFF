import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import { Funcao } from './entities/funcao.entity';

@Injectable()
export class FuncaoService {
  constructor(
    @InjectRepository(Funcao)
    private funcaoRepository: Repository<Funcao>,
  ){}

  async create(createFuncaoDto: CreateFuncaoDto): Promise<Funcao> {
    
    if(createFuncaoDto.nome_funcao === ''){
      throw new UnauthorizedException('Você precisa definir uma função!')
    }


    const funcaoExistente = await this.funcaoRepository.findOne({where: {nome_funcao: createFuncaoDto.nome_funcao}})

    if(!funcaoExistente){
      const funcao = new Funcao();
      funcao.nome_funcao = createFuncaoDto.nome_funcao;
   
      return this.funcaoRepository.save(funcao);

    }
    
    return funcaoExistente
  }
}
