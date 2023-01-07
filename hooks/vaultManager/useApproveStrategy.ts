import { useState } from "react"
import { structToModule, structToString } from "../../services/aptosUtils";

import { StructData } from "../../types/aptos"
import useWallet from "../utility/useWallet";

const format = (value: string) => value + '%';
const parse = (value: string) => value.replace('%', '');
const toBpsAmount = (value: string) => (parseInt(parse(value)) * 100).toString();

const useApproveStrategy = (vaultId: string) => {

    const { submitTransaction } = useWallet();

    const [selectedWitness, setSelectedWitness] = useState<StructData | null>(null);
    const [debtRatio, setDebtRatio] = useState<string>('');

    const selectWitness = (witness: StructData) => {
        setSelectedWitness(witness);
    }

    const updateDebtRatio = (ratio: string) => {
        setDebtRatio(parse(ratio));
    }

    const approveStrategy = async () => {
        if (selectedWitness) {
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${structToModule(selectedWitness)}::initialize`,
                arguments: [
                    vaultId,
                    toBpsAmount(debtRatio)
                ],
                type_arguments: []
            }, {
                title: 'Strategy Approved!',
                description: 'Your strategy has been approved and is ready to be used.'
            });
        }
    }

    return {
        selectedWitness: selectedWitness?.struct_name,
        debtRatio: format(debtRatio),
        selectWitness,
        updateDebtRatio,
        approveStrategy
    }
}

export default useApproveStrategy