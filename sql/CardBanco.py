from conexao import ConectarBanco, DesconectarBanco
from converter import convertData

def create_card(colecao,arq_nome):
    arq_blob=convertData(arq_nome)
    conexao,cursor=ConectarBanco()
    sql = "INSERT INTO tb_flashcard(tb_colecao_id,tb_FlashCard_arq) VALUES(%s,%s)"
    cursor.execute(sql, (colecao, arq_blob))
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def read_card():
    conexao,cursor=ConectarBanco()
    sql = "SELECT * FROM tb_flashcard"
    cursor.execute(sql)
    resultado = cursor.fetchall()
    DesconectarBanco(conexao,cursor)
    cards = list()
    for elemento in resultado:
        cards.append(
            {
                'Id':elemento[0],
                'Colecao':elemento[1],
                'Arquivo':elemento[2]
            }
        )
    return cards

def update_card(id,colecao,arq_nome):
    arq_blob=convertData(arq_nome)
    conexao,cursor=ConectarBanco()
    sql = "UPTADE tb_flashcard SET tb_colecao_id = %s,tb_FlashCard_arq = %s WHERE tb_FlashCard_id = %s"
    cursor.execute(sql, (colecao, arq_blob,id))
    conexao.commit()
    DesconectarBanco(conexao,cursor)

def delete_card(id):
    conexao,cursor=ConectarBanco()
    sql = f"DELETE FROM tb_flashcard where tb_FlashCard_id={id}"
    cursor.execute(sql)
    conexao.commit()
    DesconectarBanco(conexao,cursor)