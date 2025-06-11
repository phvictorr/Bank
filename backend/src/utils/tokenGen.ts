import jwt from 'jsonwebtoken';

const SECRET_KEY = 'MINHA_CHAVE_FIXA';

export function generateToken(user: any): string {
    const payload = {
        userID: user.user,
    };

    return jwt.sign(payload, process.env.SECRET_KEY || 'default_secret', { expiresIn: '1h' });
}