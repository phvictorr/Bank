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
}