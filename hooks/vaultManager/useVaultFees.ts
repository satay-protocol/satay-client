import { useState } from 'react';

import useWallet from '../utility/useWallet';

import { satay } from '../../data/moduleAddresses';

const useVaultFees = (vaultId: string, curManagementFee: number, curPerformanceFee: number) => {

    const { submitTransaction } = useWallet();

    const [managementFee, setManagementFee] = useState<string | undefined>(curManagementFee.toString());
    const [performanceFee, setPerformanceFee] = useState<string | undefined>(curPerformanceFee.toString());

    const onManagementFeeChange = (value: string) => {
        setManagementFee(value);
    }

    const onPerformanceFeeChange = (value: string) => {
        setPerformanceFee(value);
    }

    const updateFees = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::satay::update_vault_fee`,
            arguments: [
                vaultId,
                managementFee, 
                performanceFee
            ],
            type_arguments: []
        }, {
            title: "Fees Updated!",
            description: `You have updated the fees for vault ${vaultId}`
        });
    }

    return {
        managementFee,
        performanceFee,
        onManagementFeeChange,
        onPerformanceFeeChange,
        updateFees
    }
}

export default useVaultFees;