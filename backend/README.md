# API de Gerenciamento de Usuários

Uma API REST para gerenciamento de usuários utilizando Node.js, Express, TypeScript e SQLite.

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- SQLite
- Zod

## Como começar

### Pré-requisitos

- Node.js v16 ou superior
- npm

### Instalação

```bash
npm install
```

### Executando o projeto

```bash
npm run build
npm run start
npm run seed # Popula o banco de dados (Opicional)
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

- [ ] Adicionar tests unitários, de integração e e2e
- [ ] Configurar docker
- [ ] Implementar `bcrypt` ou similar para criptografia das senhas dos usuários.
