import src.dorahSearch.google_api as google


def test_get_links_quantity():
  assert len(google.get_links('Produtos Notáveis',
                              google._google_search_test)) > 0


def test_get_links_correctly():
  links = google.get_links('Produtos Notáveis', google._google_search_test)

  assert 'youtube' not in links and 'wiki' not in links
