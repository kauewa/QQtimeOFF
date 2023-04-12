import { Delete, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcao } from 'src/funcao/entities/funcao.entity';
import { Solicitacoes } from 'src/solicitacoes/entities/solicitacoe.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateColaboradorDto } from './dto/create-colaborador.dto';
import { UpdateColaboradorDto } from './dto/update-colaborador.dto';
import { Colaborador } from './entities/colaborador.entity';
import { google } from 'googleapis'

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,

    @InjectRepository(Funcao)
    private funcaoRepository: Repository<Funcao>,

    @InjectRepository(Solicitacoes)
    private solicitacoesRepository: Repository<Solicitacoes>
  ) { }


  //Cadastro
  async create(createColaboradorDto: CreateColaboradorDto, id: string): Promise<Colaborador> {
    const colaboradorExiste = await this.colaboradorRepository.findOne({ where: { matricula: createColaboradorDto.matricula } })

    if (colaboradorExiste) {
      throw new UnauthorizedException('Matricula ja existe!')
    }

    const gestor = await this.colaboradorRepository.findOne({ where: { matricula: id } })
    const funcao = await this.funcaoRepository.findOne({ where: { idfuncao: createColaboradorDto.funcao_idfuncao } })


    const colaborador = new Colaborador();
    Object.assign(colaborador, createColaboradorDto);
    colaborador.funcao = funcao;
    colaborador.gestor_colaborador = gestor;

    return this.colaboradorRepository.save(colaborador);
  }


  //Atualização do saldo de ferias
  async verficaPeriodoAquisitivo(colaborador: Colaborador) {

    if (colaborador.fim_aquisitivo <= new Date()) {

      colaborador.saldo_ferias = 30;

      const data = colaborador.fim_aquisitivo
      data.setFullYear(data.getFullYear() + 1);
      colaborador.fim_aquisitivo = data;

      await this.colaboradorRepository.save(colaborador);
    }
  }

  // Retorna o gestor com todas suas relações
  async findAll(id: string): Promise<object> {
    const gestor = await this.colaboradorRepository.findOne({ where: { matricula: id }, relations: ['colaboradores', 'colaboradores.solicitacoes', 'colaboradores.funcao'] });

    gestor.colaboradores.forEach(async (col) => {
      await this.verficaPeriodoAquisitivo(col)
    })

    return gestor
  }


  // Retorna o colaborador com suas solicitações
  findOne(id: string): Promise<Colaborador> {
    return this.colaboradorRepository.findOne({ where: { matricula: id }, relations: ['solicitacoes'] });
  }


  // Atualiza o tipo de colaborador
  async update(id: string, updateColaboradorDto: UpdateColaboradorDto) {
    const colaborador = await this.colaboradorRepository.findOne({ where: { matricula: id } })

    if(updateColaboradorDto.funcao_idfuncao){
      const funcao = await this.funcaoRepository.findOne({ where: { idfuncao: updateColaboradorDto.funcao_idfuncao } })
      colaborador.funcao = funcao;
    }

    colaborador.clt = updateColaboradorDto.clt;
    colaborador.gestor = updateColaboradorDto.gestor;
    


    return this.colaboradorRepository.save(colaborador);
  }



  // Deleta o colaborador e todas as solicitações dele
  async remove(id: string): Promise<DeleteResult> {
    const colaborador = await this.colaboradorRepository.findOne({ where: { matricula: id }, relations: ['solicitacoes', 'colaboradores', 'colaboradores.solicitacoes'] });
    if (colaborador.gestor) {
      try{
        colaborador.colaboradores.forEach(async (col) => {
          col.solicitacoes.forEach(async (sol) => {
            await this.solicitacoesRepository.delete({ idsolicitacoes: sol.idsolicitacoes })
          })
          await this.colaboradorRepository.delete({ matricula: col.matricula })
        })
      }catch{
        console.log('Não tem colaboradores')
      }
    }

    const solicitacoes = colaborador.solicitacoes

    solicitacoes.forEach(async (sol) => {
      await this.solicitacoesRepository.delete({ idsolicitacoes: sol.idsolicitacoes })
    })


    return this.colaboradorRepository.delete({ matricula: id })
  }
}
