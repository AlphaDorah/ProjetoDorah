from .conexao import ConectarBanco,DesconectarBanco
from .converter import convertData,convertToImage

def create_usuario(login,senha,email):
    conexao,cursor=ConectarBanco()
    sql = """ INSERT INTO tb_usuario(tb_usuario_login, tb_usuario_senha, tb_usuario_email, tb_usuario_foto)\
    VALUES (%s,%s,%s)"""
    cursor.execute(sql, (login, senha, email))
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def read_usuario():
    conexao,cursor=ConectarBanco()
    sql = "SELECT * FROM tb_usuario"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    DesconectarBanco(conexao,cursor)
    usuarios = list()
    for elemento in resultado:
        image=None
        if elemento[4] != None:
            image=convertToImage(elemento[4])
        usuarios.append(
            {
                'Id':elemento[0],
                'Login':elemento[1],
                'Senha':elemento[2],
                'Email':elemento[3],
                'Foto':image
            }
        )
    return usuarios

def update_usuario(id,login,senha,email,foto_name):
    foto_blob=convertData(foto_name)
    conexao,cursor=ConectarBanco()
    sql = "UPDATE tb_usuario SET tb_usuario_login = %s, tb_usuario_senha = %s, tb_usuario_email = %s, tb_usuario_foto = %s WHERE tb_usuario_id = %s"
    cursor.execute(sql, (login, senha, email, foto_blob,id))
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def delete_usuario(id):
    conexao,cursor=ConectarBanco()
    sql = f"DELETE FROM tb_usuario where tb_usuario_id={id}"
    cursor.execute(sql)
    conexao.commit()
    DesconectarBanco(conexao,cursor)