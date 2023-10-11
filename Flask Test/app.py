from flask import Flask, render_template, request
from static.python.google_api import get_links, _google_search

import ssl

ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)

@app.route('/home')
def index():
    return render_template('home.html')

@app.route('/mind_map')
def generate_view():    
    temas = [request.args.get('tema')]

    #gerar temas com a llm, e passar para a página dos mapas
    temas.extend(["Bombas nucleares", "Países que participaram", "Tratado de versales", "Batalhas", "Alemanha"])
    #gerar resumos com a llm
    resumos = [1, 2, 3, 4, 5, 6]

    #links = get_links(temas[0], _google_search)

    return render_template('mind-map-page.html', temas=temas, resumos=resumos)

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)