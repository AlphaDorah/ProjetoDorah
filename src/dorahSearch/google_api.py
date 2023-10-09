from googleapiclient.discovery import build

# Google params 
g_api_key = 'AIzaSyA22aAixSFOwUjeuPcmrkfTTBIbOkh5-t0'
g_cse_id = '87aec49bd378c41f9'

def _google_search(search_term, api_key, cse_id, **kwargs):
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()

    return res

# Definition of the main func
def get_links(search_term):
    g_result = _google_search(search_term, g_api_key, g_cse_id)
    if 'spelling' in g_result:
        search_term = str(g_result['spelling']['correctedQuery'])

    links = []
    for i in range(0, 5):
        link_i = g_result['items'][i]['link']

        if 'wiki' not in link_i:
            links.append(link_i)