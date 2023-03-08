// Classe colaborador
export interface Colaborador{
id: number;
nome: string;
funcao: string;
status: string;  
}

//Lista de itens para teste de front-end
export const colaboradores: Colaborador[] = [];

//Adicionar colaborador na lista
export const adicionarColaborador = (colaborador: Colaborador) => {
    colaboradores.push(colaborador);
  };
