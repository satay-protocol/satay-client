import { useState, useEffect } from "react"

import { useAptos } from "../../contexts/AptosContext"

import { fetchGovernanceAddress } from "../../services/governance"

const useGovernanceAccess = (connectedAddress: string) => {

    const { client } = useAptos();

    const [hasGovernanceAccess, setHasGovernanceAccess] = useState(false);
    const [fetched, setFetched] = useState(false);
    
    useEffect(() => {
        if (!connectedAddress) return
    
        const checkAccess = async () => {
            const governanceAddress = await fetchGovernanceAddress(client);
            setHasGovernanceAccess(governanceAddress === connectedAddress);
            setFetched(true);
        }
    
        checkAccess()
    }, [connectedAddress])
    
    return {hasGovernanceAccess, fetched}
}

export default useGovernanceAccess