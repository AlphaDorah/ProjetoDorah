"""
Utilizar:

`python -m integration.test_flashcardgenerator_maritalk`

Para executar o teste de integração:

`integration/test_flashcardgenerator_maritalk.py`
"""

from abc import ABC, abstractmethod
import random
import string
from langchain.prompts import PromptTemplate
from src.dorahLLM.flashcard.flashcard import Flashcard

from src.dorahLLM.maritalkllm import MariTalkLLM
from langchain.chains import LLMChain
from langchain.llms.base import LLM


class FlashcardGenerator(ABC):
    @abstractmethod
    def __init__(self, model, template: str):
        pass

    @abstractmethod
    def generate(self) -> str:
        pass


def random_text(size):
    return "".join(
        random.choice(string.ascii_uppercase + string.digits) for _ in range(size)
    )


class MaritalkFlashcardGenerator(FlashcardGenerator):
    def __init__(self, model: LLM = MariTalkLLM(), template="maritalk_flashcard"):
        self.template = PromptTemplate.from_template(self._load_template(template))
        self.model = model
        self.chain = LLMChain(prompt=self.template, llm=self.model)

    def generate(self, summary: str) -> list[Flashcard]:
        random_number_of_flashcards = random.randint(3, 5)
        questions = [
            random_text(random_number_of_flashcards)
            for _ in range(random_number_of_flashcards)
        ]
        answers = [
            random_text(random_number_of_flashcards)
            for _ in range(random_number_of_flashcards)
        ]

        flashcards = []
        for i in range(len(questions)):
            flashcards.append(Flashcard(questions[i], answers[i]))
        return flashcards
        res = self.chain(inputs={"summary": summary})
        return self._parse_flashcards(res["text"])

    def _parse_flashcards(self, text: str) -> list[Flashcard]:
        print(text)
        flashcards = []
        lines = text.split("\n")
        questions = []
        answers = []
        for line in lines:
            if line.startswith("Pergunta: "):
                questions.append(line.removeprefix("Pergunta: "))
            elif line.startswith("Resposta: "):
                answers.append(line.removeprefix("Resposta: "))

        if len(questions) == len(answers):
            for i in range(len(questions)):
                flashcards.append(Flashcard(questions[i], answers[i]))
        return flashcards

    def _load_template(self, template: str) -> str:
        with open("./src/dorahLLM/flashcard/res/" + template + ".txt") as f:
            template = f.read()
        return template
