import { useState } from "react";

import useWallet from "../utility/useWallet";

import { StructData } from "../../types/aptos";
import { structToString } from "../../services/aptosUtils";

const useUpdateDebtRatio = (baseCoinStruct: StructData, strategyModule: string, currentDebtRatio = 0) => {

    const [debtRatio, setDebtRatio] = useState(currentDebtRatio / 100);

    const onDebtRatioChange = (debtRatio: number) => {
        setDebtRatio(debtRatio);
    }

    const { submitTransaction } = useWallet();

    const updateDebtRatio = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::update_debt_ratio`,
            arguments: [(debtRatio * 100).toString()],
            type_arguments: [structToString(baseCoinStruct)]
        }, {
            title: "Strategy Harvested!",
            description: `You have successfully harvested the strategy`
        })

    }

    return {
        debtRatio,
        updateDebtRatio,
        onDebtRatioChange
    }
}

export default useUpdateDebtRatio