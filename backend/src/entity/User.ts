import bigInt from 'big-integer';

interface UserAccountProps {
    user: string;
    password: string;
    hashAuthInt: string;
    saldo: bigInt.BigInteger;
}

export class UserAccount {
    private props: UserAccountProps;

    get user() {
        return this.props.user;
    }

    set user(value: string) {
        this.props.user = value;
    }

    get password() {
        return this.props.password;
    }

    set password(value: string) {
        this.props.password = value;
    }

    get hashAuthInt() {
        return this.props.hashAuthInt;
    }

    set hashAuthInt(value: string) {
        this.props.hashAuthInt = value;
    }

    get saldo() {
        return this.props.saldo;
    }

    set saldo(value: bigInt.BigInteger) {
        this.props.saldo = value;
    }

    constructor(props: UserAccountProps) {
        this.props = props;
    }
}