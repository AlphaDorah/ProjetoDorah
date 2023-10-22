## Testes

### Testes de unidade

Os testes de unidade serão feitos utilizando o `pytest`. Para executar os testes, basta executar o comando:

```bash
pytest
```

Cada membro da equipe ficará responsável por testar uma parte do sistema. Os testes serão feitos através de funções de teste, onde cada membro irá criar uma função de teste para cada função que ele implementar.

Abaixo segue um exemplo de teste de unidade:

```python
def test_soma():
    assert soma(1, 2) == 3
```

### Testes de integração

Os testes de integração serão feitos manualmente e serão divididos entre os membros da equipe. Cada membro ficará responsável por testar uma parte do sistema. Os testes serão feitos através de um checklist, onde cada membro irá preencher com o resultado do teste com o código `OK` ou `FAIL`.

### Checklist

| Teste | Gabriel | Éric | Rafael | Anna | Amanda | William |
| ----- | ------- | ---- | ------ | ---- | ------ | ------- |
| 1     | FAIL    |      |        |      |        |         |
| 2     | FAIL    |      |        |      |        |         |
| 3     | FAIL    |      |        |      |        |         |

### Gabriel

#### Testes de unidade

1. Testar rotas de html
2. Testar rotas de APIs para geração do Mapa
3. Testar rotas de API para logar

#### Testes de integração

1. Testar integração entre a API e o banco de dados para salvar os mapas gerados
2. Testar integração entre a API e o banco de dados para cadastro de usuários
3. Testar integração entre a API e o banco de dados para login

### Éric

#### Testes de unidade

1. Testar formatação de pesquisa do google search
2. Testar saida incorreta de tópicos da LLM

#### Testes de integração

1. Teste entre api e LLM

### Rafael

#### Testes de unidade

1. Testar formatação de pesquisa da wikipedia
2. Testar possiveis erros na pesquisa do google
3. Testar possiveis erros na pesquisa da wikipedia

#### Testes de integração

### Anna

#### Testes de unidade

1. Testar saida do resumo da LLM
2. Testar saida dos tópicos da LLM
3. Testar quantidade da saida dos tópicos da LLM

#### Testes de integração

### Amanda

#### Testes de unidade

#### Testes de integração

1. Teste entre a LLM e os mecanismos de pesquisa
2. Teste de integração entre a api e o banco de dados para salvar os mapas
3. Teste de integração entre a api e o banco de dados para cadastro de usuários

### William

#### Testes de unidade

#### Testes de integração

1. Teste entre a visualização e a api para controladores da página
2. Teste entre a geração da LLM em conjunto com a api e o HTML
3. Teste entre as rotas e as páginas através da API
