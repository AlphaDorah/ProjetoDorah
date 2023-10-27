from src.dorahLLM.browserless_api import get_text_sites_test
from src.dorahLLM.maritalk_summary import summary_text_test, summary_sites
from src.dorahSearch.wikipedia_api import _wikipedia_search_test
from src.dorahSearch.google_api import _google_search_test, get_links


def test_load_site():
    texts_date = get_text_sites_test(['https://brasilescola.uol.com.br/historiab/independencia-brasil.htm', 'https://br.usembassy.gov/slide/brazil-national-day/independe%CC%82ncia-do-brasil-carrossel/', 'https://www.al.sp.gov.br/noticia/?07/09/2021/independencia-do-brasil-completa-199-anos-nesta-terca-feira--7-de-setembro', 'https://br.usembassy.gov/pt/dia-da-independencia-do-brasil-4/', 'https://www.amazon.com/Escravidao-Independencia-Brasil-Aurea-Portugues/dp/6559870529'])
    assert type(texts_date[0].page_content[0:10]) == str


def test_output_summary_from_text():
    term = "Independência do Brasil"
    text = """ As Cortes Gerais e Extraordinárias da Nação Portuguesa, instaladas em 1820, como consequência da Revolução Liberal do Porto, tomam decisões, a partir de 1821, que tinham como objetivo reduzir a autonomia adquirida pelo Brasil, o que na prática o faria retornar ao seu antigo estatuto colonial.
    Em 1807, o exército francês invadiu o Reino de Portugal, que se recusava a participar do bloqueio continental contra o Reino Unido. Incapaz de resistir ao ataque, a família real e o governo português fugiram para o Brasil, que era então a mais rica e desenvolvida das colônias portuguesas. Porém, em 1820, a revolução liberal eclodiu em Portugal e a família real foi forçada a retornar a Lisboa. Antes de deixar o Brasil, no entanto, o agora Rei D. João VI nomeou o seu filho mais velho, D. Pedro de Alcântara de Bragança, como Príncipe Regente do Brasil (1821).  Oficialmente, a data comemorada para independência do Brasil é de 7 de setembro de 1822, ocasião em que ocorreu o evento conhecido como o Grito do Ipiranga, às margens do riacho Ipiranga na cidade de São Paulo. Em 12 de outubro de 1822, o príncipe foi aclamado D. Pedro I, Imperador do Brasil, sendo coroado e consagrado em 1º de dezembro de 1822, e o país passou a ser conhecido como o Império do Brasil.
    """
    assert type(summary_text_test(term, text)) == str


def test_summary_from_sites():
    term = "Independência do Brasil"
    urls = get_links(term, _google_search_test)
    summary = summary_sites(term, summary_text_test, get_text_sites_test, urls, _wikipedia_search_test)
    assert 'Independência do Brasil' in summary



