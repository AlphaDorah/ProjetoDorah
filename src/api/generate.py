from flask import (
    Blueprint,
    jsonify,
    request,
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

    if request.get_json().get("summary") is None:
        return jsonify({"error": "Missing summary"}), 400
    summary_raw: str = request.get_json()["summary"]
    generator = MaritalkFlashcardGenerator()
    processor = MaritalkProcessor(summary_raw)
    summary = processor.clean_text()
    flashcards: list[Flashcard] = generator.generate(summary)
    return jsonify([flashcard.to_dict() for flashcard in flashcards]), 200
