from flask import (
    Blueprint,
    send_file,
    send_from_directory,
)

bp = Blueprint("index", __name__, url_prefix="/")


@bp.route("/")
def index():
    return send_file("public/mind-map-page.html")


@bp.route("/hello")
def hello():
    return "<h2>Hello, World!</h2>"


@bp.route("/<path:path>")
def public(path):
    return send_from_directory("public", path)
