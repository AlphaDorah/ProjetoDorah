import wikipediaapi
from googleapiclient.discovery import build

# Google params 
g_api_key = 'AIzaSyA22aAixSFOwUjeuPcmrkfTTBIbOkh5-t0'
g_cse_id = '87aec49bd378c41f9'

# Wikipedia params
w_user = 'Dorah (https://github.com/faduzin/ProjetoDorah)'

# Definition of the Google search func
def _google_search(search_term, api_key, cse_id, **kwargs):
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()

    return res

# Definition of the Wikipedia search func
def _wikipedia_search(search_term, user):
    wiki =  wikipediaapi.Wikipedia(user, 'pt')
    page = wiki.page(search_term)

    return page

# Definition of the main func
def perform(search_term):
    g_result = _google_search(search_term, g_api_key, g_cse_id)
    if 'spelling' in g_result:
        search_term = str(g_result['spelling']['correctedQuery'])

    w_page = _wikipedia_search(search_term, w_user)

    links = []
    for i in range(0, 5):
        links.append(g_result['items'][i]['link'])
    
    if w_page.exists():
        term_sumary = w_page.summary
        return term_sumary, links
    else:
        return "Summary Not Found :(", links
    
if __name__ == '__main__':
    search = perform("segund guerar")
    print(search)
