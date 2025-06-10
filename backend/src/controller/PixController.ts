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
        const { userIDRem, userIDDest, valueOfOperation } = req.body;

        if (!userIDRem || !userIDDest || !valueOfOperation) {
            res.status(400).json({
                message: 'Dados incompletos. Certifique-se de fornecer userIDRem, userIDDest e valueOfOperation.',
            });
            return;
        }

        const pix = new Pix({ userIDRem, userIDDest, valueOfOperation: bigInt(valueOfOperation), hashAuthInt: '' });

        try {
            await this.pixService.transfer(pix);
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