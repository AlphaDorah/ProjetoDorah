from abc import ABC, abstractmethod


class TextProcessor(ABC):
    @abstractmethod
    def __init__(self, text):
        """
        Initializes the text processor

        Parameters:
            text (str): The text to process

        Returns:
            None
        """
        pass

    @abstractmethod
    def clean_text(self) -> str:
        """
        This method is responsible for cleaning the text.

        Returns:
            str: The cleaned text.
        """
        pass


class MaritalkProcessor(TextProcessor):
    def __init__(self, text: str):
        self.text = text

    def clean_text(self) -> str:
        cleaned_text = self.text.replace("\n", " ")
        cleaned_text = cleaned_text.strip()
        cleaned_text = " ".join(cleaned_text.split())

        return cleaned_text
