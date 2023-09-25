from flask import Flask, render_template
from static.google_api import get_links

import ssl

ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)

@app.route('/mind_map')
def generate_view():
    temas = ["Segunda Guerra Mundial", "Bombas nucleares", "Países que participaram", "Tratado de versales", "Batalhas", "Alemanha"]
    links = get_links('segunda guerra')

    return render_template('view.html', temas=temas, links=links)

if __name__ == '__main__':
    app.run(debug=True, port=3000)