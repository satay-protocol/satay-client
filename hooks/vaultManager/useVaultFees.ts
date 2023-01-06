import { useState } from 'react';

import useWallet from '../useWallet';

import { satay } from '../../data/moduleAddresses';

const useVaultFees = (vaultId: string, curManagementFee: number, curPerformanceFee: number) => {

    const { submitTransaction } = useWallet();

    const format = (value: string) => value + '%';
    const parse = (value: string) => value.replace('%', '');
    const toFeeAmount = (value: string) => (parseInt(parse(value)) * 100).toString();

    const [managementFee, setManagementFee] = useState<string>(curManagementFee.toString());
    const [performanceFee, setPerformanceFee] = useState<string>(curPerformanceFee.toString());

    const updateManagementFee = (value: string) => {
        setManagementFee(parse(value));
    }

    const updatePerformanceFee = (value: string) => {
        setPerformanceFee(parse(value));
    }

    const updateFees = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::satay::update_vault_fee`,
            arguments: [
                vaultId,
                toFeeAmount(managementFee), 
                toFeeAmount(performanceFee)
            ],
            type_arguments: []
        }, {
            title: "Fees Updated!",
            description: `You have updated the fees for vault ${vaultId}`
        });
    }

    return {
        managementFee: format(managementFee),
        performanceFee: format(performanceFee),
        updateManagementFee,
        updatePerformanceFee,
        updateFees
    }
}

export default useVaultFees;