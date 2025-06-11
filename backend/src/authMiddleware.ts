import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        throw new Error("Não autorizado.");
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}