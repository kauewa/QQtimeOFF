import axios from 'axios';

class ApiService {
    private static baseURL: string = 'http://localhost:3001';

    static async login(Matricula: string, Senha: string) :Promise<any> {
        try{
            const response = await axios.post(`${this.baseURL}/auth/login`, {matricula: Matricula, senha: Senha });
            console.log(response.data)
        }catch(e){
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