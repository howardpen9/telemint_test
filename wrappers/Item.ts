import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type TelmintConfig = {};

export function telmintConfigToCell(config: TelmintConfig): Cell {
    return beginCell().endCell();
}

export class Telmint implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Telmint(address);
    }

    static createFromConfig(config: TelmintConfig, code: Cell, workchain = 0) {
        const data = telmintConfigToCell(config);
        const init = { code, data };
        console.log(init.code);
        return new Telmint(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
