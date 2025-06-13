import bigInt from 'big-integer';

interface PixProps {
    chavePixRem: string;
    chavePixDest: string;
    valueOfOperation: bigInt.BigInteger;
    hashAuthInt: string;
}

export class Pix {
    private props: PixProps;

    constructor(props: PixProps) {
        this.props = props;
    }

    get chavePixRem() {
        return this.props.chavePixRem;
    }

    get chavePixDest() {
        return this.props.chavePixDest;
    }

    get valueOfOperation() {
        return this.props.valueOfOperation;
    }
    
    get hashAuthInt() {
        return this.props.hashAuthInt;
    }
}