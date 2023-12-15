import logging
from typing import Optional
from flask import Flask


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


logging.basicConfig(
    level=logging.INFO,
    format=f"{bcolors.OKGREEN}%(asctime)s - %(name)s - %(levelname)s:{bcolors.ENDC}  %(message)s",
)

logger = logging.getLogger("Dorah")


def create_app(config_filename: Optional[str] = None):
    app = Flask(__name__, template_folder="./public")
    app.config.from_pyfile(config_filename) if config_filename else None

    from src.api.index import bp as index_bp

    from src.api.generate import bp as generate_bp

    app.register_blueprint(index_bp)
    app.register_blueprint(generate_bp)

    return app


if __name__ == "__main__":
    logger.info("Iniciando Dorah")
    app = create_app()

    app.run(debug=True)
