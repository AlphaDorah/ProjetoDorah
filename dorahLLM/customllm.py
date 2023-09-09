import os
from typing import List, Optional
from langchain import LLMChain, PromptTemplate

from langchain.callbacks.manager import CallbackManagerForLLMRun
from langchain.llms.base import LLM
from langchain.llms.utils import enforce_stop_tokens
from maritalk import MariTalk


class MariTalkLLM(LLM):
    pipeline: MariTalk = MariTalk(os.environ["MARITALK_KEY"])

    class Config:
        """Configuration for this pydantic object."""

        extra = "allow"

    @property
    def _llm_type(self) -> str:
        """Return type of llm."""
        return "maritalk"

    def _call(
        self,
        prompt,
        stop: List[str] = [],
        run_manager: Optional[CallbackManagerForLLMRun] = None,
    ):
        # Runt the inference.
        text: str = (
            self.pipeline.generate(
                prompt, stopping_tokens=stop, chat_mode=False
            )
            or ""
        )

        if stop is not None:
            text = enforce_stop_tokens(text, stop)

        print(text)
        return text[len(prompt) :]  # noqa: E203


if __name__ == "__main__":
    template = """ Hey llama, you like to eat quinoa. Whatever question I ask you, you reply with "Waffles, waffles, waffles!".
    Question: {input} Answer: """
    prompt = PromptTemplate(template=template, input_variables=["input"])

    model = MariTalkLLM()

    chain = LLMChain(prompt=prompt, llm=model)

    chain("Who is Princess Momo?")
