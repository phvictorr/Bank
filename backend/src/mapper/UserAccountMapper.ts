import { UserAccount } from '../entity/User';
import bigInt from 'big-integer';

export class UserAccountMapper {
    public static toUserAccountRegistration(input: any): UserAccount {
        const { user, password } = input;
        if (!user || !password) {
            throw new Error('Campos "user" e "password" são obrigatórios.');
        }
        return new UserAccount({
            user,
            password,
            hashAuthInt: '',
            saldo: bigInt(0)
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