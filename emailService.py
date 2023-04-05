import smtplib
import email.message
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())



def envia_email_gestor(mensagem, email_to):
    mensagem_email = """<h1>Notificação QQTimeOFF</h1><br/>
    {}""".format(mensagem)

    msg = email.message.Message()

    msg['Subject'] = 'Solicitação'
    msg['From'] = 'wandscherkaue@gmail.com'
    msg['To'] = email_to
    password = os.getenv('PASSWORD_EMAIL') 

    msg.add_header("Content-Type", "text/html")
    msg.set_payload(mensagem_email)


    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    s.login(msg['From'], password)

    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('Email enviado')
