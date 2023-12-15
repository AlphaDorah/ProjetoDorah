from functools import lru_cache
from src.dorahLLM.browserless_api import get_text_sites
from src.dorahLLM.maritalk_summary import summary_text
from src.dorahSearch.google_api import _google_search, get_links
from src.dorahSearch.wikipedia_api import _wikipedia_search, get_sumary


class FlashcardSummarizer:
    def __init__(self):
        self.llm_interface = summary_text
        self.load_interface = get_text_sites
        self.wiki_interface = _wikipedia_search

    @lru_cache(maxsize=None)
    def summary(self, term: str) -> str:
        urls = get_links(term, _google_search)
        self.summaries = get_sumary(term, self.wiki_interface)

        links = [urls[0]]

        try:
            list_doc = self.load_interface(links)
            for text_date in list_doc:
                length_text = len(text_date.page_content)
                if length_text < 18:
                    continue
                page_init = int(float(length_text) * 0.0560)  # evitar cabeçalho
                page_end = 8000 + page_init  # impede limite de tokens da Maritalk
                if length_text < page_end:
                    page_end = length_text
                partial_summary = self.llm_interface(
                    term, text_date.page_content[page_init:page_end]
                )
                self.summaries += partial_summary
        except (ValueError, TypeError):
            pass

        if self.summaries == "Summary Not Found :(":
            return ""
        final_summary = self.llm_interface(term, self.summaries)
        return final_summary
