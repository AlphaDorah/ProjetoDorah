from flask import (
    Blueprint,
    send_file,
    send_from_directory,
    request,
    render_template,
    redirect,
)

from src.dorahLLM.maritalk_summary import perform_topics

bp = Blueprint("index", __name__, url_prefix="/")


@bp.route("/")
def index():
    return send_file("public/dorahHome/home.html")


@bp.route("/mindmap")
def generate_map():
    nodes = str(request.args.get("topics"))
    nodes = nodes.split(";")

    for n in nodes:
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

            new_url = new_url[:-1]

            return redirect(new_url)

    return render_template("/dorahMindMap/mindmap.html", nodes=nodes)


@bp.route("/login")
def open_login():
    return render_template("/dorahLogin/login.html")


@bp.route("/cadastro")
def hello():
    return render_template("/dorahSignUp/signup.html")


@bp.route("/<path:path>")
def public(path):
    return send_from_directory("public", path)
