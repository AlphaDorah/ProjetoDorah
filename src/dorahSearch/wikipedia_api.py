import wikipediaapi

# Wikipedia params
w_user = 'Dorah (https://github.com/faduzin/ProjetoDorah)'

def _wikipedia_search(search_term, user):
    wiki =  wikipediaapi.Wikipedia(user, 'pt')
    page = wiki.page(search_term)

    return page

def get_sumary(search_term):
    w_page = _wikipedia_search(search_term, w_user)
    
    if w_page.exists():
        term_sumary = w_page.summary
        return term_sumary
    else:
        return "Summary Not Found :("
