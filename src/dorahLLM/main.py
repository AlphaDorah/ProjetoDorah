import os
from maritalk.model import MariTalk

if __name__ == "__main__":
    model = MariTalk(os.environ["MARITALK_KEY"])

    answer = model.generate("Quanto é 25 + 27?")

    print(answer)
