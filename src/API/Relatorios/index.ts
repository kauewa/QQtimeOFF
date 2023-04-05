import axios from "axios";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { Colaborador } from "../../context/intefaces";

class ApiRelatorios {

    //BaseURL
    private static baseURL: string = 'http://127.0.0.1:8000';
    private static instance = axios.create({
        baseURL: this.baseURL,
    })

    //Relatórios
    static async relatorioGeral(colaborador: Colaborador[], email: string) {
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
            if (solicitacao !== undefined) {
                objeto.inicio_das_ferias.push(solicitacao.inicio_ferias.format('DD/MM/YYYY'))
            } else {
                objeto.inicio_das_ferias.push('')
            }
        })

        await this.mandarRelatorio(objeto, email, 'Geral');

    }

    static async relatorioFerias(colaboradoradores: Colaborador[], email: string) {
        const objeto = {
            Colaboradoradores: [''],
            Matricula: [''],
            Inicio_Férias: [''],
            Fim_Férias: [''],
        }
        const ferias = colaboradoradores.filter((colab) => colab.ferias !== null);
        ferias.forEach((colab) => {
            if (colab.ferias !== null) {
                objeto.Colaboradoradores.push(colab.nome);
                objeto.Matricula.push(colab.id);
                objeto.Inicio_Férias.push(colab.ferias.inicio_ferias.format("DD/MM/YYYY"))
                objeto.Fim_Férias.push(colab.ferias.fim_ferias.format("DD/MM/YYYY"));
            }
        })
        await this.mandarRelatorio(objeto, email, 'Férias concedidas')
    }

    static async relatorioAtrasos(colaboradoradores: Colaborador[], email:string){
        const objeto = {
            Colaboradoradores: [''],
            Matricula: [''],
            Saldo_Férias: [''],
            Fim_Período_Aquisitivo: ['']
        }

        const atrasos = colaboradoradores.filter((colab) => colab.status === "Atraso")
        atrasos.forEach((colab) => {
            objeto.Colaboradoradores.push(colab.nome);
            objeto.Matricula.push(colab.id);
            objeto.Saldo_Férias.push(colab.saldo_ferias.toString());
            objeto.Fim_Período_Aquisitivo.push(colab.fim_aquisitivo.format("DD/MM/YYYY"))
        })
        await this.mandarRelatorio(objeto, email, "Férias atrasadas")

    }

    // static async relatorioChat(colaboradores: Colaborador[]) {
    //     try {
    //         const colaborador = colaboradores.filter((colab) => colab.status === 'Aceito')
    //         const objeto = {
    //             lista: colaborador
    //         }
    //         await this.instance.post('/chat', objeto)
    //     }catch(e){
    //         console.error(e)
    //     }
    // }



    //Chamada da API
    static async mandarRelatorio(objeto: any, email: string, tipo: string) {
        try {
            const resposta = {
                colaboradores: objeto,
                email: email,
                tipo: tipo
            }
            console.log(resposta)
            await this.instance.post('/relatorio', resposta,)
            enqueueSnackbar(`Relatório enviado para ${email}`, {variant: "success"})
        } catch (e:any) {
            enqueueSnackbar(e.response.data.message, {variant: "error"})
        }
    }


}

export default ApiRelatorios;