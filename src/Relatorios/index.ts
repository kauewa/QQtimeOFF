import axios from "axios";
import dayjs from "dayjs";
import { Colaborador } from "../context/contextGestor";

class ApiRelatorios {
    private static baseURL: string = 'http://127.0.0.1:8000';
    private static instance = axios.create({
        baseURL: this.baseURL,
    })

    static async relatorioGeral(colaborador:Colaborador[], email:string){
        try{
            const objeto = {
                colaboradoradores: [''],
                matricula: [''], 
                funcao: [''],
                status: [''],
                inicio_das_ferias: ['']
            }
            colaborador.forEach((col) => {
                objeto.colaboradoradores.push(col.nome)
                objeto.matricula.push(col.id)
                objeto.funcao.push(col.funcao.nome_funcao)
                objeto.status.push(col.status)
                const solicitacao = col.solicitacoes.find((sol) => sol.status === "aprovado" && sol.fim_ferias.isAfter(dayjs()))
                if(solicitacao !== undefined){
                    objeto.inicio_das_ferias.push(solicitacao.inicio_ferias.format('DD/MM/YYYY'))
                }else{
                    objeto.inicio_das_ferias.push('')
                }
            })

            const resposta = {
                colaboradores: objeto,
                email: email,
                tipo: 'geral'
            }

            console.log(resposta)
            await this.instance.post('/relatorio', resposta, )
        }catch(e){
            console.error(e)
        }
    } 

    // static async relatorioFerias(colaboradoradores: Colaborador[], email:string){

    // }

    
}

export default ApiRelatorios;