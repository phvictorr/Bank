import express from 'express';
import bodyParser from 'body-parser';
import { UserAccountController } from './controller/UserAccountController';
import { PixController } from './controller/PixController';
import { PixRepository } from './repository/PixRepository';
import { UserAccountRepository } from './repository/UserAccountRepository';
import { config } from 'dotenv';
import { authenticateToken } from './authMiddleware';

config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
const userAccountController = new UserAccountController();
const pixController = new PixController();

async function setupDatabase() {
    const userAccountRepository = new UserAccountRepository();
    const pixRepository = new PixRepository();
    await userAccountRepository.createUsersTable();
    await pixRepository.createPixTransfersTable();
}

setupDatabase()
    .then(() => {
        console.log('Configurações do banco de dados concluídas.');
    })
    .catch(error => console.error('Erro ao configurar o banco de dados:', error));

app.post('/register', (req, res) => userAccountController.register(req, res));
app.get('/users/:user', (req, res) => userAccountController.getUserAccount(req, res));
app.post('/pix', authenticateToken, (req, res) => pixController.transfer(req, res));
app.post('/login', (req, res) => userAccountController.login(req, res));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});