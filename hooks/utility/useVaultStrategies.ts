import { useState, useEffect } from "react"

import { useAptos } from "../../contexts/AptosContext";

import { fetchStrategiesForVaultAddress } from "../../services/strategies"

import { Strategy } from "../../types/strategy";

const useVaultStrategies = (vaultAddress: string) => {

    const { client } = useAptos();

    const [strategies, setStrategies] = useState<Strategy[]>([])

    useEffect(() => {
        const fetchStrategies = async () => {
            const strategies = await fetchStrategiesForVaultAddress(client, vaultAddress);
            setStrategies(strategies)
        }
        fetchStrategies()
    }, [vaultAddress])

    return strategies
}

export default useVaultStrategies