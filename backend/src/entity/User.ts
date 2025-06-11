import bigInt from 'big-integer';

interface UserAccountProps {
    user: string;
    email: string;
    password: string;
    hashAuthInt: string;
    saldo: bigInt.BigInteger;
    chavePix: string;
}

export class UserAccount {
    private props: UserAccountProps;

    get user() {
        return this.props.user;
    }

    set user(value: string) {
        this.props.user = value;
    }

    get email() {
        return this.props.email;
    }

    set email(value: string) {
        this.props.email = value;
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

    get chavePix() {
        return this.props.chavePix;
    }

    set chavePix(value: string) {
        this.props.chavePix = value;
    }

    constructor(props: UserAccountProps) {
        this.props = props;
    }
}