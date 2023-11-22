from conexao import ConectarBanco, DesconectarBanco
from converter import convertData


def create_mapa(nome,usuario,arq_nome):
    arq_blob=convertData(arq_nome)
    conexao,cursor=ConectarBanco()
    sql = """INSERT INTO tb_mapamental(tb_MapaMental_nome,tb_usuario_id,tb_MapaMental_arq)\
        VALUES(%s,%s,%s)"""
    cursor.execute(sql, (nome, usuario, arq_blob))
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def read_mapa():
    conexao,cursor=ConectarBanco()
    sql = "SELECT * FROM tb_mapamental"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    DesconectarBanco(conexao,cursor)
    mapa = list()
    for elemento in resultado:
        mapa.append(
            {
                'Id':elemento[0],
                'Nome':elemento[1],
                'Usuario':elemento[2],
                'Arquivo':elemento[3]
            }
        )
    return mapa

def update_mapa(id,nome,usuario,arq_nome):
    arq_blob=convertData(arq_nome)
    conexao,cursor=ConectarBanco()
    sql = "UPDATE tb_mapamental SET tb_MapaMental_nome = %s,tb_usuario_id = %s,tb_MapaMental_arq = %s where tb_MapaMental_id= %s"
    cursor.execute(sql, (nome, usuario, arq_blob,id))
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def delete_mapa(id):
    conexao,cursor=ConectarBanco()
    sql = f"DELETE FROM tb_mapamental where tb_MapaMental_id={id}"
    cursor.execute(sql)
    conexao.commit()
    DesconectarBanco(conexao,cursor)