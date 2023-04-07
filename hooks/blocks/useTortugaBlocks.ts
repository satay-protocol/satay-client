import useWallet from "../utility/useWallet";

import {useAptos} from "../../contexts/AptosContext";

import {getBestRoutePayload} from "../../services/hippoRouter";

import {BlockHook} from "../../types/block";
import {moduleToString, tortugaBlocksModule} from "../../data/modules";

const useTortugaBlocks: BlockHook = () => {

    const { client } = useAptos();

    const { submitTransaction } = useWallet();

    const deposit = async (amount: number) => {
        const stakePayload = await getBestRoutePayload(client, "APT", "tAPT", (amount / 10**8));
        const args = stakePayload.arguments.slice(0, stakePayload.arguments.length - 1);
        const type_args = stakePayload.type_arguments.slice(1, 3).concat(stakePayload.type_arguments.slice(5, 7));
        await submitTransaction({
            type: "entry_function_payload",
            function: `${moduleToString(tortugaBlocksModule)}::deposit`,
            arguments: args,
            type_arguments: type_args
        }, {
            title: "Stake APT",
            description: "Stake APT to earn APTO"
        });
    }

    const withdraw = async (amount: number) => {
        const unstakePayload = await getBestRoutePayload(client, "tAPT", "APT", (amount / 10**8));
        const args = unstakePayload.arguments.slice(0, unstakePayload.arguments.length - 1);
        const type_args = unstakePayload.type_arguments.slice(1, 3).concat(unstakePayload.type_arguments.slice(5, 7));
        await submitTransaction({
            type: "entry_function_payload",
            function: `${moduleToString(tortugaBlocksModule)}::withdraw`,
            arguments: args,
            type_arguments: type_args
        }, {
            title: "Stake APT",
            description: "Stake APT to earn APTO"
        });
    }

    return {
        deposit,
        withdraw
    }
}

export default useTortugaBlocks