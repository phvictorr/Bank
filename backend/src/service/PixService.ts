import { Pix } from '../entity/Pix';
import { PixRepository } from '../repository/PixRepository';
import { UserAccountRepository } from '../repository/UserAccountRepository';
import { generateHash } from '../utils/hashUtils';
import bigInt from 'big-integer';

export class PixService {
    private pixRepository: PixRepository;
    private userAccountRepository: UserAccountRepository;

    constructor() {
        this.pixRepository = new PixRepository();
        this.userAccountRepository = new UserAccountRepository();
    }

    public async transfer(pixData: Pix): Promise<void> {
        const userAccountRem = await this.userAccountRepository.findByID(pixData.userIDRem);
        if (!userAccountRem) {
            throw new Error("Usuário remetente não encontrado.");
        }

        const userAccountDest = await this.userAccountRepository.findByID(pixData.userIDDest);
        if (!userAccountDest) {
            throw new Error("Usuário destinatário não encontrado.");
        }

        const operationValue = bigInt(pixData.valueOfOperation.toString());

        if (userAccountRem.saldo.lt(pixData.valueOfOperation)) {
            throw new Error("Saldo insuficiente.");
        }

        console.log('Saldo Remetente:', userAccountRem.saldo.toString());
        console.log('Valor da Operação:', operationValue.toString());

        const hashAuthInt = generateHash(userAccountRem.hashAuthInt + pixData.valueOfOperation.toString());
        
        const pixWithHash = new Pix({
            userIDRem: pixData.userIDRem,
            userIDDest: pixData.userIDDest,
            valueOfOperation: operationValue,
            hashAuthInt: hashAuthInt
        });

        await this.pixRepository.transfer(pixWithHash);
    }
}