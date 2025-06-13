import { pool } from '../database';
import { UserAccountRepository } from './UserAccountRepository';
import { Pix } from '../entity/Pix';
import bigInt from 'big-integer';

export class PixRepository {
    
    private userAccountRepository: UserAccountRepository;

    constructor() {
        this.userAccountRepository = new UserAccountRepository();
    }

    public async transfer(pix: Pix): Promise<void> {
        const { chavePixRem, chavePixDest, valueOfOperation } = pix;
        console.log(pix)
        const userAccountRem = await this.userAccountRepository.findByChavePix(chavePixRem);
        if (!userAccountRem) {
            throw new Error("Usuário remetente não encontrado.");
        }

        const userAccountDest = await this.userAccountRepository.findByChavePix(chavePixDest);
        if (!userAccountDest) {
            throw new Error("Usuário destinatário não encontrado.");
        }

        if (userAccountRem.saldo.lt(bigInt(valueOfOperation))){
            throw new Error("Saldo insuficiente.");
        }

        userAccountRem.saldo = userAccountRem.saldo.subtract(valueOfOperation);
        userAccountDest.saldo = userAccountDest.saldo.add(valueOfOperation);

        await this.userAccountRepository.saldo_update(userAccountRem);
        await this.userAccountRepository.saldo_update(userAccountDest);

        const transferData = {
            userIDRem: userAccountRem.user,
            userIDDest: userAccountDest.user,
            chavePixRem: chavePixRem,
            chavePixDest: chavePixDest,
            valueOfOperation: valueOfOperation
        };

        await this.recordTransfer(pix);
    }

    private async recordTransfer(pix: Pix): Promise<void> {
        const { chavePixRem, chavePixDest, valueOfOperation, hashAuthInt } = pix;

        const query = `
            INSERT INTO pix_transfers (user_id_rem, user_id_dest, value_of_operation, hash_auth_int)
            VALUES (?, ?, ?, ?)`;

        const values = [chavePixRem, chavePixDest, valueOfOperation.toString(), hashAuthInt];

        const connection = await pool.getConnection();
        try {
            await connection.execute(query, values);
        } catch (error) {
            console.error('Erro ao registrar a transferência PIX:', error);
            throw new Error('Falha ao registrar a transferência PIX.');
        } finally {
            connection.release();
        }
    }

    public async createPixTransfersTable(): Promise<void> {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS pix_transfers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id_rem VARCHAR(255) NOT NULL,
                user_id_dest VARCHAR(255) NOT NULL,
                date_of_operation DATETIME DEFAULT CURRENT_TIMESTAMP,
                value_of_operation DECIMAL(10, 2) NOT NULL,
                hash_auth_int VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id_rem) REFERENCES user_accounts(user) ON DELETE CASCADE,
                FOREIGN KEY (user_id_dest) REFERENCES user_accounts(user) ON DELETE CASCADE
            )`;

        const connection = await pool.getConnection();
        try {
            await connection.execute(createTableQuery);
            console.log('Tabela pix_transfers criada ou já existe.');
        } catch (error) {
            console.error('Erro ao criar tabela pix_transfers:', error);
            throw new Error('Falha ao criar tabela de transferências PIX.');
        } finally {
            connection.release();
        }
    }
}