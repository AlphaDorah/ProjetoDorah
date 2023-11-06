from typing import Any


class Flashcard:
    def __init__(self, question: str, answer: str):
        self.question = question
        self.answer = answer

    def __str__(self) -> str:
        return f"Question: {self.question}\nAnswer: {self.answer}"

    def __repr__(self) -> str:
        return f"Flashcard(question={self.question}, answer={self.answer})"

    def __eq__(self, other: Any) -> bool:
        if not isinstance(other, Flashcard):
            return False
        return self.question == other.question and self.answer == other.answer

    def __hash__(self) -> int:
        return hash((self.question, self.answer))

    def to_json(self) -> dict:
        return {
            "question": self.question,
            "answer": self.answer,
        }

    def to_dict(self) -> dict:
        return {
            "question": self.question,
            "answer": self.answer,
        }
