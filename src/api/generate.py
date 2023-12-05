import logging
from flask import (
    Blueprint,
    jsonify,
    request,
)
from src.dorahLLM.flashcard.flashcard import Flashcard
from src.dorahLLM.flashcard.flashcard_summary import FlashcardSummarizer

from src.dorahLLM.flashcard.flashcardgenerator import MaritalkFlashcardGenerator
from src.dorahLLM.flashcard.textprocessor import MaritalkProcessor
from src.dorahLLM.maritalk_summary import perform_summary, perform_topics
from src.dorahSearch.google_api import get_links, _google_search
import random
import string
import os

logger = logging.getLogger(__name__)

bp = Blueprint("generate", __name__, url_prefix="/api/generate")


@bp.route("/")
def index():
    return b"<h2>Hello, World!</h2>"


def random_text(size):
    """
    Generates a random string of specified size.

    Args:
        size (int): The size of the random string to be generated.

    Returns:
        str: A randomly generated string consisting of uppercase letters and digits.
    """
    return "".join(
        random.choice(string.ascii_uppercase + string.digits) for _ in range(size)
    )


@bp.route("/map/<theme>")
def generate_map(theme):
    """
    Generates a mindmap based on a theme provided in the query.

    Parameters:
        None

    Returns:
        A dictionary containing the generated mindmap.
    """
    if theme is None:
        return jsonify({"error": "Missing theme"}), 400
    topics, summaries = generate_topics(theme)
    return jsonify({"topics": topics, "summaries": summaries}), 200


def generate_topics(theme):
    logger.info("Tema: %s", theme)
    logger.info("LLM: %s", os.environ.get("LLM") or "Random")
    if os.environ.get("LLM") == "maritalk":
        topics = perform_topics(theme)
        summaries = []
        for topic in topics:
            summaries.append(perform_summary(topic))
    else:
        random_number_of_topics = random.randint(5, 10)
        topics = [random_text(5) for _ in range(random_number_of_topics)]
        summaries = [random_text(5) for _ in range(random_number_of_topics)]

    return topics, summaries


@bp.route("/flashcard/summary")
def summary():
    """
    Generates a summary based on a term provided in the query.

    Parameters:
        None

    Returns:
        A dictionary containing the generated summary.
    """
    term = request.args.get("term")
    if term is None:
        return jsonify({"error": "Missing term"}), 400
    summary = generate_summary(term)
    return jsonify({"summary": summary}), 200


@bp.route("/summary/<theme>")
def summary_theme(theme):
    """
    Generates a summary based on a term provided in the query.

    Parameters:
        None

    Returns:
        A dictionary containing the generated summary.
    """
    summary = generate_summary(theme)
    return jsonify({"summary": summary}), 200


def generate_summary(term):
    if os.environ.get("LLM") == "maritalk":
        summary = FlashcardSummarizer().summary(term)
    else:
        summary = random_text(100)
    return summary


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
    flashcards = generate_flashcard()
    return jsonify([flashcard.to_dict() for flashcard in flashcards]), 200


def generate_flashcard():
    if os.environ.get("LLM") == "maritalk":
        summary_raw: str = request.get_json()["summary"]
        generator = MaritalkFlashcardGenerator()
        processor = MaritalkProcessor(summary_raw)
        summary = processor.clean_text()
        flashcards: list[Flashcard] = generator.generate(summary)
        return flashcards
    else:
        random_number_of_flashcards = random.randint(3, 5)
        questions = [random_text(5) for _ in range(random_number_of_flashcards)]
        answers = [random_text(5) for _ in range(random_number_of_flashcards)]

        flashcards = []
        for i in range(len(questions)):
            flashcards.append(Flashcard(questions[i], answers[i]))

        return flashcards


@bp.route("/links/<theme>")
def links(theme):
    if theme is None:
        return jsonify({"error": "Missing theme"}), 400
    links = generate_links(theme)
    return jsonify({"links": links}), 200


def generate_links(theme):
    if os.environ.get("LLM") == "maritalk":
        links = get_links(theme, _google_search)
    else:
        random_number_of_links = random.randint(3, 5)
        links = [
            random_text(random_number_of_links) for _ in range(random_number_of_links)
        ]
        links = ["https://" + link + ".com" for link in links]

    return links
