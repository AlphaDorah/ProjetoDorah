from flask import (
    Blueprint,
    send_file,
    send_from_directory,
)


bp = Blueprint("generate", __name__, url_prefix="/api/generate")


@bp.route("/")
def index():
    return "<h2>Hello, World!</h2>"
