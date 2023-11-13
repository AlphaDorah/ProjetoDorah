from src.dorahLLM.maritalk_topics import generate_topics_from_text


if __name__ == "__main__":
    text = """ As Cortes Gerais e Extraordinárias da Nação Portuguesa, instaladas em 1820, como consequência da Revolução Liberal do Porto, tomam decisões, a partir de 1821, que tinham como objetivo reduzir a autonomia adquirida pelo Brasil, o que na prática o faria retornar ao seu antigo estatuto colonial.
        Em 1807, o exército francês invadiu o Reino de Portugal, que se recusava a participar do bloqueio continental contra o Reino Unido. Incapaz de resistir ao ataque, a família real e o governo português fugiram para o Brasil, que era então a mais rica e desenvolvida das colônias portuguesas. Porém, em 1820, a revolução liberal eclodiu em Portugal e a família real foi forçada a retornar a Lisboa. Antes de deixar o Brasil, no entanto, o agora Rei D. João VI nomeou o seu filho mais velho, D. Pedro de Alcântara de Bragança, como Príncipe Regente do Brasil (1821).  Oficialmente, a data comemorada para independência do Brasil é de 7 de setembro de 1822, ocasião em que ocorreu o evento conhecido como o Grito do Ipiranga, às margens do riacho Ipiranga na cidade de São Paulo. Em 12 de outubro de 1822, o príncipe foi aclamado D. Pedro I, Imperador do Brasil, sendo coroado e consagrado em 1º de dezembro de 1822, e o país passou a ser conhecido como o Império do Brasil.
        """
    topics = generate_topics_from_text(text)
    print(topics)
    print(f"Tamanho: {len(topics)}")
