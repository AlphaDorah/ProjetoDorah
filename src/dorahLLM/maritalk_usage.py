import os
from maritalk.model import MariTalk

if __name__ == "__main__":
    model = MariTalk(os.environ["MARITALK_KEY"])

    prompt = """Classifique a resenha de filme como "positiva" ou "negativa".

    Resenha: Gostei muito do filme, é o melhor do ano!
    Classe: positiva

    Resenha: O filme deixa muito a desejar.
    Classe: negativa

    Resenha: Apesar de longo, valeu o ingresso..
    Classe:"""

    answer: str | None = model.generate(
        prompt,
        chat_mode=False,
        do_sample=False,
        max_tokens=20,
        stopping_tokens=["\n"],
    )

    if not answer:
        print("Resposta não encontrada")
        exit(1)

    print(f"Resposta: {answer.strip()}")  # Deve imprimir "positiva"
