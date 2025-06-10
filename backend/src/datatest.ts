import { pool } from './database';

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão ao MySQL estabelecida!');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
}

testConnection();