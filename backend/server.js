import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { pool } from './db.js';

console.log('DEBUG DATABASE_URL (server.js):', process.env.DATABASE_URL);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API de autenticação está funcionando!');
});

app.post('/api/register', async (req, res) => {
    const { nickname, email, password, birth_date, gender, nome, sobrenome, telefone, email_recuperacao, cpf } = req.body;

    try {
        // Verificar se o usuário já existe
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Usuário com este e-mail já existe.' });
        }

        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tratar birth_date vazio
        const birthDateToInsert = birth_date === "" ? null : birth_date;

        // Inserir novo usuário no banco de dados
        const newUser = await pool.query(
            'INSERT INTO users(nickname, email, password_hash, birth_date, gender, nome, sobrenome, telefone, email_recuperacao, cpf) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, nickname, email, birth_date, gender, nome, sobrenome, telefone, email_recuperacao, cpf, created_at',
            [nickname, email, hashedPassword, birthDateToInsert, gender, nome, sobrenome, telefone, email_recuperacao, cpf]
        );

        const user = newUser.rows[0];

        // Gerar JWT
        console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuário registrado com sucesso!', token, user });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar se o usuário existe
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length === 0) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        const user = userExists.rows[0];

        // Comparar senha
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // Gerar JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido!', token, user: { id: user.id, nickname: user.nickname, email: user.email, birth_date: user.birth_date, gender: user.gender, created_at: user.created_at } });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.get('/api/db-status', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Erro ao verificar status do banco:', error);
        res.status(500).json({ status: 'error', message: 'Banco de dados inacessível.' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor de autenticação rodando na porta ${PORT}`);
}); 