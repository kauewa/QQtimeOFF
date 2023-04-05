import openai
import os
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

openai.api_key = os.getenv("OPENAI_API_KEY")

def relatorio(objeto_de_dados: any):
    model_engine = "text-davinci-002"
    prompt = "Gerar relatório sobre: {}".format(objeto_de_dados)

    try:
        # Gerando o relatório
        response = openai.Completion.create(
            engine=model_engine,
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.7,
        )

        # Salvar o relatório em um arquivo txt
        with open(os.path.join(os.getcwd(), "relatorio.txt"), "w") as f:
            f.write(response.choices[0].text)

    except openai.error.RateLimitError as error:
        print(error)


objeto=[{'id': '543210', 'nome': 'teste', 'cpf': '***', 'email': 'wandscherkaue@gmail.com', 'inicio_contratacao': '2023-03-30T03:00:00.000Z', 'fim_aquisitivo': '2024-03-30T03:00:00.000Z', 'gestor': False, 'clt': True, 'saldo_ferias': 0, 'senha': '123', 'status': 'Aceito', 'funcao': {'idfuncao': 1, 'nome_funcao': 'Estagiário'}, 'solicitacoes': [{'id': 1, 'idSolicitante': '543210', 'data_criacao': '2023-03-23T03:00:00.000Z', 'inicio_ferias': '2023-04-10T03:00:00.000Z', 'qtd_dias': 20, 'fim_ferias': '2023-04-29T03:00:00.000Z', 'decimo_terceiro': True, 'comentario': 'Vou viajar para a praia', 'retorno': '', 'status': 'aprovado'}, {'id': 2, 'idSolicitante': '543210', 'data_criacao': '2023-03-24T03:00:00.000Z', 'inicio_ferias': '2023-03-31T03:00:00.000Z', 'qtd_dias': 10, 'fim_ferias': '2023-04-10T03:00:00.000Z', 'decimo_terceiro': False, 'comentario': '', 'retorno': '', 'status': 'reprovado'}, {'id': 6, 'idSolicitante': '543210', 'data_criacao': '2023-03-29T03:00:00.000Z', 'inicio_ferias': '2023-03-31T03:00:00.000Z', 'qtd_dias': 15, 'fim_ferias': '2023-04-15T03:00:00.000Z', 'decimo_terceiro': False, 'comentario': '', 'retorno': '', 'status': 'reprovado'}], 'ferias': None}]

relatorio(objeto)










