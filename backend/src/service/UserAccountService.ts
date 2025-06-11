import { UserAccount } from '../entity/User';
import { UserAccountRepository } from '../repository/UserAccountRepository';

export class UserAccountService {
    private userAccountRepository: UserAccountRepository ;

    constructor() {
        this.userAccountRepository = new UserAccountRepository();
    }

    public async register(userAccountData: UserAccount): Promise<void> {

        if (await this.userAccountRepository.findByUser(userAccountData.user)){
            throw new Error("Usuário já existe. Tente novamente com outro nome de usuário.");
        }

        await this.userAccountRepository.save(userAccountData);
    }

    public async validateUser(username: string, password: string): Promise<UserAccount | null> {
        const userAccount = await this.userAccountRepository.findByUser(username);
        if (!userAccount || userAccount.password !== password) {
            return null;
        }
        return userAccount;
    }
}