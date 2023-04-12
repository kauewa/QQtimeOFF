import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colaborador } from 'src/colaborador/entities/colaborador.entity';
import { Repository } from 'typeorm';
import { CreateSolicitacoeDto } from './dto/create-solicitacoe.dto';
import { UpdateSolicitacoeDto } from './dto/update-solicitacoe.dto';
import { Solicitacoes } from './entities/solicitacoe.entity';


@Injectable()
export class SolicitacoesService {
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(Solicitacoes)
    private solicitacoesRepository: Repository<Solicitacoes>,

    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,

  ) { }

  ///
  async create(createSolicitacoeDto: CreateSolicitacoeDto, id: string) {
    const colaborador = await this.colaboradorRepository.findOne({ where: { matricula: id }, relations: ['solicitacoes', 'gestor_colaborador'] });
    const gestor = colaborador.gestor_colaborador;

    if (!colaborador) {
      throw new UnauthorizedException('Colaborador não encontrado')
    }

    if (colaborador.saldo_ferias < createSolicitacoeDto.qtd_dias) {
      throw new UnauthorizedException('Saldo de férias insuficiente!');
    }

    if (colaborador.solicitacoes.find((sol) => sol.status === 'pendente') !== undefined) {
      throw new UnauthorizedException('Você ja tem uma solicitação em aberto!');
    }


    const data = colaborador.fim_aquisitivo
    data.setFullYear(data.getFullYear() - 1);
    const jaPossuiferias = colaborador.solicitacoes.find((sol) => sol.status === "aprovado" && sol.data_criacao >= data)
    
    
    
    if (jaPossuiferias === undefined && createSolicitacoeDto.qtd_dias !== 15) {
      throw new UnauthorizedException('Você deve tirar primeiro um periodo de 15 dias de férias!')
    }

    const solicitacoes = new Solicitacoes();
    Object.assign(solicitacoes, createSolicitacoeDto);
    solicitacoes.colaborador = colaborador;

    await this.solicitacoesRepository.save(solicitacoes)



    //Notificação ao gestor
    const dayjs = require('dayjs');
    try {
      this.httpService.axiosRef.post('http://127.0.0.1:8000/notificar', {
        messageWorkplace: `Você tem uma nova solicitação de férias do colaborador ${colaborador.nome} para o dia ${dayjs(solicitacoes.inicio_ferias).format("DD/MM/YYYY")}! `,
        messageEmail: `
      <h2>Você tem uma nova solicitação de férias do colaborador ${colaborador.nome} para o dia ${dayjs(solicitacoes.inicio_ferias).format("DD/MM/YYYY")}!</h2>
    `,
        email: `${gestor.email}`,
        id: 100089372976155
      });
    } catch (err) {
      console.log(err)
    }


    return 'Solicitação concluida';
  }




  async update(id: number, updateSolicitacoeDto: UpdateSolicitacoeDto) {
    const solicitacao = await this.solicitacoesRepository.findOne({ where: { idsolicitacoes: id }, relations: ['colaborador'] })

    if (!solicitacao) {
      return null;
    }

    const colaborador = solicitacao.colaborador;

    ///// verificação
    const dayjs = require('dayjs');


    solicitacao.retorno = updateSolicitacoeDto.retorno;
    solicitacao.status = updateSolicitacoeDto.status;
    
    
    
    if (updateSolicitacoeDto.status === 'aprovado') {
      colaborador.saldo_ferias -= solicitacao.qtd_dias;
      await this.colaboradorRepository.save(colaborador)

      //Marcar no calendario
      try {
        const evento = {
            summary: `Férias de ${colaborador.nome}`,
            startDate: dayjs(solicitacao.inicio_ferias).format('YYYY-MM-DDTHH:mm:ss'),
            endDate: dayjs(solicitacao.fim_ferias).format('YYYY-MM-DDTHH:mm:ss'),
          }
       
  
        await this.httpService.axiosRef.post('http://127.0.0.1:8001/calendar/create-event', evento)
      } catch (e){
        console.log(e)
      }
    }



    await this.solicitacoesRepository.save(solicitacao)


    
    //Notificação ao colaborador
    try {
      await this.httpService.axiosRef.post('http://127.0.0.1:8000/notificar', {
        messageWorkplace: `Sua solicitação de férias para o dia ${dayjs(solicitacao.inicio_ferias).format("DD/MM/YYYY")} foi ${solicitacao.status}! `,
        messageEmail: `
        <p>Sua solicitação de férias para o dia ${dayjs(solicitacao.inicio_ferias).format("DD/MM/YYYY")} foi ${solicitacao.status}!</p> 
        <br/>
        <p>${solicitacao.retorno}<p/>
      `,
        email: `${colaborador.email}`,
        id: 100089372976155
      });
    } catch (err) {
      console.log(err)
    }

    



    return 'Solicitação Respondida'
  }
}
