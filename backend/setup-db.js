import { Pool } from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
console.log('DEBUG DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log('Attempting to connect with DATABASE_URL:', process.env.DATABASE_URL);

async function setupDatabase() {
  try {
    const client = await pool.connect();
    const sql = fs.readFileSync('./sql/init.sql').toString();
    await client.query(sql);
    console.log('Banco de dados configurado com sucesso!');
    client.release();
  } catch (err) {
    console.error('Erro ao configurar o banco de dados:', err);
  } finally {
    await pool.end();
  }
}

setupDatabase(); 