import useWallet from "../utility/useWallet";

import { satay } from "../../data/moduleAddresses";

import { StructData } from "../../types/aptos";
import { toAptos } from "../../services/utils";
import { structToString } from "../../services/aptosUtils";

const useVaultDepositWithdraw = (vaultId: string, baseCoin: StructData) => {

    const { submitTransaction } = useWallet();

    const deposit = async (amount: number) => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::satay::deposit`,
            arguments: [
                vaultId,
                amount.toString()
            ],
            type_arguments: [structToString(baseCoin)]
        }, {
            title: "Deposit Succeeded!",
            description: `You have deposited ${toAptos(amount)} coins`
        })
    }

    const withdraw = async (amount: number) => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::satay::withdraw`,
            arguments: [
                vaultId,
                amount.toString()
            ],
            type_arguments: [structToString(baseCoin)]
        }, {
            title: "Withdraw Succeeded!",
            description: `You have withdrawn ${toAptos(amount)} coins`
        })
    }

    return {
        deposit,
        withdraw
    }
}

export default useVaultDepositWithdraw;