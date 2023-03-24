import axios from 'axios';
import dayjs from 'dayjs';
import { Solicitacao } from '../context/contextColaborador';
import { Colaborador, setStatus } from '../context/contextGestor';

class ApiService {
    private static baseURL: string = 'http://localhost:3001';
    private static instance = axios.create({
        baseURL: this.baseURL,
    })

    //LOGIN
    static async login(Matricula: string, Senha: string): Promise<any> {
        try {
            const response = await this.instance.post('/auth/login', { matricula: Matricula, senha: Senha });
            console.log(response.data)
            const gestor: boolean = response.data.gestor
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('gestor', gestor.toString())
            return { token: response.data.access_token, gestor };
        } catch (e) {
            console.error(e)
            throw new Error('Não foi possível fazer o login.')
        }
    }


    ///////////////////////////////////////////////////Métodos Gestor
    static async getGestor(matricula: string, token: string): Promise<Colaborador[] | undefined> {
        try {
            const response = await this.instance.get(`/colaborador/gestor/${matricula}`, { headers: { Authorization: 'Bearer ' + token } })
            console.log(response.data)
            const colaboradores: Colaborador[] = []
            response.data.colaboradores.forEach((colab: any) => {

                const colaborador: Colaborador = {
                    id: colab.matricula,
                    nome: colab.nome,
                    cpf: colab.cpf,
                    email: colab.email,
                    inicio_contratacao: dayjs(colab.inicio_contratacao),
                    fim_aquisitivo: dayjs(colab.fim_aquisitivo),
                    gestor: colab.gestor,
                    clt: colab.clt,
                    saldo_ferias: colab.saldo_ferias,
                    senha: colab.senha,
                    status: '',
                    funcao: colab.funcao,
                    solicitacoes: [],
                    ferias: null
                }
                // colab.solicitacoes.forEach((sol: any) => {
                //     const solicitacao: Solicitacao = {
                //         id: sol.idSolicitacoes,
                //         colaborador_matri
                //     }
                // })
                setStatus(colaborador);
                colaboradores.push(colaborador)
            });
            return colaboradores

        } catch (e) {
            console.error(e)
        }
    }

    static async criarColaborador(
        id: string,
        matricula: string,
        nome: string,
        cpf: string,
        email: string,
        inicio_contratacao: string,
        fim_aquisitivo: string,
        gestor: boolean,
        clt: boolean,
        saldo_ferias: number,
        senha: string,
        token: string
    ) {

        try {
            const objeto = {
                matricula: matricula,
                nome: nome,
                cpf: cpf,
                email: email,
                inicio_contratacao: inicio_contratacao,
                fim_aquisitivo: fim_aquisitivo,
                gestor: gestor,
                clt: clt,
                saldo_ferias: saldo_ferias,
                senha: senha,
                funcao_idfuncao: 1
            }
            console.log(objeto)
            const response = await this.instance.post(`/colaborador/${id}`, objeto, { headers: { Authorization: 'Bearer ' + token } })
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////





















    ///////////////////////////////////////////////// Métodos colaborador
    static async criarSolicitacao(
        matricula: string,
        data_criacao: string,
        inicio_ferias: string,
        qtd_dias: number,
        fim_ferias: string,
        decimo_terceiro: boolean,
        comentario: string,
        status: string,
        retorno: string,
        token: string
    ) {

        try {
            const objeto = {
                data_criacao: data_criacao,
                inicio_ferias: inicio_ferias,
                qtd_dias: qtd_dias,
                fim_ferias: fim_ferias,
                decimo_terceiro: decimo_terceiro,
                comentario: comentario,
                status: status,
                retorno: retorno,
            }
            const response = await this.instance.post(`/solicitacoes/${matricula}`, objeto, { headers: { Authorization: 'Bearer ' + token } })
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }

    }

    static async getColaborador(matricula: string, token: string): Promise<Colaborador | undefined> {
        try {
            const response = await this.instance.get(`/colaborador/${matricula}`, { headers: { Authorization: 'Bearer ' + token } })
            const solicitacoes: Solicitacao[] = [];
            const colab = response.data;

            response.data.solicitacoes.forEach((sol: any) => {
                const solicitacao: Solicitacao = {
                    id: sol.idsolicitacoes,
                    idSolicitante: matricula,
                    data_criacao: dayjs(sol.data_criacao),
                    inicio_ferias: dayjs(sol.inicio_ferias),
                    qtd_dias: sol.qtd_dias,
                    fim_ferias: dayjs(sol.fim_ferias),
                    decimo_terceiro: sol.decimo_terceiro,
                    comentario: sol.comentario,
                    retorno: sol.retorno,
                    status: sol.status
                }
                solicitacoes.push(solicitacao)
            })

            const colaborador:Colaborador = {
                id: colab.matricula,
                nome: colab.nome,
                cpf: colab.cpf,
                email: colab.email,
                inicio_contratacao: dayjs(colab.inicio_contratacao),
                fim_aquisitivo: dayjs(colab.fim_aquisitivo),
                gestor: colab.gestor,
                clt: colab.clt,
                saldo_ferias: colab.saldo_ferias,
                senha: colab.senha,
                status: '',
                funcao: '',
                solicitacoes: solicitacoes,
                ferias: null
            }
            if(colaborador){
                return colaborador;
            }else{
                console.log('dados errados')
            }

            

        }catch(e){
            console.error('error')
        }
    }






    //////////////////////////////////////////////////////////////////////////////////////
    // private static async get<T>(url: string): Promise<T> {
    //     const response: AxiosResponse<T> = await axios.get<T>(this.baseURL + url);
    //     return response.data;
    // }

    // private static async post<T>(url: string, data: any): Promise<T> {
    //     const response: AxiosResponse<T> = await axios.post<T>(this.baseURL + url, data);
    //     return response.data;
    // }

    // private static async put<T>(url: string, data: any): Promise<T> {
    //     const response: AxiosResponse<T> = await axios.put<T>(this.baseURL + url, data);
    //     return response.data;
    // }

    // private static async delete<T>(url: string): Promise<T> {
    //     const response: AxiosResponse<T> = await axios.delete<T>(this.baseURL + url);
    //     return response.data;
    // }
}


export default ApiService;