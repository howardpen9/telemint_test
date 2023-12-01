import { toNano } from 'ton-core';
import { Collection } from '../wrappers/Collection';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const telmint = provider.open(Collection.createFromConfig({}, await compile('Collection')));

    await telmint.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(telmint.address);

    // run methods on `telmint`
}
