# OctoBusca

Este é um projeto client-side construído em React, utilizando react-router, Typescript e Bootstrap para criar uma aplicação que consulta a API do GitHub para mostrar os repositórios mais populares de um determinado usuário.

## Funcionalidades

### Tela Inicial (HomeScreen)

Permite buscar por um usuário do GitHub.

### Tela do Usuário (UserScreen)

Exibe os detalhes do usuário buscado, incluindo o número de seguidores, número de seguidos, imagem do avatar, e-mail, biografia, etc.

Lista os repositórios desse usuário, ordenados pelo número decrescente de estrelas por padrão. A lista de repositórios pode ser ordenada por mais e menos estrelas, observadores ou forks.

### Tela do Repositório (RepoScreen)

Apresenta detalhes de um repositório, incluindo nome, descrição, número de estrelas, linguagem e um link externo para a página do repositório no GitHub.

Pode ser acessado clicando na listagem dos repositórios na tela anterior (UserScreen).

## Organização do Projeto

O projeto segue uma estrutura organizada para facilitar o desenvolvimento e manutenção. A documentação detalhada sobre a estrutura do projeto, bem como o controle de versão, pode ser encontrada nos arquivos específicos.

## Consumo de APIs

As APIs utilizadas no projeto são:

- Detalhes de um usuário: `https://api.github.com/users/{username}`
- Repositórios de um usuário: `https://api.github.com/users/{username}/repos`
- Detalhes de um repositório: `https://api.github.com/repos/{full_name}` *

\* Esta última se mostrou redundante no final do desenvolvimento da conexão com a API.
