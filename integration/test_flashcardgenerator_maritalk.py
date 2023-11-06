from src.dorahLLM.flashcard.flashcardgenerator import MaritalkFlashcardGenerator

if __name__ == "__main__":
    instance = MaritalkFlashcardGenerator()
    summary = "As plantas são seres pluricelulares e eucariontes. Nesses aspectos elas são semelhantes aos animais e a muitos tipos de fungos; entretanto, têm uma característica que as distingue desses seres - são autotróficas. Como já vimos, seres autotróficos são aqueles que produzem o próprio alimento pelo processo da fotossíntese. Utilizando a luz, ou seja, a energia luminosa, as plantas produzem a glicose, matéria orgânica formada a partir da água e do gás carbônico que obtêm do alimento, e liberam o gás oxigênio."
    result = instance.generate(summary)

    print(result)
