import src.dorahSearch.wikipedia_api as wiki


def test_wikipedia_page_exist():
  assert wiki.get_sumary('Segunda Guerra',
                         wiki._wikipedia_search_test) != "Summary Not Found :("


def test_wikipedia_page_not_exist():
  assert wiki.get_sumary('inexistente',
                         wiki._wikipedia_search_test) == "Summary Not Found :("


def test_wikipedia_summary_format():
  assert type(wiki.get_sumary('Segunda Guerra',
                              wiki._wikipedia_search_test)) == str
