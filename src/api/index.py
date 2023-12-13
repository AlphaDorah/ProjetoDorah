from flask import (
    Blueprint,
    send_file,
    send_from_directory,
    request,
    render_template,
    redirect,
)

from src.dorahLLM.maritalk_summary import perform_summary, perform_topics
from src.dorahSearch.google_api import get_links, _google_search
from sql.UsuarioBanco import create_usuario,read_usuario

bp = Blueprint("index", __name__, url_prefix="/")


@bp.route("/")
def index():
    return send_file("public/dorahHome/home.html")


@bp.route("/mindmap")
def generate_map():
    nodes = str(request.args.get("topics"))
    nodes = nodes.split(";")
    if '' in nodes:
        nodes.remove('')

    summary_nodes = str(request.args.get("summaries"))
    summary_nodes = summary_nodes.split(";")
    if '' in summary_nodes:
        summary_nodes.remove('')

    summaries = []

    for i, n in enumerate(nodes):
        if "generate" in n:
            i = int(n[0])
            if i == 0:
                topic = nodes[0]
            else:
                topic = nodes[i][1:]

            topics = perform_topics(topic)

            topics = list(map(lambda x: str(i) + x, topics))

            nodes.extend(topics)

            new_url = "mindmap?topics="

            for n in nodes:
                if "generate" not in n:
                    new_url += n + ";"

            new_url = new_url + '&summaries='

            for s in summary_nodes:
                new_url += s + ';'

            return redirect(new_url)
        else:
            s = "Clique em '+' para adicionar um resumo aqui!"

            if str(i) in summary_nodes:
                if i == 0:
                    topic = nodes[i]
                else:
                    topic = nodes[i][1:]
                s = perform_summary(topic)

            summaries.append(s)

    links = get_links(nodes[0], _google_search)

    return render_template("/dorahMindMap/mindmap.html", nodes=nodes, summaries=summaries, links=links)


@bp.route("/flashcards")
def flashcard():
    flashcards = []
    return render_template(
        "/flashcardViewer/flashcardviewer.html", flashcards=flashcards
    )


@bp.route("/login")
def open_login():
    return render_template("/dorahLogin/login.html")

def logar(email,senha):
    lista = read_usuario()
    for user in lista:
        if user["email"]==email and user["senha"]==senha:
            return user["id"]
    return "Email ou senha incorretos"


@bp.route("/hello")
def hello():
    return "<h2>Hello, World!</h2>"


@bp.route("/cadastro")
def cadatro():
    return render_template("/dorahSignUp/signup.html")

@bp.route("/cadastrar",methods=['POST'])
def cadastrar():
    email=request.get_json()
    print(type(email),email)
    return request
    

@bp.route("/<path:path>")
def public(path):
    return send_from_directory("public", path)
