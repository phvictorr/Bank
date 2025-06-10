import { Request, Response } from 'express';
import { UserAccountService } from '../service/UserAccountService';
import { UserAccountMapper } from '../mapper/UserAccountMapper';
import { UserAccountRepository } from '../repository/UserAccountRepository';

export class UserAccountController {
    private userAccountService: UserAccountService;
    private userAccountRepository: UserAccountRepository;

    constructor() {
        this.userAccountService = new UserAccountService();
        this.userAccountRepository = new UserAccountRepository();
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const newUserAccount = UserAccountMapper.toUserAccountRegistration(req.body);
            await this.userAccountService.register(newUserAccount);

            res.status(201).json({
                message: 'Conta de usuário registrada com sucesso.',
                user: newUserAccount.user,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro ao registrar a conta de usuário.', error: 'Erro desconhecido.' });
            }
        }
    }

    public async getUserAccount(req: Request, res: Response): Promise<void> {
        const user = req.params.user;
        
        try {
            const userAccount = await this.userAccountRepository.findByUser(user);
            if (!userAccount) {
                res.status(404).json({ message: 'Usuário não encontrado.' });
                return;
            }

            const userAccountResponse = UserAccountMapper.toUserAccountResponse(userAccount, true, false);
            res.status(200).json(userAccountResponse);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro ao obter conta de usuário.', error: 'Erro desconhecido.' });
            }
        }
    }
}