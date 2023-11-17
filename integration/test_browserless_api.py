from src.dorahLLM.browserless_api import get_text_sites


if __name__ == "__main__":
    texts_date = get_text_sites(['https://brasilescola.uol.com.br/historiab/independencia-brasil.htm/', 'https://br.usembassy.gov/slide/brazil-national-day/independe%CC%82ncia-do-brasil-carrossel/', 'https://www.al.sp.gov.br/noticia/?07/09/2021/independencia-do-brasil-completa-199-anos-nesta-terca-feira--7-de-setembro/', 'https://br.usembassy.gov/pt/dia-da-independencia-do-brasil-4/', 'https://www.amazon.com/Escravidao-Independencia-Brasil-Aurea-Portugues/dp/6559870529/'])
    print(texts_date[0].page_content[:])
