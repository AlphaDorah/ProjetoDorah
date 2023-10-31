from src.dorahLLM.flashcard.textprocessor import MaritalkProcessor


def test_clean_text():
    processor = MaritalkProcessor("This is a\n\ntest")
    cleaned_text = processor.clean_text()
    assert cleaned_text == "This is a test"

    processor = MaritalkProcessor("Another\ntest\n\nwith\n\nmultiple\n\nnewlines")
    cleaned_text = processor.clean_text()
    assert cleaned_text == "Another test with multiple newlines"

    processor = MaritalkProcessor(
        "    This is a test with leading and trailing whitespaces    "
    )
    cleaned_text = processor.clean_text()
    assert cleaned_text == "This is a test with leading and trailing whitespaces"
