from conexao import ConectarBanco, DesconectarBanco

def create_colecao(nome,usuario):
    conexao,cursor=ConectarBanco()
    sql = f"INSERT INTO tb_colecao(tb_colecao_nome,tb_usuario_id) VALUES('{nome}','{usuario}')"
    cursor.execute(sql)
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def read_colecao():
    conexao,cursor=ConectarBanco()
    sql = "SELECT * FROM tb_colecao"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    DesconectarBanco(conexao,cursor)
    col = list()
    for elemento in resultado:
        col.append(
            {
                'Id':elemento[0],
                'Nome':elemento[1],
                'Usuario':elemento[2]
            }
        )
    return col

def update_colecao(id,nome,usuario):
    conexao,cursor=ConectarBanco()
    sql = f"UPDATE tb_colecao SET tb_colecao_nome = '{nome}',tb_usuario_id = {usuario} WHERE tb_colecao_id = {id}"
    cursor.execute(sql)
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def delete_colecao(id):
    conexao,cursor=ConectarBanco()
    sql = f"DELETE FROM tb_colecao where tb_colecao_id={id}"
    cursor.execute(sql)
    conexao.commit()
    DesconectarBanco(conexao,cursor)