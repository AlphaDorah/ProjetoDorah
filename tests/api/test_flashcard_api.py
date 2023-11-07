from flask import Flask
from flask.testing import FlaskClient
from unittest.mock import patch

from src.dorahLLM.flashcard.flashcard import Flashcard
from src.dorahLLM.flashcard.flashcardgenerator import MaritalkFlashcardGenerator
from src.dorahLLM.flashcard.textprocessor import MaritalkProcessor


def test_mocked_generate_flashcards():
    m = [Flashcard("Question", "Answer")]
    with patch.object(MaritalkFlashcardGenerator, "generate", return_value=m) as mock:
        generator = MaritalkFlashcardGenerator()
        processor = MaritalkProcessor("Summary")
        summary = processor.clean_text()
        flashcards = generator.generate(summary)
        assert mock.call_count == 1
        assert flashcards == [Flashcard("Question", "Answer")]


@patch.object(
    MaritalkFlashcardGenerator,
    "generate",
    return_value=[Flashcard("Question", "Answer")],
)
def test_generate_flashcards(app: Flask, client: FlaskClient):
    m = {"summary": "Summary"}
    with app.test_request_context("/api/generate/flashcard", method="POST", json=m):
        response = client.post("/api/generate/flashcard", json=m)
        assert response.status_code == 200
        flashcards = response.get_json()
        assert flashcards == [{"question": "Question", "answer": "Answer"}]


@patch.object(
    MaritalkFlashcardGenerator,
    "generate",
    return_value=[Flashcard("Question", "Answer")],
)
def test_generate_flashcards_missing_summary(app: Flask, client: FlaskClient):
    m = {}
    with app.test_request_context("/api/generate/flashcard", method="POST", json=m):
        response = client.post("/api/generate/flashcard", json=m)
        assert response.status_code == 400
