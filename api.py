from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from emailService import envia_email_gestor
from workplace import enviar_mensagem_workplace_gestor
from relatorios import enviar_relatorio

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=origins,
    allow_headers=origins,
)


class Dto(BaseModel):
    messageWorkplace: str
    messageEmail: str
    email: str
    id: int

@app.post("/notificar")
async def send_notificacao(Dto: Dto):
    print(Dto)
    try:
        envia_email_gestor(Dto.messageEmail, Dto.email)                            ## Serviço de email
        print('Email enviado')
        enviar_mensagem_workplace_gestor(Dto.messageWorkplace, Dto.id)               ## Serviço de notificação do Workplace
        print('Mensagem enviada')
        return {"message": "Usuário notificado com sucesso"}
    except:
        return {"message": "Erro ao enviar email"}




class Relatorio (BaseModel):
    colaboradores: object
    email: str
    tipo: str

@app.post("/relatorio")
async def send_relatorio(colaboradores: Relatorio):
    print(colaboradores)
    try:
        enviar_relatorio(colaboradores.colaboradores, colaboradores.email, colaboradores.tipo)
        return 'Relatório enviado'
    except:
        return 'Erro'
    









class Obj (BaseModel):
    lista: list
    

# @app.post("/chat")
# async def teste_chat(colaboradores: Obj):
#     print('entrou')
#     try:
#         await relatorio(colaboradores.lista)
#         return 'Chat relatório'
#     except:
#         print('erro')
#         return 'erro'



# python -m uvicorn api:app --reload
