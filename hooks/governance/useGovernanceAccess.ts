import { useState, useEffect } from "react"

import { useAptos } from "../../contexts/AptosContext"

import { callGetFunction } from "../../services/simulation"

import { satay } from "../../data/moduleAddresses"

const useGovernanceAccess = (connectedAddress: string) => {

    const { network } = useAptos();

    const [hasGovernanceAccess, setHasGovernanceAccess] = useState(false)
    
    useEffect(() => {
        if (!connectedAddress) return
    
        const checkAccess = async () => {
            const governanceAddress = await callGetFunction({
                func: `${satay}::global_config::get_governance_address`,
                type_args: [],
                args: [],
                ledger_version: 0,
                network,
            })
            setHasGovernanceAccess(governanceAddress.details.return_values[0] === connectedAddress.slice(2))
        }
    
        checkAccess()
    }, [connectedAddress])
    
    return hasGovernanceAccess
}

export default useGovernanceAccess