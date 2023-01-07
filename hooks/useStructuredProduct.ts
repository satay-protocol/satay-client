import { toAptos } from "../services/utils";
import useWallet from "./utility/useWallet";

const useStructuredProduct = (moduleAddress: string) => {

    const { submitTransaction } = useWallet();

    const deposit = async (amount: number) => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${moduleAddress}::deposit`,
            arguments: [
                amount.toString()
            ],
            type_arguments: []
        }, {
            title: "Deposit Succeeded!",
            description: `You have deposited ${toAptos(amount)} coins`
        })
    }

    const withdraw = async (amount: number) => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${moduleAddress}::withdraw`,
            arguments: [
                amount.toString()
            ],
            type_arguments: []
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

export default useStructuredProduct;