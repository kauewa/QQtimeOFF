import axios, { AxiosResponse } from 'axios';

// class ApiService {
//     private static baseURL: string = 'localhost:3001';

//     static async login(matricula: string, senha: string):Promise<void> {
//         return this.post('/auth/login', { matricula, senha })
//     }





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
// }


// export default ApiService;