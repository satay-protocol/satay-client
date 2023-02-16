import { useState } from "react"

import { StrategyInfo } from "../../types/strategy";

import useWallet from "../utility/useWallet";

const useApproveStrategy = () => {

    const { submitTransaction } = useWallet();

    const [selectedStrategy, setSelectedStrategy] = useState<StrategyInfo | null>(null);
    const [debtRatio, setDebtRatio] = useState<string | undefined>();

    const selectStrategy = (strategy: StrategyInfo) => {
        setSelectedStrategy(strategy);
    }

    const updateDebtRatio = (ratio: string) => {
        setDebtRatio(ratio);
    }

    const approveStrategy = async () => {
        if (selectedStrategy) {
            await submitTransaction({
                type: 'entry_function_payload',
                function: `${selectedStrategy.vaultStrategyModule}::approve`,
                arguments: [debtRatio],
                type_arguments: []
            }, {
                title: 'Strategy Approved!',
                description: 'Your strategy has been approved and is ready to be used.'
            });
        }
    }

    return {
        selectedStrategy,
        selectStrategy,
        debtRatio,
        updateDebtRatio,
        approveStrategy
    }
}

export default useApproveStrategy