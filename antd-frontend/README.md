# Sobre o projeto

Este é um projeto frontend criado com **Vite + React + TypeScript** utilizando o **Ant Design** como biblioteca de componentes visuais. O objetivo do sistema é permitir o cadastro e listagem de usuários com integração a uma API REST.

## ✨ Funcionalidades

- ✅ Listagem de usuários
- ✅ Cadastro de novos usuários
- ✅ Botões para edição e exclusão (em desenvolvimento)
- ✅ Integração com API REST via `fetch`

## 📦 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design (Antd)](https://ant.design/)
- [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── UserForm.tsx       # Formulário de cadastro de usuários
│   └── UserTable.tsx      # Tabela de listagem de usuários
├── service/
│   └── userService.ts     # Lógica para chamadas HTTP (GET/POST)
├── pages/
│   └── UserPage.tsx       # Componente principal que integra a tabela e o formulário
├── App.tsx
└── main.tsx
```

## 🔧 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/lemuelsousa/tecsomobi-challange
cd tecsomobi-challange/antd-frontend
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse no navegador:

```
http://localhost:5173
```

## 🚧 Melhorias Futuras

- [ ] Implementar a exclusão de usuários
- [ ] Implementar edição de dados
- [ ] Adicionar paginação na tabela
- [ ] Validação mais robusta no formulário

## 🧑‍💻 Autor

Feito por [Lemuel de Sousa](https://github.com/lemuelsousa/)

---

```
