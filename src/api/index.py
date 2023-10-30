from flask import (
    Blueprint,
    send_file,
    send_from_directory,
    request,
    render_template
)

from src.dorahLLM.maritalk_summary import perform_topics

bp = Blueprint("index", __name__, url_prefix="/")


@bp.route("/")
def index():
    return send_file("public/dorahHome/home.html")


@bp.route("/mindmap")
def generate_map():
    theme = str(request.args.get('topic'))

    topics = perform_topics(theme)

    print(topics)

    return render_template('/dorahMindMap/mindmap.html', theme=theme, topics=topics)


@bp.route("/login")
def open_login():
    return render_template('/dorahLogin/login.html')


@bp.route("/hello")
def hello():
    return "<h2>Hello, World!</h2>"


@bp.route("/<path:path>")
def public(path):
    return send_from_directory("public", path)
