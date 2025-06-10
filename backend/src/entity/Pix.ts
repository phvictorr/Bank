import bigInt from 'big-integer';

interface PixProps {
    userIDRem: string;
    userIDDest: string;
    valueOfOperation: bigInt.BigInteger;
    hashAuthInt: string;
}

export class Pix {
    private props: PixProps;

    constructor(props: PixProps) {
        this.props = props;
    }

    get userIDRem() {
        return this.props.userIDRem;
    }

    get userIDDest() {
        return this.props.userIDDest;
    }

    get valueOfOperation() {
        return this.props.valueOfOperation;
    }

    get hashAuthInt() {
        return this.props.hashAuthInt;
    }
}