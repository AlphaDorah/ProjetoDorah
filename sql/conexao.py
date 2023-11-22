import mysql.connector

def ConectarBanco():
    conexao = mysql.connector.connect(
        host='roundhouse.proxy.rlwy.net',
        database='railway',
        user='root',
        password='ba-dGCbfc-G-2GcfBFfb2ccggafc4A13',
    )
    if conexao.is_connected():
        print("Conectado com sucesso")
        cursor = conexao.cursor()
        return conexao,cursor
    else:
        print("Falha ao conectar")

def DesconectarBanco(conexao,cursor):
    if conexao.is_connected():
        cursor.close()
        conexao.close()