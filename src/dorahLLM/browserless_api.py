from langchain.document_loaders import BrowserlessLoader
from langchain.schema.document import Document


def get_text_sites(urls):
    loader = BrowserlessLoader(
        api_token="106e87dd-9a75-44a9-b7cf-c961b88a61de",
        urls=urls,
        text_content=True,
    )
    documents = loader.load()
    return documents


def get_text_sites_test(urls: list):
    documents = [Document(page_content='\nExercícios\nMonografias\nVídeos\n+ Canais\nHOME  HISTÓRIA DO BRASIL  BRASIL IMPÉRIO  INDEPENDÊNCIA DO BRASIL\nIndependência do Brasil\n\nA independência do Brasil foi um processo iniciado a partir da Revolução Liberal do Porto, que levou ao rompimento entre Brasil e Portugal, no dia 7 de setembro de 1822.\n\nEm 1808, D. João VI e a família real portuguesa mudaram-se para o Rio de Janeiro.[1]\nImprimir\nTexto:\nA+\nA-\nOuça o texto abaixo em aúdio!\nPUBLICIDADE\n\nA independência do Brasil aconteceu em 1822, tendo como grande marco o grito da independência que foi realizado por Pedro de Alcântara (D. Pedro I durante o Primeiro Reinado), às margens do Rio Ipiranga, no dia 7 de setembro de 1822. Com a independência do Brasil declarada, o país transformou-se em uma monarquia com a coroação de D. Pedro I.', metadata={'source': 'https://brasilescola.uol.com.br/historiab/independencia-brasil.htm'}), Document(page_content='Travel Advisory: \nU.S. Consulate General Recife\nU.S. Consulate General Rio de Janeiro\nU.S. Consulate General São Paulo\nU.S. Consulate General Porto Alegre\nU.S. Embassy Branch Office in Belo Horizonte\n\n\nFooter Disclaimer\n\nThis is the official website of the U.S. Embassy and Consulates in Brazil. External links to other Internet sites should not be construed as an endorsement of the views or privacy policies contained therein.', metadata={'source': 'https://br.usembassy.gov/slide/brazil-national-day/independe%CC%82ncia-do-brasil-carrossel/'}), Document(page_content='SOBRE O PORTAL\n Foi às margens do rio Ipiranga, em São Paulo, que D. Pedro 1º anunciou a independência brasileira\n07/09/2021 08:59 | Independência | Luccas Lucena - Foto: Acervo Histórico / Alesp\n\nCompartilhar:\n\nIndependência ou Morte de Pedro Américo (óleo sobre tela 1888)\n Mensagem de Washington Luís\n Clique para ver a imagem\nNo dia 7 de setembro de 1822, D. Pedro 1º proclamou o grito de independência às margens do rio Ipiranga e o Brasil se consolidou como uma nação independente. Desde 1946, por lei federal, a data é feriado nacional.\n', metadata={'source': 'https://www.al.sp.gov.br/noticia/?07/09/2021/independencia-do-brasil-completa-199-anos-nesta-terca-feira--7-de-setembro'}), Document(page_content='English\nPortuguês\nEmbaixada e Consulados dos\nEUA no Brasil\n |\n[Skip to Content]\nDia da Independência do Brasil\nHome / Notícias e Eventos / Dia da Independência do Brasil\n \n\nDepartamento de Estado dos EUA\nGabinete do porta-voz\nComunicado do secretário Antony J. Blinken\n7 de setembro de 2023\n\nEm nome dos Estados Unidos da América, parabenizo o povo brasileiro pelos 201 anos da sua independência neste 7 de setembro.\n\nO Brasil e os Estados Unidos orgulhosamente se unem como democracias vibrantes e diversas. Valorizamos profundamente nosso compromisso conjunto de enfrentar desafios regionais e globais, promover inclusão social e econômica e combater as mudanças climáticas para criar um ambiente justo, equitativo e sustentável, onde todos os nossos cidadãos possam prosperar. Nossas comunidades diaspóricas possuem culturas ricas e sustentam nossos laços calorosos entre as pessoas. Juntos, podemos continuar a fortalecer nossa relação baseada em princípios democráticos compartilhados que garantem prosperidade, segurança e liberdade para nossos cidadãos.\n\nO povo dos Estados Unidos deseja a todos os brasileiros um feliz Dia da Independência.\n\nDe U.S. Mission Brazil | 7 Setembro, 2023', metadata={'source': 'https://br.usembassy.gov/pt/dia-da-independencia-do-brasil-4/'}), Document(page_content='Skip to main content\nDelivering to Santa Clara 95054\nBooks\nAll Departments\nAlexa Skills\nAmazon Devices\nAmazon Fresh\nAmazon Pharmacy\nnFollow the Author\nLaurentino Gomes\nLaurentino Gomes\nFollow\nEscravidao - Volume 3. Da Independencia do Brasil a Lei Aurea (Em Portugues do Brasil) Paperback – January 1, 2019\nPortuguese Edition  by _ (Author)\n4.9 \n4.9 out of 5 stars\n    2,671 ratings\nPart of: Escravidão (3 books)\nSee all formats and editions\n Audiobook\n$0.00\nFree with your Audible trial\n \nPaperback\n$45.10 \n2 Used from $33.34\n11 New from $37.77\n\nO tão esperado terceiro e último volume da trilogia Escravidão, de Laurentino Gomes\n\nDo autor dos best-sellers 1808, 1822 e 1889\n\nNa tarde em que o príncipe dom Pedro chegou às margens do Ipiranga, em 7 de setembro de 1822, o Brasil estava empanturrado de escravidão. Comprar e vender gente era o maior negócio do novo país independente.\n', metadata={'source': 'https://www.amazon.com/Escravidao-Independencia-Brasil-Aurea-Portugues/dp/6559870529'})]
    return documents


if __name__ == "__main__":
    texts_date = get_text_sites(['https://brasilescola.uol.com.br/historiab/independencia-brasil.htm', 'https://br.usembassy.gov/slide/brazil-national-day/independe%CC%82ncia-do-brasil-carrossel/', 'https://www.al.sp.gov.br/noticia/?07/09/2021/independencia-do-brasil-completa-199-anos-nesta-terca-feira--7-de-setembro', 'https://br.usembassy.gov/pt/dia-da-independencia-do-brasil-4/', 'https://www.amazon.com/Escravidao-Independencia-Brasil-Aurea-Portugues/dp/6559870529'])
    print(texts_date[0].page_content[:])
