import axios from 'axios';
import dayjs from 'dayjs';
import { adicionarColaborador, Colaborador, colaboradores, setStatus } from '../Entity/modeloColaboradores';

class ApiService {
    private static baseURL: string = 'http://localhost:3001';
    private static instance = axios.create({
        baseURL: this.baseURL,
    })

    static async login(Matricula: string, Senha: string): Promise<any> {
        try {
            const response = await this.instance.post('/auth/login', { matricula: Matricula, senha: Senha });
            console.log(response.data)
            const gestor: boolean = response.data.gestor
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('gestor', gestor.toString())
        } catch (e) {
            console.error(e)
        }
    }

    static async getGestor(matricula: string, token: string) {
        try {
            const response = await this.instance.get(`/colaborador/gestor/${matricula}`, { headers: { Authorization: 'Bearer ' + token } })
            console.log(response.data)
            if (colaboradores.length === 0) {
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
                    setStatus(colaborador);
                    adicionarColaborador(colaborador);
                });
            }
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
    ){
        try {
            await this.instance.post(`/colaborador/${id}`, {
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
            })
        } catch (e) {
            console.error(e)
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