import { UserAccount } from '../entity/User';
import bigInt from 'big-integer';

export class UserAccountMapper {
    public static toUserAccountRegistration(input: any): UserAccount {
        const { user, email, password } = input;
        if (!user || !password || !password) {
            throw new Error('Campos "user", "email" e "password" são obrigatórios.');
        }
        return new UserAccount({
            user,
            password,
            email,
            hashAuthInt: '',
            saldo: bigInt(0),
            chavePix: ''
        });
    }

    public static toUserAccountResponse(userAccount: UserAccount, includeSaldo: boolean = false, includeHash: boolean = false): any {
        const response: any = {
            user: userAccount.user,
        };

        if (includeSaldo) {
            response.saldo = userAccount.saldo;
        }

        if (includeHash) {
            response.hash = userAccount.hashAuthInt
        }

        return response;
    }
}