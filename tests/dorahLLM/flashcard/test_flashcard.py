from src.dorahLLM.flashcard.flashcard import Flashcard


def test_flashcard_creation():
    card = Flashcard("What is the capital of Brazil?", "Brasília")
    assert card.question == "What is the capital of Brazil?"
    assert card.answer == "Brasília"


def test_flashcard_str_representation():
    card = Flashcard("What is the capital of Brazil?", "Brasília")
    assert str(card) == "Question: What is the capital of Brazil?\nAnswer: Brasília"


def test_flashcard_repr_representation():
    card = Flashcard("What is the capital of Brazil?", "Brasília")
    assert (
        repr(card)
        == "Flashcard(question=What is the capital of Brazil?, answer=Brasília)"
    )


def test_flashcard_equality():
    card1 = Flashcard("What is the capital of Brazil?", "Brasília")
    card2 = Flashcard("What is the capital of Brazil?", "Brasília")
    card3 = Flashcard("What is the capital of Argentina?", "Buenos Aires")
    assert card1 == card2
    assert card1 != card3


def test_flashcard_hash():
    card1 = Flashcard("What is the capital of Brazil?", "Brasília")
    card2 = Flashcard("What is the capital of Brazil?", "Brasília")
    card3 = Flashcard("What is the capital of Argentina?", "Buenos Aires")
    assert hash(card1) == hash(card2)
    assert hash(card1) != hash(card3)
