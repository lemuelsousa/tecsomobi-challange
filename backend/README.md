# API de Gerenciamento de Usuários

Uma API REST para gerenciamento de usuários utilizando Node.js, Express, TypeScript e SQLite.

## Funcionalidades

- CRUD completo de usuários (Criar, Listar, Atualizar, Deletar)
- Paginação na listagem de usuários
- Validação de dados com Zod
- Tratamento centralizado de erros
- Estrutura modular (services, models, rotas, etc.)

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- SQLite (via better-sqlite3)
- Zod (para validação de dados)

## Como começar

### Pré-requisitos

- Node.js v18 ou superior
- npm

### Instalação

```bash
npm install
```

### Executando o projeto

```bash
npm run dev
```

A API será iniciada em: `http://localhost:3000`

## Endpoints

| Método | Endpoint         | Descrição              |
|--------|------------------|------------------------|
| GET    | api/users           | Lista usuários (paginado) |
| GET    | api/users/:id       | Busca usuário por ID   |
| POST   | api/users           | Cria novo usuário      |
| PUT    | api/users/:id       | Atualiza usuário       |
| DELETE | api/users/:id       | Deleta usuário         |

## Pontos de melhorias

- Adicionar tests unitários, de integração e e2e
- Configurar docker
- Implementar `bcrypt` ou similar para criptografia das senhas dos usuários.
- O banco de dados é salvo no arquivo `./db.sqlite` na raiz do projeto.