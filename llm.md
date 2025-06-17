# Guia para LLM: Como colocar o projeto Autentication Boilerplate no ar

## 1. Estrutura do Projeto
- **Frontend:** Next.js (src/app)
- **Backend:** Node.js/Express (backend/)
- **Banco:** PostgreSQL (pode ser local, Neon, Render, Supabase, etc)

## 2. Dependências
- Instale as dependências na raiz e no backend:
  - `npm install` (raiz)
  - `cd backend && npm install`

## 3. Variáveis de Ambiente
- Crie um arquivo `.env` na pasta `backend/` com base em [`backend/example.env`](backend/example.env):
  ```env
  # String de conexão do PostgreSQL
  DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco

  # Chave secreta para assinar JWTs
  JWT_SECRET=sua_chave_secreta_super_segura
  ```
- **Importante:** O backend só funciona se essas variáveis estiverem corretas.

## 4. Banco de Dados
- Rode o script de setup para criar as tabelas e um usuário padrão:
  ```bash
  cd backend
  node setup-db.js
  ```
- O schema está em `backend/sql/init.sql`.

## 5. Inicialização dos Serviços
- **Backend:**
  ```bash
  cd backend
  npm start
  # ou
  node server.js
  ```
- **Frontend:**
  ```bash
  npm run dev
  ```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 6. Fluxo de Autenticação
- Cadastro: `/register` → POST `/api/register` (backend)
- Login: `/login` → POST `/api/login` (backend)
- Dashboard: `/dashboard` (protegida por token JWT salvo no localStorage)
- Logout: remove token e redireciona para login

## 7. Funcionalidades Especiais
- Barra lateral com botão de hide/show (dashboard)
- Status de conexão com o banco exibido nas telas de login e registro
- Usuário padrão criado no setup para testes

## 8. Deploy
- Frontend: Vercel, Netlify, etc
- Backend: Render, Railway, etc
- Configure as variáveis de ambiente de acordo com o ambiente de produção

## 9. Observações para LLM
- Sempre garanta que o backend está rodando antes do frontend para evitar erros de conexão.
- O backend depende do arquivo `.env` correto e do banco acessível.
- O frontend espera o backend em `http://localhost:5000` (ajuste se necessário).
- Para resetar o banco, rode novamente `node setup-db.js` no backend.
- O código está modularizado e pronto para expansão de rotas, entidades e integrações. 