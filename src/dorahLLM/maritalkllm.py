import os
from typing import Any, List, Mapping, Optional

from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.callbacks.manager import CallbackManagerForLLMRun
from langchain.llms.base import LLM
from langchain.llms.utils import enforce_stop_tokens
from maritalk.model import MariTalk


class MariTalkLLM(LLM):
    pipeline: MariTalk = MariTalk(key="109375944891660204854$5af0b73347399d7279473dcd12dd0474890446c7f8d1d04e7dfe9114794fc9b6")

    @property
    def _llm_type(self) -> str:
        """Return type of llm."""
        return "maritalk"

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ):
        if stop is None:
            text: str | None = self.pipeline.generate(
                prompt,
                chat_mode=False,
                stopping_tokens=["\n"],
            )
        else:
            text: str | None = self.pipeline.generate(
                prompt,
                chat_mode=False,
                stopping_tokens=stop,
            )

        if text is None:
            raise ValueError("Could not generate text")

        if stop is not None:
            text = enforce_stop_tokens(text, stop)

        return text

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        """Get the identifying parameters."""
        return {"model": "maritalk"}


if __name__ == "__main__":
    print("Testing MariTalkLLM")
    template = """ 
Hey llama, you like to eat quinoa. Whatever question I ask you, you reply with "Waffles, waffles, waffles!".
Question: {input}
Answer:"""  # noqa: E501
    prompt = PromptTemplate(template=template, input_variables=["input"])

    model = MariTalkLLM()

    chain = LLMChain(prompt=prompt, llm=model)

    print("Who is Princess Momo?")
    chain("Who is Princess Momo?")
    print("What is the meaning of life?")
    chain("What is the meaning of life?")
