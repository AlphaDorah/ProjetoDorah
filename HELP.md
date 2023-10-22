# Ajuda para Contribuição

Este arquivo contém informações úteis para contribuir com o projeto.

## Criando uma Branch

Para criar uma branch, siga os seguintes passos:

1. Abra o terminal na pasta do projeto.
2. Digite o comando `git checkout dev` para mudar para a branch `dev`.
3. Digite o comando `git pull` para atualizar a branch `dev`. Este passo é opcional e só deve ser feito se você não atualizou a branch `dev` recentemente.
4. Digite o comando `git checkout -b <tipo>/<nome>` para criar uma nova branch a partir da branch `dev` e mudar para ela.
5. Substitua `<tipo>` pelo tipo de branch que você está criando (`feature`, `bugfix`, `hotfix` ou `release`) e `<nome>` pelo nome da sua branch.

## Fazendo Commits

Para fazer um commit em uma branch, siga os seguintes passos:

1. Abra o terminal na pasta do projeto.
2. Digite o comando `git add <arquivo>` para adicionar o arquivo que você modificou, normalmente quando você quer adicionar todos os arquivos você usa o comando `git add .`.
3. Digite o comando `git commit -m "<tipo>: <mensagem>"` para fazer o commit.
4. Substitua `<tipo>` pelo tipo de commit que você está fazendo (`feature`, `bugfix`, `hotfix` ou `release`) e `<mensagem>` por uma mensagem curta e descritiva sobre o que foi feito. Por exemplo, se você adicionou uma nova funcionalidade, você pode usar o comando `git commit -m "feature: adiciona nova funcionalidade"`.

## Fazendo Testes com Pytest

Para fazer testes com Pytest, siga os seguintes passos:

1. Abra o terminal na pasta do projeto.
2. Digite o comando `pip install pytest` para instalar o Pytest.
3. Digite o comando `pytest` para rodar os testes.

Para a criação de testes, siga os seguintes passos:

1. Escreva o teste em um arquivo com o nome `test_<nome>.py`, onde `<nome>` é o nome do arquivo que você quer testar.
2. Escreva o teste usando a sintaxe do Pytest. Ou seja, escreva uma função de teste com o nome `test_<nome>()`, onde `<nome>` é o nome da função que você quer testar.
3. Execute o comando `pytest` para rodar os testes.

## Fazendo um Pull Request

Para fazer um pull request, siga os seguintes passos:

1. Abra o terminal na pasta do projeto.
2. Digite o comando `git push origin <tipo>/<nome>` para enviar a sua branch para o repositório remoto. Aqui estamos assumindo que você já criou a sua branch localmente. Olhe a seção "Criando uma Branch" para mais informações. Aqui um exemplo de comando: `git push origin feature/nova-funcionalidade`.
3. Acesse o repositório no GitHub e clique no botão "Compare & pull request".
4. Verifique se as informações estão corretas e clique no botão "Create pull request". Aqui um exemplo de informações:
   - **base:** dev
   - **compare:** feature/nova-funcionalidade
5. Aguarde a revisão do seu pull request e faça as alterações necessárias caso o seu pull request seja rejeitado.

## Documentação

Para documentar o código, use o formato docstring do Python. Aqui um exemplo de docstring:

```python
def soma(a, b):
    """Soma dois números.

    Args:
        a (int): Primeiro número.
        b (int): Segundo número.

    Returns:
        int: Soma dos dois números.
    """
    return a + b
```

Nem todas as funções precisam ser documentadas. Documente apenas as funções que você achar necessário e que não sejam autoexplicativas. Documente também as classes e os módulos. Um módulo é um arquivo `.py` e uma classe é uma classe do Python. Aqui um exemplo de documentação de um módulo:

```python
"""Este é um módulo de exemplo.

Este módulo serve apenas para mostrar como documentar um módulo.
"""

def soma(a, b):
    """Soma dois números.

    Args:
        a (int): Primeiro número.
        b (int): Segundo número.

    Returns:
        int: Soma dos dois números.
    """
    return a + b
```

De preferência, use o tipagem de variáveis do Python. Aqui um exemplo de tipagem de variáveis:

```python
def soma(a: int, b: int) -> int:
    return a + b
```

Quando não achar necessário escrever o que a função faz, escreva apenas o que os parâmetros recebem e o que a função retorna usando a tipagem de variáveis.

## Ajuda Adicional

Para ajuda adicional, leia o ficheiro CONTRIBUTING.md ou entre em contato com os mantenedores do projeto.
