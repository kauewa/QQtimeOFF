import requests
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

def enviar_mensagem_workplace_gestor(mensagem:str, id:int):
    url = "https://graph.facebook.com/v4.0/me/messages"
    token=os.getenv('TOKEN_WORKPLACE') 

    headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
    }

    data = {
    "messaging_type": "UPDATE",
    "recipient": {
    "id": id
    },
    "message": {
    "text": mensagem
    }
    }

    try:
        response = requests.post(url, headers=headers, json=data )
        print(response.status_code)
        print(response.text)
    except:
        print("Erro")

