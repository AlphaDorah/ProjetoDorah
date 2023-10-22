# Contribuindo com o projeto

# Directrizes de contribuição

## Introdução

Obrigado por considerar contribuir para o nosso projeto! Este documento descreve as directrizes para contribuir para o nosso projeto. Por favor, leia-o cuidadosamente antes de fazer qualquer contribuição.

## Começar

Antes de contribuir, por favor certifique-se que leu o ficheiro README.md e o ficheiro TESTS.md. Estes ficheiros contêm informação importante sobre o projeto e como correr testes.

## Estrutura de ficheiros

O projeto segue a seguinte estrutura de arquivos:

    ```
    ProjetoDorah/
    ├── app.py
    ├── README.md
    ├── HELP.md
    ├── TESTS.md
    ├── CONTRIBUTING.md
    ├── requirements.txt
    ... (outros ficheiros e pastas)
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── dorahLLM/
    │   ├── dorahSearch/

    ```

## Branches

O projeto tem duas branches principais: `main` e `dev`. A branch `main` contém o código estável e a branch `dev` contém o código em desenvolvimento. Para contribuir, por favor crie uma branch a partir da branch `dev` e faça um pull request para a branch `dev`.
As branches devem ser nomeadas da seguinte forma:

    ```
    <tipo>/<nome>
    ```

Onde `<tipo>` pode ser `feature`, `bugfix`, `hotfix` ou `release` e `<nome>` é o nome da branch.

Caso não saiba como criar uma branch, por favor leia o ficheiro HELP.md.

## Commits

Os commits devem ser feitos de forma a que seja fácil perceber o que foi feito. Para isso, os commits devem seguir o seguinte formato:

    ```
    <tipo>: <mensagem>
    ```

Onde `<tipo>` pode ser `feature`, `bugfix`, `hotfix` ou `release` e `<mensagem>` é uma mensagem curta e descritiva sobre o que foi feito.

Caso não saiba como fazer um commit, por favor leia o ficheiro HELP.md.

## Pull Requests

Os pull requests devem ser feitos de forma a que seja fácil perceber o que foi feito. E devem seguir o mesmo formato dos commits. Além disso, os pull requests devem ser feitos para a branch `dev`.

Caso não saiba como fazer um pull request, por favor leia o ficheiro HELP.md.

## Testes

Os testes devem ser feitos de acordo com o ficheiro TESTS.md. Por favor, leia-o antes de fazer qualquer teste.

## Documentação

A documentação deve ser escrita em português dentro do código. Para documentar o código, deve ser usado o formato docstring do Python. Para mais informações sobre docstrings, por favor leia o ficheiro HELP.md.
