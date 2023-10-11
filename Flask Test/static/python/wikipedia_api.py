import wikipediaapi

# Wikipedia params
w_user = 'Dorah (https://github.com/faduzin/ProjetoDorah)'


def _wikipedia_search_test(search_term, user):
  if search_term == 'inexistente':
    return ("Summary Not Found :(", 0)
  else:
    return (
        'A Segunda Guerra Mundial foi um conflito militar global que durou de 1939 a 1945, envolvendo a maioria das nações do mundo — incluindo todas as grandes potências — organizadas em duas alianças militares opostas: os Aliados e o Eixo. Foi a guerra mais abrangente da história, com mais de 100 milhões de militares mobilizados. Em estado de "guerra total", os principais envolvidos dedicaram toda sua capacidade econômica, industrial e científica a serviço dos esforços de guerra, deixando de lado a distinção entre recursos civis e militares. Marcado por um número significante de ataques contra civis, incluindo o Holocausto e a única vez em que armas nucleares foram utilizadas em combate, foi o conflito mais letal da história da humanidade, resultando entre 50 a mais de 70 milhões de mortes.Geralmente considera-se o ponto inicial da guerra como sendo a invasão da Polônia pela Alemanha Nazista em 1 de setembro de 1939 e subsequentes declarações de guerra contra a Alemanha pela França e pela maioria dos países do Império Britânico e da Commonwealth. Alguns países já estavam em guerra nesta época, como Etiópia e Reino de Itália na Segunda Guerra Ítalo-Etíope e China e Japão na Segunda Guerra Sino-Japonesa. Muitos dos que não se envolveram inicialmente acabaram aderindo ao conflito em resposta a eventos como a invasão da União Soviética pelos alemães e os ataques japoneses contra as forças dos Estados Unidos no Pacífico em Pearl Harbor e em colônias ultramarítimas britânicas, que resultou em declarações de guerra contra o Japão pelos Estados Unidos, Países Baixos e o Commonwealth Britânico.A guerra terminou com a vitória dos Aliados em 1945, alterando significativamente o alinhamento político e a estrutura social mundial. Enquanto a Organização das Nações Unidas (ONU) era estabelecida para estimular a cooperação global e evitar futuros conflitos, a União Soviética e os Estados Unidos emergiam como superpotências rivais, preparando o terreno para uma Guerra Fria que se estenderia pelos próximos quarenta e seis anos (1945–1991). Nesse ínterim, a aceitação do princípio de autodeterminação acelerou movimentos de descolonização na Ásia e na África, enquanto a Europa ocidental dava início a um movimento de recuperação econômica e integração política.',
        0)


def _wikipedia_search(search_term, user):
  wiki = wikipediaapi.Wikipedia(user, 'pt')
  page = wiki.page(search_term)

  if page.exists():
    return (page.summary, page.namespace)
  else:
    return (None, None)


def get_sumary(search_term, w_interface):
  w_result = w_interface(search_term, w_user)

  if w_result[0] is not None:
    return w_result[0]
  else:
    return "Summary Not Found :("
