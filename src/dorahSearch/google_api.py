from googleapiclient.discovery import build

# Google params
g_api_key = 'AIzaSyA22aAixSFOwUjeuPcmrkfTTBIbOkh5-t0'
g_cse_id = '87aec49bd378c41f9'


def _google_search_test(search_term, api_key, cse_id, **kwargs):
  return {
      'kind':
      'customsearch#search',
      'url': {
          'type':
          'application/json',
          'template':
          'https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json'
      },
      'queries': {
          'request': [{
              'title': 'Google Custom Search - produtos notáveis',
              'totalResults': '6590000',
              'searchTerms': 'produtos notáveis',
              'count': 10,
              'startIndex': 1,
              'inputEncoding': 'utf8',
              'outputEncoding': 'utf8',
              'safe': 'off',
              'cx': '87aec49bd378c41f9'
          }],
          'nextPage': [{
              'title': 'Google Custom Search - produtos notáveis',
              'totalResults': '6590000',
              'searchTerms': 'produtos notáveis',
              'count': 10,
              'startIndex': 11,
              'inputEncoding': 'utf8',
              'outputEncoding': 'utf8',
              'safe': 'off',
              'cx': '87aec49bd378c41f9'
          }]
      },
      'context': {
          'title': 'Dorah'
      },
      'searchInformation': {
          'searchTime': 0.34409,
          'formattedSearchTime': '0.34',
          'totalResults': '6590000',
          'formattedTotalResults': '6,590,000'
      },
      'items': [{
          'kind': 'customsearch#result',
          'title': 'O que são produtos notáveis? - Brasil Escola',
          'htmlTitle': 'O que são <b>produtos notáveis</b>? - Brasil Escola',
          'link':
          'https://brasilescola.uol.com.br/o-que-e/matematica/o-que-sao-produtos-notaveis.htm',
          'displayLink': 'brasilescola.uol.com.br',
          'snippet':
          'Produtos notáveis são multiplicações em que os fatores são polinômios. Existem cinco produtos notáveis mais relevantes: quadrado da soma, quadrado da diferença,\xa0...',
          'htmlSnippet':
          '<b>Produtos notáveis</b> são multiplicações em que os fatores são polinômios. Existem cinco <b>produtos notáveis</b> mais relevantes: quadrado da soma, quadrado da diferença,&nbsp;...',
          'cacheId': 'xh4mkT1SpjoJ',
          'formattedUrl':
          'https://brasilescola.uol.com.br/o-que-e/.../o-que-sao-produtos-notaveis.htm',
          'htmlFormattedUrl':
          'https://brasilescola.uol.com.br/o-que-e/.../o-que-sao-<b>produtos</b>-notaveis.htm',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAuIH5emgNYkgkdLUkDIjdFLO04UiqYgAW_2THYYLuirwTRJ_3Aggofutx',
                  'width': '285',
                  'height': '177'
              }],
              'metatags': [{
                  'og:image':
                  'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/os-produtos-notaveis-sao-usados-para-facilitar-calculos-5908972ca3a9c.jpg',
                  'twitter:title':
                  'O que são produtos notáveis? - Brasil Escola',
                  'twitter:card':
                  'summary_large_image',
                  'og:site_name':
                  'Brasil Escola',
                  'viewport':
                  'width=device-width, initial-scale=1.0',
                  'twitter:description':
                  'Clique e aprenda o que são produtos notáveis, como calcular cada um e obtenha exemplos resolvidos.',
                  'og:title':
                  'O que são produtos notáveis? - Brasil Escola',
                  'og:locale':
                  'pt_BR',
                  'og:url':
                  'https://brasilescola.uol.com.br/o-que-e/matematica/o-que-sao-produtos-notaveis.htm',
                  'og:description':
                  'Clique e aprenda o que são produtos notáveis, como calcular cada um e obtenha exemplos resolvidos.',
                  'twitter:image':
                  'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/os-produtos-notaveis-sao-usados-para-facilitar-calculos-5908972ca3a9c.jpg'
              }],
              'cse_image': [{
                  'src':
                  'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/os-produtos-notaveis-sao-usados-para-facilitar-calculos-5908972ca3a9c.jpg'
              }],
              'listitem': [{
                  'item': 'Home',
                  'name': 'Home',
                  'position': '1'
              }, {
                  'item': 'O que é',
                  'name': 'O que é',
                  'position': '2'
              }, {
                  'item': 'O que é Matemática?',
                  'name': 'O que é Matemática?',
                  'position': '3'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title':
          'Produtos Notáveis: conceito, propriedades, exercícios - Toda Matéria',
          'htmlTitle':
          '<b>Produtos Notáveis</b>: conceito, propriedades, exercícios - Toda Matéria',
          'link': 'https://www.todamateria.com.br/produtos-notaveis/',
          'displayLink': 'www.todamateria.com.br',
          'snippet':
          'produtos notáveis são expressões algébricas utilizadas em muitos cálculos matemáticos, por exemplo, nas equações de primeiro e de segundo grau. ; quadrado da\xa0...',
          'htmlSnippet':
          '<b>produtos notáveis</b> são expressões algébricas utilizadas em muitos cálculos matemáticos, por exemplo, nas equações de primeiro e de segundo grau. ; quadrado da&nbsp;...',
          'cacheId': 'riH27q6qniEJ',
          'formattedUrl': 'https://www.todamateria.com.br/produtos-notaveis/',
          'htmlFormattedUrl':
          'https://www.todamateria.com.br/<b>produtos</b>-notaveis/',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOTd4Fk6w0NsH7dkYTbXatPdtGt8fm6dVhMqkvjxWNeQxkYHJZPh7XrWQ',
                  'width': '310',
                  'height': '163'
              }],
              'metatags': [{
                  'msapplication-tilecolor':
                  '#663ab5',
                  'p:domain_verify':
                  '84722b812aa9dbf71c696481737aef5f',
                  'og:image':
                  'https://static.todamateria.com.br/img/ogimage.png',
                  'og:type':
                  'article',
                  'theme-color':
                  '#ffffff',
                  'og:site_name':
                  'Toda Matéria',
                  'viewport':
                  'width=device-width, initial-scale=1',
                  'og:title':
                  'Produtos Notáveis: conceito, propriedades, exercícios',
                  'og:locale':
                  'pt_br',
                  'fb:admins':
                  '806619650',
                  'og:url':
                  'https://www.todamateria.com.br/produtos-notaveis/',
                  'og:description':
                  'Os produtos notáveis são expressões algébricas utilizadas em muitos cálculos matemáticos, por exemplo, nas equações de primeiro e de segundo grau. O termo "notável" refere-se à importância e notabilidade desses conceitos para a área da matemática. Antes de sabermos suas...'
              }],
              'cse_image': [{
                  'src':
                  'https://static.todamateria.com.br/img/ogimage.png'
              }],
              'listitem': [{
                  'item': 'Toda Matéria',
                  'name': 'Toda Matéria',
                  'position': '1'
              }, {
                  'item': 'Matemática',
                  'name': 'Matemática',
                  'position': '2'
              }, {
                  'item': 'Álgebra',
                  'name': 'Álgebra',
                  'position': '3'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title':
          'Produtos notáveis: o que são e propriedades - Mundo Educação',
          'htmlTitle':
          '<b>Produtos notáveis</b>: o que são e propriedades - Mundo Educação',
          'link':
          'https://mundoeducacao.uol.com.br/matematica/produtos-notaveis.htm',
          'displayLink': 'mundoeducacao.uol.com.br',
          'snippet':
          'Os produtos notáveis são tipos de multiplicação que aparecem com muita frequência e que possuem propriedades para resolvê-las com agilidade. Exercícios\xa0...',
          'htmlSnippet':
          'Os <b>produtos notáveis</b> são tipos de multiplicação que aparecem com muita frequência e que possuem propriedades para resolvê-las com agilidade. Exercícios&nbsp;...',
          'cacheId': '6l9CLNuFAiEJ',
          'formattedUrl':
          'https://mundoeducacao.uol.com.br/matematica/produtos-notaveis.htm',
          'htmlFormattedUrl':
          'https://mundoeducacao.uol.com.br/matematica/<b>produtos</b>-notaveis.htm',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTTrVLPaMIuOZq9VPVl1UfML5s95X9f-GnhBlz8uf8VOtgGsuowzbhfw44',
                  'width': '299',
                  'height': '168'
              }],
              'metatags': [{
                  'og:image':
                  'https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/03/produtos-notaveis.jpg',
                  'twitter:title':
                  'Produtos notáveis: o que são e propriedades - Mundo Educação',
                  'twitter:card':
                  'summary_large_image',
                  'og:site_name':
                  'Mundo Educação',
                  'viewport':
                  'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no',
                  'twitter:description':
                  'Veja todos os produtos notáveis e aprenda a interpretá-los geometricamente. Saiba também como aplicá-los em problemas.',
                  'og:title':
                  'Produtos notáveis: o que são e propriedades - Mundo Educação',
                  'og:locale':
                  'pt_BR',
                  'og:url':
                  'https://mundoeducacao.uol.com.br/matematica/produtos-notaveis.htm',
                  'og:description':
                  'Veja todos os produtos notáveis e aprenda a interpretá-los geometricamente. Saiba também como aplicá-los em problemas.',
                  'twitter:image':
                  'https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/03/produtos-notaveis.jpg'
              }],
              'cse_image': [{
                  'src':
                  'https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/03/produtos-notaveis.jpg'
              }],
              'listitem': [{
                  'item': 'Home',
                  'name': 'Home',
                  'position': '1'
              }, {
                  'item': 'Matemática',
                  'name': 'Matemática',
                  'position': '2'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title': 'Produtos Notáveis e Fatoração - YouTube',
          'htmlTitle': '<b>Produtos Notáveis</b> e Fatoração - YouTube',
          'link':
          'https://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK',
          'displayLink': 'www.youtube.com',
          'snippet':
          '13 videosLast updated on Aug 15, 2020. Play all · Shuffle · 10:14. Produtos Notáveis - Quadrado da Soma de Dois Termos. Matemática no Papel.',
          'htmlSnippet':
          '13 videosLast updated on Aug 15, 2020. Play all &middot; Shuffle &middot; 10:14. <b>Produtos Notáveis</b> - Quadrado da Soma de Dois Termos. Matemática no Papel.',
          'cacheId': 'hh2JDEb5fHIJ',
          'formattedUrl':
          'https://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd...',
          'htmlFormattedUrl':
          'https://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd...',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQC_cPoJ1Qajw3Znmx0nAHTgxrTxylzQf1rtsB4FAKFjDrQVavAabx-ow',
                  'width': '120',
                  'height': '90'
              }],
              'metatags': [{
                  'apple-itunes-app':
                  'app-id=544007664, app-argument=https://m.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK&referring_app=com.apple.mobilesafari-smartbanner, affiliate-data=ct=smart_app_banner_polymer&pt=9008',
                  'og:image':
                  'https://i.ytimg.com/vi/FWQBDGc7cAY/default.jpg?days_since_epoch=19601',
                  'twitter:app:url:iphone':
                  'http://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK&feature=twitter-deep-link',
                  'twitter:app:id:googleplay': 'com.google.android.youtube',
                  'theme-color': 'rgba(0, 0, 0, 0)',
                  'og:image:width': '120',
                  'twitter:card': 'summary',
                  'og:site_name': 'YouTube',
                  'twitter:url': 'https://www.youtube.com/playlist',
                  'twitter:app:url:ipad':
                  'http://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK&feature=twitter-deep-link',
                  'al:android:package': 'com.google.android.youtube',
                  'twitter:app:name:googleplay': 'YouTube',
                  'al:ios:url':
                  'http://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK&feature=applinks',
                  'twitter:app:id:iphone': '544007664',
                  'title': 'Produtos Notáveis e Fatoração - YouTube',
                  'al:ios:app_store_id': '544007664',
                  'twitter:image':
                  'https://i.ytimg.com/vi/FWQBDGc7cAY/default.jpg?days_since_epoch=19601',
                  'twitter:site': '@YouTube',
                  'og:type': 'website',
                  'twitter:title': 'Produtos Notáveis e Fatoração - YouTube',
                  'al:ios:app_name': 'YouTube',
                  'og:title': 'Produtos Notáveis e Fatoração - YouTube',
                  'og:image:height': '90',
                  'twitter:app:id:ipad': '544007664',
                  'al:web:url':
                  'http://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK&feature=applinks',
                  'al:android:url':
                  'http://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK&feature=applinks',
                  'fb:app_id': '87741124305',
                  'twitter:app:url:googleplay':
                  'http://www.youtube.com/playlist?list=PL-LPJn0YTIEGR7Qd-uvZFVo0KfNf83SVK&feature=twitter-deep-link',
                  'twitter:app:name:ipad': 'YouTube',
                  'viewport':
                  'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,',
                  'og:restrictions:age': '18+',
                  'al:web:should_fallback': 'true',
                  'og:url': 'https://www.youtube.com/playlist',
                  'al:android:app_name': 'YouTube',
                  'twitter:app:name:iphone': 'YouTube'
              }],
              'cse_image': [{
                  'src':
                  'https://i.ytimg.com/vi/FWQBDGc7cAY/default.jpg?days_since_epoch=19601'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title': 'Produtos notáveis – Wikipédia, a enciclopédia livre',
          'htmlTitle':
          '<b>Produtos notáveis</b> – Wikipédia, a enciclopédia livre',
          'link': 'https://pt.wikipedia.org/wiki/Produtos_not%C3%A1veis',
          'displayLink': 'pt.wikipedia.org',
          'snippet':
          'Regra básica: Quadrado do primeiro termo, somado ao dobro do primeiro termo multiplicado pelo segundo termo, somado ao quadrado do segundo termo.',
          'htmlSnippet':
          'Regra básica: Quadrado do primeiro termo, somado ao dobro do primeiro termo multiplicado pelo segundo termo, somado ao quadrado do segundo termo.',
          'cacheId': '78TKPSG8u4cJ',
          'formattedUrl': 'https://pt.wikipedia.org/wiki/Produtos_notáveis',
          'htmlFormattedUrl':
          'https://pt.wikipedia.org/wiki/<b>Produtos</b>_<b>notáveis</b>',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTddb3S_PnT0gg9b2NHH_R3tQUG47xSBJuZibu82FRlzK2qTRKNmHZboe7l',
                  'width': '220',
                  'height': '187'
              }],
              'metatags': [{
                  'referrer': 'origin',
                  'theme-color': '#eaecf0',
                  'og:type': 'website',
                  'viewport':
                  'width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.25, maximum-scale=5.0',
                  'og:title':
                  'Produtos notáveis – Wikipédia, a enciclopédia livre',
                  'format-detection': 'telephone=no'
              }],
              'cse_image': [{
                  'src':
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Binomio_al_cubo.svg/220px-Binomio_al_cubo.svg.png'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title':
          'Lista de Exercícios sobre produtos notáveis - Brasil Escola',
          'htmlTitle':
          'Lista de Exercícios sobre <b>produtos notáveis</b> - Brasil Escola',
          'link':
          'https://exercicios.brasilescola.uol.com.br/exercicios-matematica/exercicios-sobre-os-produtos-notaveis.htm',
          'displayLink': 'exercicios.brasilescola.uol.com.br',
          'snippet':
          'Os produtos notáveis listados pelo professor são conhecidos, respectivamente, como: A) Quadrado da diferença, quadrado da soma e cubo da diferença. B) Produto\xa0...',
          'htmlSnippet':
          'Os <b>produtos notáveis</b> listados pelo professor são conhecidos, respectivamente, como: A) Quadrado da diferença, quadrado da soma e cubo da diferença. B) Produto&nbsp;...',
          'cacheId': 'a15kk_7_vIYJ',
          'formattedUrl':
          'https://exercicios.brasilescola.uol.com.br/.../exercicios-sobre-os-produtos- notaveis.htm',
          'htmlFormattedUrl':
          'https://exercicios.brasilescola.uol.com.br/.../exercicios-sobre-os-<b>produtos</b>- notaveis.htm',
          'pagemap': {
              'metatags': [{
                  'twitter:title':
                  'Exercícios sobre produtos notáveis - Brasil Escola',
                  'og:site_name':
                  'Exercícios Brasil Escola',
                  'viewport':
                  'width=device-width, initial-scale=1',
                  'twitter:description':
                  'Resolva exercícios envolvendo produtos notáveis. Utilize as diferentes formas de simplificação de produtos algébricos, e teste seus conhecimentos sobre o tema.',
                  'og:title':
                  'Exercícios sobre produtos notáveis - Brasil Escola',
                  'og:locale':
                  'pt_BR',
                  'og:url':
                  'https://exercicios.brasilescola.uol.com.br/exercicios-matematica/exercicios-sobre-os-produtos-notaveis.htm',
                  'og:description':
                  'Resolva exercícios envolvendo produtos notáveis. Utilize as diferentes formas de simplificação de produtos algébricos, e teste seus conhecimentos sobre o tema.'
              }],
              'listitem': [{
                  'item': 'Home',
                  'name': 'Home',
                  'position': '1'
              }, {
                  'item': 'Exercícios de Matemática',
                  'name': 'Exercícios de Matemática',
                  'position': '2'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title': 'PRODUTOS NOTÁVEIS Flashcards | Quizlet',
          'htmlTitle': '<b>PRODUTOS NOTÁVEIS</b> Flashcards | Quizlet',
          'link':
          'https://quizlet.com/br/178618480/produtos-notaveis-flash-cards/',
          'displayLink': 'quizlet.com',
          'snippet':
          'O produto da soma pela diferença de dois termos é igual ao quadrado do primeiro termo, menos o quadrado do segundo termo. O cubo da soma de dois termos (a + b)3\xa0...',
          'htmlSnippet':
          'O <b>produto</b> da soma pela diferença de dois termos é igual ao quadrado do primeiro termo, menos o quadrado do segundo termo. O cubo da soma de dois termos (a + b)3&nbsp;...',
          'cacheId': '7sKDfZwM6RMJ',
          'formattedUrl':
          'https://quizlet.com/br/178618480/produtos-notaveis-flash-cards/',
          'htmlFormattedUrl':
          'https://quizlet.com/br/178618480/<b>produtos</b>-notaveis-flash-cards/',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSu42Op7zUA1tGcOGRkjEHI9a962CW7hrsDnUvUEQ9Wm2_kdOngRuvLiWj9',
                  'width': '310',
                  'height': '163'
              }],
              'metatags': [{
                  'og:image':
                  'https://assets.quizlet.com/a/j/dist/app/i/share/share-set.1f4740293bbc750.png',
                  'og:type': 'website',
                  'twitter:card': 'summary_large_image',
                  'twitter:title': 'PRODUTOS NOTÁVEIS Flashcards',
                  'og:site_name': 'Quizlet',
                  'og:title': 'PRODUTOS NOTÁVEIS Flashcards',
                  'twitter:app:id:ipad': '546473125',
                  'yandex-verification': '4a4a4256f578aafa',
                  'twitter:app:id:iphone': '546473125',
                  'color-scheme': 'light dark',
                  'og:description':
                  'Study with Quizlet and memorize flashcards containing terms like O quadrado da soma de dois termos\n(a + b)2= (a + b) . (a + b), O quadrado da diferença de dois termos\n(a - b)2 = (a - b) . (a - b, O produto da soma pela diferença de dois termos\n(a + b).(a - b) = a2 - b2 and more.',
                  'twitter:image':
                  'https://assets.quizlet.com/a/j/dist/app/i/share/share-set.1f4740293bbc750.png',
                  'next-head-count': '22',
                  'referrer': 'strict-origin-when-cross-origin',
                  'twitter:site': '@quizlet',
                  'twitter:app:name:ipad': 'Quizlet',
                  'viewport':
                  'width=device-width, initial-scale=1.0, maximum-scale=5.0',
                  'twitter:description':
                  'Study with Quizlet and memorize flashcards containing terms like O quadrado da soma de dois termos\n(a + b)2= (a + b) . (a + b), O quadrado da diferença de dois termos\n(a - b)2 = (a - b) . (a - b, O produto da soma pela diferença de dois termos\n(a + b).(a - b) = a2 - b2 and more.',
                  'og:url':
                  'https://quizlet.com/br/178618480/produtos-notaveis-flash-cards/',
                  'twitter:app:name:iphone': 'Quizlet'
              }],
              'cse_image': [{
                  'src':
                  'https://assets.quizlet.com/a/j/dist/app/i/share/share-set.1f4740293bbc750.png'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title':
          '11 melhor ideia de Produtos notáveis | produtos notáveis ...',
          'htmlTitle':
          '11 melhor ideia de <b>Produtos notáveis</b> | <b>produtos notáveis</b> ...',
          'link':
          'https://br.pinterest.com/sarahtio826/produtos-not%C3%A1veis/',
          'displayLink': 'br.pinterest.com',
          'snippet':
          '27/mai/2019 - Explore a pasta "Produtos notáveis" de Sarahtio no Pinterest. Veja mais ideias sobre produtos notáveis, matemática, estudos.',
          'htmlSnippet':
          '27/mai/2019 - Explore a pasta &quot;<b>Produtos notáveis</b>&quot; de Sarahtio no Pinterest. Veja mais ideias sobre <b>produtos notáveis</b>, matemática, estudos.',
          'cacheId': '_tU7ewhrEOoJ',
          'formattedUrl':
          'https://br.pinterest.com/sarahtio826/produtos-notáveis/',
          'htmlFormattedUrl':
          'https://br.pinterest.com/sarahtio826/<b>produtos</b>-<b>notáveis</b>/',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4cpyyrUlqRwBh9An4z2BWc_4EKwvTa4BnFeHt63cYYGhjaZgXb2aSmfAm',
                  'width': '200',
                  'height': '150'
              }],
              'metatags': [{
                  'application-name':
                  'Pinterest',
                  'msapplication-tilecolor':
                  '#ffffff',
                  'og:image':
                  'https://i.pinimg.com/200x150/ed/a9/bb/eda9bb504b9c6c144895043472f5c8ae.jpg',
                  'og:type':
                  'pinterestapp:pinboard',
                  'twitter:title':
                  'Produtos notáveis',
                  'og:site_name':
                  'Pinterest',
                  'og:title':
                  '11 melhor ideia de Produtos notáveis | produtos notáveis, matemática, estudos',
                  'msapplication-tileimage':
                  'https://s.pinimg.com/webapp/logo_trans_144x144-5e37c0c6.png',
                  'og:updated_time':
                  '2019-05-27T00:13:06.000Z',
                  'og:description':
                  '27/mai/2019 - Explore a pasta &quot;Produtos notáveis&quot; de Sarahtio no Pinterest. Veja mais ideias sobre produtos notáveis, matemática, estudos.',
                  'pinterestapp:pinner':
                  'https://br.pinterest.com/sarahtio826/',
                  'twitter:image:src':
                  'https://i.pinimg.com/200x150/ed/a9/bb/eda9bb504b9c6c144895043472f5c8ae.jpg',
                  'referrer':
                  'origin',
                  'fb:app_id':
                  '274266067164',
                  'viewport':
                  'width=device-width, initial-scale=1',
                  'pinterestapp:pins':
                  '11',
                  'twitter:description':
                  '27/mai/2019 - Explore a pasta &quot;Produtos notáveis&quot; de Sarahtio no Pinterest. Veja mais ideias sobre produtos notáveis, matemática, estudos.',
                  'og:url':
                  'https://br.pinterest.com/sarahtio826/produtos-not%C3%A1veis/'
              }],
              'cse_image': [{
                  'src':
                  'https://i.pinimg.com/200x150/ed/a9/bb/eda9bb504b9c6c144895043472f5c8ae.jpg'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title': 'Produtos Notáveis – GeoGebra',
          'htmlTitle': '<b>Produtos Notáveis</b> – GeoGebra',
          'link': 'https://www.geogebra.org/m/C5rAMAQh',
          'displayLink': 'www.geogebra.org',
          'snippet':
          'Produtos Notáveis. Author: HELOM BENTO. GeoGebra Applet Press Enter to start activity. New Resources. Maths & Tangram · Quick Surface of Revolution Creator\xa0...',
          'htmlSnippet':
          '<b>Produtos Notáveis</b>. Author: HELOM BENTO. GeoGebra Applet Press Enter to start activity. New Resources. Maths &amp; Tangram &middot; Quick Surface of Revolution Creator&nbsp;...',
          'cacheId': '_CaJOnjdLnwJ',
          'formattedUrl': 'https://www.geogebra.org/m/C5rAMAQh',
          'htmlFormattedUrl': 'https://www.geogebra.org/m/C5rAMAQh',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfaMhltinPthQwfrRrhY-b9g43bvEGJHbRt4sWpyu7u8P1oLW_05m_aqU',
                  'width': '225',
                  'height': '225'
              }],
              'metatags': [{
                  'og:see_also': 'undefined//undefined',
                  'og:image':
                  'https://www.geogebra.org/resource/xrfQuSsz/dPx6LbZva1ew4WHz/material-xrfQuSsz-thumb@l.png',
                  'og:type': 'article',
                  'article:published_time': '2017-09-28T00:50:46.000Z',
                  'twitter:card': 'summary',
                  'twitter:title': 'Produtos Notáveis',
                  'og:site_name': 'GeoGebra',
                  'twitter:url': 'https://www.geogebra.org/m/C5rAMAQh',
                  'og:title': 'Produtos Notáveis',
                  'og:description': 'Produtos Notáveis',
                  'article:publisher': 'https://www.facebook.com/geogebra',
                  'article:author': '/u/helom.bento',
                  'twitter:image':
                  'https://www.geogebra.org/resource/xrfQuSsz/dPx6LbZva1ew4WHz/material-xrfQuSsz-thumb@l.png',
                  'fb:app_id': '185307058177853',
                  'article:author:first_name': 'HELOM BENTO',
                  'viewport': 'width=device-width,initial-scale=1',
                  'twitter:description': 'Produtos Notáveis',
                  'ggb:m:id': 'C5rAMAQh',
                  'article:author:username': 'helom.bento',
                  'og:url': 'https://www.geogebra.org/m/C5rAMAQh'
              }],
              'cse_image': [{
                  'src':
                  'https://www.geogebra.org/resource/xrfQuSsz/dPx6LbZva1ew4WHz/material-xrfQuSsz-thumb@l.png'
              }]
          }
      }, {
          'kind': 'customsearch#result',
          'title':
          'Produtos Notáveis e Fatoração de Expressões ... - Portal da OBMEP',
          'htmlTitle':
          'Produtos Notáveis e Fatoração de Expressões ... - Portal da OBMEP',
          'link':
          'https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=14',
          'displayLink': 'portaldaobmep.impa.br',
          'snippet':
          'Produtos Notáveis – Parte 3. Iniciamos a aula com uma interpretação geométrica do produto notável "quadrado da soma de dois termos" e na sequência resolvemos\xa0...',
          'htmlSnippet':
          '<b>Produtos Notáveis</b> – Parte 3. Iniciamos a aula com uma interpretação geométrica do <b>produto notável</b> &quot;quadrado da soma de dois termos&quot; e na sequência resolvemos&nbsp;...',
          'cacheId': 'damLKdEboBQJ',
          'formattedUrl':
          'https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=14',
          'htmlFormattedUrl':
          'https://portaldaobmep.impa.br/index.php/modulo/ver?modulo=14',
          'pagemap': {
              'cse_thumbnail': [{
                  'src':
                  'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcShWYPKvrSqyQcbWGSKdW2x9RiraqKvTP6kcQVkhGNLnRFC8wKEk4TkkQo',
                  'width': '259',
                  'height': '194'
              }],
              'metatags': [{
                  'viewport': 'width=device-width, initial-scale=1.0'
              }],
              'cse_image': [{
                  'src':
                  'https://img.youtube.com/vi/AvNnnTpwLug/hqdefault.jpg'
              }]
          }
      }]
  }


def _google_search(search_term, api_key, cse_id, **kwargs):
  service = build("customsearch",
                  "v1",
                  static_discovery=False,
                  developerKey=api_key)
  res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()

  return res


# Definition of the main func
def get_links(search_term, g_interface):
  g_result = g_interface(search_term, g_api_key, g_cse_id)
  if 'spelling' in g_result:
    search_term = str(g_result['spelling']['correctedQuery'])

  links = []
  i = 0
  while len(links) < 3 and i < len(g_result['items']):
    link_i = g_result['items'][i]['link']

    if 'wiki' not in link_i and 'youtube' not in link_i:
      links.append(link_i)

    i += 1

  return links