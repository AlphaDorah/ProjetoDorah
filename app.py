from typing import Optional
from flask import Flask


def create_app(config_filename: Optional[str] = None):
    app = Flask(__name__, template_folder='./public')
    app.config.from_pyfile(config_filename) if config_filename else None

    from src.api.index import bp as index_bp

    from src.api.generate import bp as generate_bp

    app.register_blueprint(index_bp)
    app.register_blueprint(generate_bp)

    return app


if __name__ == "__main__":
    app = create_app()

    app.run(debug=True)
