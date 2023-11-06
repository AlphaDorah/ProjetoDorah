from flask import (
    Blueprint,
    jsonify,
    request,
    send_file,
    send_from_directory,
)
from src.dorahLLM.flashcard.flashcard import Flashcard

from src.dorahLLM.flashcard.flashcardgenerator import MaritalkFlashcardGenerator
from src.dorahLLM.flashcard.textprocessor import MaritalkProcessor


bp = Blueprint("generate", __name__, url_prefix="/api/generate")


@bp.route("/")
def index():
    return b"<h2>Hello, World!</h2>"


@bp.route("/flashcard", methods=["POST"])
def generate_flashcards():
    """
    Generates flashcards based on a summary provided in the request body.

    Parameters:
        None

    Returns:
        A list of dictionaries representing the generated flashcards.
        Each dictionary contains the flashcard's attributes, including the question and answer.
    """
    summary_raw: str = request.get_json()["summary"]
    if not summary_raw:
        return jsonify({"error": "Missing summary"}), 400
    generator = MaritalkFlashcardGenerator()
    processor = MaritalkProcessor(summary_raw)
    summary = processor.clean_text()
    flashcards: list[Flashcard] = generator.generate(summary)
    return [flashcard.to_dict() for flashcard in flashcards], 200
