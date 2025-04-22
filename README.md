# Tecsomobi Challenge - Gestor de Usuários

Este repositório apresenta minha solução para o desafio técnico da vaga de Desenvolvedor FullStack da **Tecsomobi**.

## 📚 Visão Geral

O projeto é um **gestor de usuários** com backend em **Node.js + Express** e dois frontends distintos: um com **MUI** e outro com **Ant Design (Antd)**, ambos construídos com **React + Vite + TypeScript**. O repositório está organizado como um **monorepo** utilizando **npm workspaces**.

---

## 🧠 Funcionalidades

### 🚀 Backend (Express + TypeScript)

- ✅ CRUD completo de usuários (Criar, Listar, Atualizar, Remover)
- ✅ Paginação de resultados
- ✅ Validação de dados com [Zod](https://zod.dev/)
- ✅ Tratamento centralizado de erros
- ✅ Estrutura modular com separação de responsabilidades (`services`, `models`, `routes`, etc.)

### 🎨 Frontends (MUI & Ant Design)

- ✅ Listagem de usuários com dados paginados
- ✅ Cadastro e edição de usuários
- ✅ Exclusão com confirmação
- ✅ Validação de formulários com [Zod](https://zod.dev/)
- ✅ Integração com API REST via `fetch`

---

## 📦 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Material UI (MUI)](https://mui.com/)
- [Ant Design (Antd)](https://ant.design/)
- [Zod](https://zod.dev/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Node.js v16 ou superior
- npm ou yarn

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/lemuelsousa/tecsomobi-challenge.git
cd tecsomobi-challenge
```

2. Instale as dependências com o npm:

```bash
npm install
```

3. Inicie os projetos:

```bash
npm run build

# Inicia backend, mui-frontend e antd-frontend simultaneamente
npm run start:all
```



> Ou, para iniciar individualmente:
>
> ```bash
> npm run start:backend
> npm run dev:mui
> npm run dev:antd
> ```

4. Acesse:
   - Backend: `http://localhost:3000/api/users`
   - MUI Frontend: `http://localhost:5173`
   - Antd Frontend: `http://localhost:5174`

---

## 📁 Estrutura do Projeto

```
tecsomobi-challenge/
├── backend/           # API Express
├── mui-frontend/      # Interface com Material UI
├── antd-frontend/     # Interface com Ant Design
├── package.json       # Configuração principal com workspaces
└── ...
```

---

## 🔧 Melhorias Futuras

- [x] Configurar estrutura monorepo com npm workspaces
- [ ] Adicionar testes automatizados
- [ ] Dockerizar o ambiente
- [ ] CI/CD com GitHub Actions

---

## 👤 Autor

Desenvolvido por [**Lemuel de Sousa**](https://github.com/lemuelsousa)