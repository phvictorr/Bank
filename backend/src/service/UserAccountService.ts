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

    public async cadastrarChavePix(user: string, chavePix: string): Promise<void> {
        const userAccount = await this.userAccountRepository.findByUser(user);
        const userPix = await this.userAccountRepository.findByChavePix(chavePix);

        if (!userAccount) {
            throw new Error('Usuário não encontrado.');
        }

        if (!userPix) {
            console.log("cheguei aqui, por que userpix é null");
            userAccount.chavePix = chavePix;
            await this.userAccountRepository.updateChavePix(userAccount);
        } else {
            throw new Error('Chave Pix já cadastrada. Tente novamente com outra chave.');
        }

        
    }
}