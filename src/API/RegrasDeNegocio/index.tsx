import axios from 'axios';
import dayjs from 'dayjs';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { Colaborador, Funcao, setStatus, Solicitacao } from '../../context/intefaces';

class ApiService {

    //BASE URL
    private static baseURL: string = 'http://localhost:3001';
    private static instance = axios.create({
        baseURL: this.baseURL,
    })


    //LOGIN
    static async login(Matricula: string, Senha: string) {
        try {
            const response = await this.instance.post('/auth/login', { matricula: Matricula, senha: Senha });
            localStorage.setItem('token', response.data.access_token)
            if (response.data.access_token !== undefined) {
                return response.data.access_token;
            }
            enqueueSnackbar("Matrícula ou senha incorretos!", { variant: "error" })

        } catch (e) {
            console.error(e);
        }
    }


    //Métodos para capturar gestor
    static async getGestor(matricula: string, token: string): Promise<any> {
        try {
            //Captura o gestor
            const response = await this.instance.get(`/colaborador/gestor/${matricula}`, { headers: { Authorization: 'Bearer ' + token } })
            const dados = response.data.colaboradores;


            //Listas para armazenar os objetos
            const colaboradores: Colaborador[] = []
            const solicitacoesLista: Solicitacao[] = []
            const funcoes: Funcao[] = []


            //Preenche as listas
            dados.forEach((colab: any) => {
                const solicitacoes: Solicitacao[] = []
                let ferias: Solicitacao | null = null;

                const funcao: Funcao = {
                    idfuncao: colab.funcao.idfuncao,
                    nome_funcao: colab.funcao.nome_funcao
                }
                if (!funcoes.find((func) => func.idfuncao === funcao.idfuncao)) {
                    funcoes.push(funcao);
                }


                colab.solicitacoes.forEach((sol: any) => {
                    const solicitacao: Solicitacao = {
                        id: sol.idsolicitacoes,
                        idSolicitante: colab.matricula,
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
                    solicitacoesLista.push(solicitacao)

                    //Verifica se o colaborador está de férias
                    if (solicitacao.status === "aprovado" && dayjs().isBetween(solicitacao.inicio_ferias, solicitacao.fim_ferias)) {
                        ferias = solicitacao;
                    }

                })

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
                    funcao: funcao,
                    solicitacoes: solicitacoes,
                    ferias: ferias
                }
                setStatus(colaborador);
                colaboradores.push(colaborador)
            });
            const objeto = {
                colaboradores: colaboradores,
                solicitacoes: solicitacoesLista,
                funcoes: funcoes
            }

            return objeto

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
        funcao: number,
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
                funcao_idfuncao: funcao
            }

            //Cria o colaborador
            await this.instance.post(`/colaborador/${id}`, objeto, { headers: { Authorization: 'Bearer ' + token } })
            enqueueSnackbar('Cadastro concluído', { variant: "success" })
        
        } catch (e: any) {
            enqueueSnackbar(e.response.data.message, { variant: "error" })
        }
    }



    static async respostaSolicitacao(idsolicitacao: number, retorno: string, status: string, token: string) {
        try {
            await this.instance.patch(`/solicitacoes/${idsolicitacao}`, { retorno: retorno, status: status }, { headers: { Authorization: 'Bearer ' + token } })
            enqueueSnackbar("Resposta enviada!", { variant: 'success' })
        } catch (e: any) {
            enqueueSnackbar(e.response.data.message, { variant: "error" })
        }
    }




    static async deletarColaborador(matriculaColaborador: string, token: string) {
        try {
            await this.instance.delete(`/colaborador/${matriculaColaborador}`, { headers: { Authorization: 'Bearer ' + token } })
            enqueueSnackbar("Colaborador excluído!", { variant: "success" })
        } catch (e: any) {
            enqueueSnackbar(e.response.data.message, { variant: 'error' })
        }
    }


    static async atualizarColaborador(matricula: string, token: string, gestor: boolean, clt: boolean, funcao:number) {
        try{
            await this.instance.patch(`/colaborador/${matricula}`, {gestor: gestor, clt: clt, funcao_idfuncao: funcao}, { headers: { Authorization: 'Bearer ' + token } })
            enqueueSnackbar("Colaborador atualizado!", { variant: "success" })
        }catch(e: any){
            enqueueSnackbar(e.response.data.message, { variant: "error" })
        }
        
    }
//////////////////////////////////////////////////////////////////////////////////////////




    // Métodos colaborador
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

            //Cria a solicitação
            await this.instance.post(`/solicitacoes/${matricula}`, objeto, { headers: { Authorization: 'Bearer ' + token } })
            enqueueSnackbar("Solicitação enviada!", { variant: "success" })
        } catch (e: any) {
            enqueueSnackbar(e.response.data.message, { variant: "error" })
        }

    }


    static async getColaborador(matricula: string, token: string): Promise<Colaborador | undefined> {
        try {
            //Pega o colaborador
            const response = await this.instance.get(`/colaborador/${matricula}`, { headers: { Authorization: 'Bearer ' + token } })
            
            //lista de solicitações
            const solicitacoes: Solicitacao[] = [];
            const colab = response.data;
            const funcao: Funcao = {
                idfuncao: 1,
                nome_funcao: 'gestor'
            }

            //preeche a lista de solicitações
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
            console.log(solicitacoes)

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
                funcao: funcao,
                solicitacoes: solicitacoes,
                ferias: null
            }

            setStatus(colaborador);
            return colaborador;
        } catch (e) {
            console.error('error')
        }
    }



    /////////////////////////////////////////////////////// Método Função

    static async cadastrarFuncao(nome_funcao: string) {
        try {
            const response = await this.instance.post('/funcao', { nome_funcao: nome_funcao })
            console.log(response.data)
            console.log(response.data.idfuncao)
            return response.data.idfuncao
        } catch (e: any) {
            return e.response.data.message;
        }
    }



}


export default ApiService;