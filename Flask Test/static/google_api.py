from googleapiclient.discovery import build

# Google params 
_g_api_key = 'AIzaSyA22aAixSFOwUjeuPcmrkfTTBIbOkh5-t0'
_g_cse_id = '87aec49bd378c41f9'

def _google_search(search_term, **kwargs):
    service = build("customsearch", "v1", developerKey=_g_api_key)
    res = service.cse().list(q=search_term, cx=_g_cse_id, hl='pt-BR', **kwargs).execute()

    return res

# Definition of the main func
def get_links(search_term):
    g_result = _google_search(search_term)

    if 'spelling' in g_result:
        search_term = str(g_result['spelling']['correctedQuery'])

    links = []
    for i in range(0, 5):
        links.append(g_result['items'][i]['link'])
    
    return links

print(get_links("Segunda Guerra Mundial"))