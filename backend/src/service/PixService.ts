import { Pix } from '../entity/Pix';
import { PixRepository } from '../repository/PixRepository';
import { generateHash } from '../utils/hashUtils';
import bigInt from 'big-integer';

export class PixService {
    private pixRepository: PixRepository;

    constructor() {
        this.pixRepository = new PixRepository();
    }

    public async prepareTransfer(chavePixRem: string, chavePixDest: string, valueOfOperation: string): Promise<void> {
        const operationValue = bigInt(valueOfOperation);
        const hashAuthInt = generateHash(chavePixRem + operationValue.toString());
        
        const pix = new Pix({
            chavePixRem: chavePixRem,
            chavePixDest: chavePixDest,
            valueOfOperation: operationValue,
            hashAuthInt: hashAuthInt
        });

        await this.pixRepository.transfer(pix);
    }
}