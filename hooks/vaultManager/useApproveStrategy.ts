import { useState } from "react"
import { structToModule, structToString } from "../../services/aptosUtils";

import { StructData } from "../../types/aptos"
import useWallet from "../utility/useWallet";

const useApproveStrategy = (vaultId: string) => {

    const { submitTransaction } = useWallet();

    const [selectedWitness, setSelectedWitness] = useState<StructData | null>(null);
    const [debtRatio, setDebtRatio] = useState<string | undefined>();

    const selectWitness = (witness: StructData) => {
        setSelectedWitness(witness);
    }

    const updateDebtRatio = (ratio: string) => {
        setDebtRatio(ratio);
    }

    const approveStrategy = async () => {
        if (selectedWitness) {
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${structToModule(selectedWitness)}::initialize`,
                arguments: [
                    vaultId,
                    debtRatio
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
        debtRatio,
        selectWitness,
        updateDebtRatio,
        approveStrategy
    }
}

export default useApproveStrategy