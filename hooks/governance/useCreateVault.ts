import { useState } from "react";

import useWallet from "../utility/useWallet";

import { satay } from "../../data/moduleAddresses";

import { Coin } from "../../types/coin";
import { structToString } from "../../services/aptosUtils";

const useCreateVault = () => {

    const { submitTransaction } = useWallet();

    const [coin, setCoin] = useState<Coin | undefined>(undefined);

    const [managementFee, setManagementFee] = useState<string | undefined>(undefined);
    const [performanceFee, setPerformanceFee] = useState<string | undefined>(undefined);

    const onChangeCoin = (coin: Coin) => {
        setCoin(coin);
    }

    const onChangeManagementFee = (managementFee: string) => {
        setManagementFee(managementFee);
    }

    const onChangePerformanceFee = (performanceFee: string) => {
        setPerformanceFee(performanceFee);
    }

    const onCreateVault = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::satay::new_vault`,
            arguments: [managementFee, performanceFee],
            type_arguments: [structToString(coin.coinStruct)]
        }, {
            title: "Vault Created!",
            description: `You have created a new vault for ${coin.name}`
        })
    }

    return {
        coin,
        managementFee,
        performanceFee,
        onChangeCoin,
        onChangeManagementFee,
        onChangePerformanceFee,
        onCreateVault
    };
}

export default useCreateVault;