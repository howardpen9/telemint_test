import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Telmint } from '../wrappers/Collection';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Telmint', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Telmint');
    });

    let blockchain: Blockchain;
    let telmint: SandboxContract<Telmint>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        telmint = blockchain.openContract(Telmint.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await telmint.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: telmint.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and telmint are ready to use
    });
});
