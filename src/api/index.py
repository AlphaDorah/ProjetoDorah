from flask import (
    Blueprint,
    send_file,
    send_from_directory,
    request,
    render_template
)

bp = Blueprint("index", __name__, url_prefix="/")


@bp.route("/")
def index():
    return send_file("public/dorahHome/home.html")


@bp.route("/mindmap")
def generate_map():
    topic = str(request.args.get('topic'))

    return render_template('/dorahMindMap/mindmap.html', topic=topic)


@bp.route("/login")
def open_login():
    return render_template('/dorahLogin/login.html')


@bp.route("/hello")
def hello():
    return "<h2>Hello, World!</h2>"


@bp.route("/<path:path>")
def public(path):
    return send_from_directory("public", path)
