from flask import (
    Blueprint,
    request,
    send_file,
    send_from_directory,
)


bp = Blueprint("generate", __name__, url_prefix="/api/generate")


@bp.route("/")
def index():
    return b"<h2>Hello, World!</h2>"
