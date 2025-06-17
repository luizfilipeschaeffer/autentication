# Autentication Boilerplate

Este projeto é um boilerplate completo de autenticação com Next.js (frontend) e Node.js/Express/PostgreSQL (backend), pronto para uso em aplicações modernas.

## Sumário
- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Banco de Dados](#banco-de-dados)
- [Scripts Principais](#scripts-principais)
- [Fluxo de Autenticação](#fluxo-de-autenticação)
- [Funcionalidades](#funcionalidades)
- [Como Rodar](#como-rodar)
- [Deploy](#deploy)

---

## Visão Geral
O projeto implementa um sistema de autenticação completo, com cadastro, login, dashboard protegida, logout, e integração segura entre frontend (Next.js) e backend (Express/PostgreSQL). Inclui UI moderna, proteção de rotas, JWT, hash de senha, e status de conexão com o banco.

## Tecnologias Utilizadas
- **Frontend:** Next.js 15, React 19, TailwindCSS, Lucide React
- **Backend:** Node.js, Express, PostgreSQL, pg, bcryptjs, jsonwebtoken, dotenv, cors
- **Banco:** PostgreSQL (compatível com Neon, Render, Supabase, local)

## Estrutura do Projeto
```
├── backend/
│   ├── db.js           # Conexão com o banco (pg)
│   ├── server.js       # Servidor Express (API)
│   ├── setup-db.js     # Script para criar/resetar o banco
│   ├── sql/
│   │   └── init.sql    # Schema e seed do banco
│   └── package.json    # Dependências backend
├── src/
│   └── app/
│       ├── login/      # Tela de login
│       ├── register/   # Tela de cadastro
│       ├── dashboard/  # Dashboard protegida
│       └── page.tsx    # Home
├── public/             # Assets
├── package.json        # Dependências frontend
├── .env                # Variáveis de ambiente (não versionado)
├── .gitignore
└── README.md
```

## Configuração do Ambiente
1. **Clone o repositório**
2. **Instale as dependências:**
   - Na raiz: `npm install`
   - No backend: `cd backend && npm install`
3. **Configure o banco:**
   - Crie um banco PostgreSQL (local, Neon, Render, etc)
   - Copie a string de conexão para o arquivo `.env` na pasta `backend/`:
     ```
     DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco
     JWT_SECRET=sua_chave_secreta
     ```
4. **Rode o script de setup:**
   - `cd backend && node setup-db.js`
   - Isso cria as tabelas e um usuário padrão para teste.

## Banco de Dados
- Tabela principal: `users`
- Campos: id (UUID), nickname, nome, sobrenome, email, email_recuperacao, telefone, cpf, birth_date, password_hash, gender, created_at, updated_at
- Um usuário padrão é criado para testes (ver `init.sql`)

## Scripts Principais
- **Frontend:**
  - `npm run dev` (Next.js em modo dev)
  - `npm run build` / `npm run start`
- **Backend:**
  - `cd backend && npm start` (Express)
  - `cd backend && node setup-db.js` (resetar banco)

## Fluxo de Autenticação
1. Usuário acessa `/login` ou `/register`
2. Frontend envia dados para o backend (`/api/login` ou `/api/register`)
3. Backend valida, gera JWT e retorna ao frontend
4. Token é salvo no localStorage
5. Dashboard só é acessível se o token existir
6. Logout remove o token e redireciona para login

## Funcionalidades
- Cadastro e login de usuários
- Hash de senha (bcrypt)
- JWT para autenticação
- Dashboard protegida
- Logout
- Barra lateral com hide/show
- Status de conexão com o banco
- Validação de campos obrigatórios

## Como Rodar
1. **Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
2. **Frontend:**
   ```bash
   npm install
   npm run dev
   ```
3. **Acesse:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

## Deploy
- O frontend pode ser deployado na Vercel, Netlify, etc.
- O backend pode ser deployado no Render, Railway, etc.
- Configure as variáveis de ambiente de acordo com o ambiente de produção.

---

Para dúvidas ou sugestões, abra uma issue ou entre em contato!
