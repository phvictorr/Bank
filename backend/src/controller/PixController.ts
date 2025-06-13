import { Request, Response } from 'express';
import { Pix } from '../entity/Pix';
import { PixService } from '../service/PixService';
import bigInt from 'big-integer';

export class PixController {
    private pixService: PixService;

    constructor() {
        this.pixService = new PixService();
    }

    public async transfer(req: Request, res: Response): Promise<void> {
        const { chavePixRem, chavePixDest, valueOfOperation } = req.body;

        if (!chavePixRem || !chavePixDest || !valueOfOperation) {
            res.status(400).json({
                message: 'Dados incompletos. Certifique-se de fornecer chavePixRem, chavePixDest e valueOfOperation.',
            });
            return;
        }

        try {
            const pix = await this.pixService.prepareTransfer(chavePixRem, chavePixDest, valueOfOperation);
            res.status(200).json({ message: 'Transferência realizada com sucesso.' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro ao realizar a transferência.', error: 'Erro desconhecido.' });
            }
        }
    }
}