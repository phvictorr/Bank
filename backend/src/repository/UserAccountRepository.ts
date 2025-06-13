import { pool } from '../database';
import { UserAccount } from '../entity/User';
import bigInt from 'big-integer';

interface UserAccountRow {
    user: string;
    password: string;
    email: string;
    hashAuthInt: string;
    saldo: string;
    chavePix: string;
}

export class UserAccountRepository {
    public async save(userAccount: UserAccount): Promise<void> {
        const { user, email, password, hashAuthInt, saldo, chavePix } = userAccount;

        const existingUser = await this.findByUser(user);
        if (existingUser) {
            throw new Error("Usuário já existe. Tente novamente com outro nome de usuário.");
        }

        const query = `
            INSERT INTO user_accounts (user, email, password, hashAuthInt, saldo, chavePix) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        
        const values = [user, email, password, hashAuthInt, saldo.toString(), chavePix];

        const connection = await pool.getConnection();
        try {
            await connection.execute(query, values);
        } catch (error) {
            console.error('Erro ao salvar conta de usuário:', error);
            throw new Error('Falha ao salvar conta de usuário');
        } finally {
            connection.release();
        }
    }

    public async saldo_update(userAccount: UserAccount): Promise<void> {
        const { user, saldo } = userAccount;

        const query = `
            UPDATE user_accounts 
            SET saldo = ? 
            WHERE user = ?`;
        
        const values = [saldo.toString(), user];

        const connection = await pool.getConnection();
        try {
            await connection.execute(query, values);
            console.log(`Saldo do usuário ${user} atualizado para ${saldo.toString()}.`);
        } catch (error) {
            console.error('Erro ao atualizar saldo do usuário:', error);
            throw new Error('Falha ao atualizar saldo do usuário');
        } finally {
            connection.release();
        }
    }

    public async createUsersTable(): Promise<void> {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS user_accounts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                hashAuthInt VARCHAR(255) NOT NULL,
                saldo DECIMAL(10, 2) NOT NULL,
                chavePix VARCHAR(255) NULL
            )`;

        const connection = await pool.getConnection();
        try {
            await connection.execute(createTableQuery);
            console.log('Tabela users_accounts criada ou já existe.');
        } catch (error) {
            console.error('Erro ao criar tabela users_accounts:', error);
            throw new Error('Falha ao criar tabela de transferências PIX.');
        } finally {
            connection.release();
        }
    }

    public async findByID(ID: string): Promise<UserAccount | null> {
        const query = `
            SELECT * FROM user_accounts WHERE id = ?`;
        
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(query, [ID]) as [UserAccountRow[], any];

            if (rows.length > 0) {
                const userAccountData = rows[0];
                return new UserAccount({
                    user: userAccountData.user,
                    password: userAccountData.password,
                    email: userAccountData.email,
                    hashAuthInt: userAccountData.hashAuthInt,
                    saldo: bigInt(userAccountData.saldo),
                    chavePix: userAccountData.chavePix
                    
                });
            }
            
            return null;
        } catch (error) {
            console.error('Erro ao encontrar conta de usuário pelo ID:', error);
            throw new Error('Falha ao procurar conta de usuário pelo ID.');
        } finally {
            connection.release();
        }
    }

    public async findByUser(username: string): Promise<UserAccount | null> {
        const query = `
            SELECT * FROM user_accounts WHERE user = ?`;
        
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(query, [username]) as [UserAccountRow[], any];

            if (rows.length > 0) {
                const userAccountData = rows[0];
                return new UserAccount({
                    user: userAccountData.user,
                    password: userAccountData.password,
                    email: userAccountData.email,
                    hashAuthInt: userAccountData.hashAuthInt,
                    saldo: bigInt(userAccountData.saldo),
                    chavePix: userAccountData.chavePix
                });
            }
            return null;
        } catch (error) {
            console.error('Erro ao procurar conta de usuário:', error);
            throw new Error('Falha ao procurar conta de usuário');
        } finally {
            connection.release();
        }
    }

    public async findByChavePix(chavePix: string): Promise<UserAccount | null> {
        const query = `
            SELECT * FROM user_accounts WHERE chavePix = ?`;
        
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(query, [chavePix]) as [UserAccountRow[], any];

            if (rows.length > 0) {
                const userAccountData = rows[0];
                return new UserAccount({
                    user: userAccountData.user,
                    password: userAccountData.password,
                    email: userAccountData.email,
                    hashAuthInt: userAccountData.hashAuthInt,
                    saldo: bigInt(userAccountData.saldo),
                    chavePix: userAccountData.chavePix
                });
            }
            return null;
        } catch (error) {
            console.error('Erro ao procurar conta de usuário pela chave PIX:', error);
            throw new Error('Falha ao procurar conta de usuário pela chave PIX');
        } finally {
            connection.release();
        }
    }
}