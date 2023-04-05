import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import pandas as pd
import io
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


def enviar_relatorio(colaboradores, email, tipo):
     # Gerar o arquivo CSV com os dados dos colaboradores na memória
    df = pd.DataFrame(data=colaboradores)
    csv_stream = io.StringIO()
    df.to_csv(csv_stream, index=False, encoding='utf-8')

    # Configurar o email
    sender_email = 'wandscherkaue@gmail.com'
    sender_password = os.getenv('PASSWORD_EMAIL') 
    recipient_email = email
    subject = 'Relatório Geral QQtimeOFF'

    # Criar a mensagem do email com anexo
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = subject
    

    # Adicionar o corpo da mensagem
    body = 'Em anexo se encontra o relatório {} dos colaboradores da QQtimeOFF.'.format(tipo)
    message.attach(MIMEText(body, "plain"))

    # Adicionar o arquivo CSV como anexo 
    attached_part = MIMEApplication(csv_stream.getvalue(), Name='Relatório_geral_QQtimeOFF.csv')
    attached_part['Content-Disposition'] = f'attachment; filename="Relatório_geral_QQtimeOFF.csv"'
    message.attach(attached_part)

    try:
        # Conectar ao Gmail e enviar o email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        text = message.as_string()
        server.sendmail(sender_email, recipient_email, text)
        return 'Email enviado com sucesso'
    except Exception as ex:
        return 'Erro ao enviar email'
    finally:
        # Fechar a conexão com o servidor SMTP
        server.quit()
