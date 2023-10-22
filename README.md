# ProjetoDorah

Este é um projeto de um programa web que visa tornar a rotina de estudos algo simplificado. Dado um determinado tema, fornecido pelo usuário, ele irá retornar um texto com determinadas palavras-chaves relevantes, além de sugestões de outros temas a serem estudados, criando assim um mapa mental. Este mapa será configurável, tomando a forma que o usuário desejar com apenas um clique.

## Funcionalidades

- Geração de mapa mental baseado em um tema fornecido pelo usuário
- Geração de Flashcards baseado no mapa mental gerado
- Busca de dados no Google e Wikipedia
- Interface para visualização e edição do mapa gerado
- Cadastro de usuários para salvar mapas gerados
- Salvar mapas gerados em um banco de dados

## Requisitos

- Python 3.6 ou superior
- Pip

## Instalação

1. Clone o repositório

```bash
git clone https://github.com/faduzin/ProjetoDorah.git
cd ProjetoDorah
```

2. Instale as dependências

```bash
pip install -r requirements.txt
```

3. Execute o programa

```bash
python app.py
```

4. Acesse o programa pelo navegador

```bash
http://localhost:5000/
```

## Testes

### Gabriel

1. Testar rotas de html
2. Testar rotas de APIs para geração do Mapa
3. Testar rotas de API para logar
4. Testar rotas de API para cadastro de usuário

### Éric

1. Testar formatação de pesquisa do google search
2. Testar saida incorreta de tópicos da LLM
3. _Integração:_ Teste entre api e LLM

### Rafael

1. Testar formatação de pesquisa da wikipedia
2. Testar possiveis erros na pesquisa do google
3. Testar possiveis erros na pesquisa da wikipedia

### Anna

1. Testar saida do resumo da LLM
2. Testar saida dos tópicos da LLM
3. Testar quantidade da saida dos tópicos da LLM

### Amanda

1. _Integração:_ Teste entre a LLM e os mecanismos de pesquisa
2. _Integração:_ Teste de integração entre a api e o banco de dados para salvar os mapas
3. _Integração:_ Teste de integração entre a api e o banco de dados para cadastro de usuários

### William

1. _Integração:_ Teste entre a visualização e a api para controladores da página
2. _Integração:_ Teste entre a geração da LLM em conjunto com a api e o HTML
3. _Integração:_ Teste entre as rotas e as páginas através da API
