from src.dorahLLM.browserless_api import get_text_sites
from src.dorahLLM.maritalk_summary import summary_text, summary_sites
from src.dorahLLM.maritalk_topics import generate_topics_from_text
from src.dorahSearch.google_api import get_links, _google_search
from src.dorahSearch.wikipedia_api import _wikipedia_search

if __name__ == "__main__":
    one_term = "Brasil"
    urls = get_links(one_term, _google_search)
    one_summary = summary_sites(one_term, summary_text, get_text_sites, urls, _wikipedia_search)
    print(f"Resumo: \n{one_summary}\n")
    one_topics = generate_topics_from_text(one_summary)
    print(f"Tópicos: \n{one_topics}")
