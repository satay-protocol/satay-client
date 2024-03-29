import { useState } from 'react';

import useWallet from '../utility/useWallet';

import { ellipsize } from '../../services/utils';

import { satay } from '../../data/moduleAddresses';

const useSetGovernance = () => {

    const { submitTransaction } = useWallet();

    const [newGovernanceAddress, setNewGovernanceAddress] = useState<string>("");

    const onChange = (newGovernanceAddress: string) => {
        setNewGovernanceAddress(newGovernanceAddress);
    }

    const onSubmit = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::global_config::set_governance`,
            arguments: [newGovernanceAddress],
            type_arguments: []
        }, {
            title: "Governance Address Changed!",
            description: `You have successfully offered the governance capability to ${ellipsize(newGovernanceAddress)}`
        });
        onChange(undefined);
    }

    return { newGovernanceAddress, onChange, onSubmit };
}

export default useSetGovernance;