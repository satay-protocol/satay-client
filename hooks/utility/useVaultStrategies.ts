import { useState, useEffect } from "react"

import { useWallet } from "@manahippo/aptos-wallet-adapter"

import { fetchStrategiesForVaultAddress } from "../../services/strategies"
import { Strategy } from "../../types/strategy";
import { getNetworkSlug } from "../../services/network";

const useVaultStrategies = (vaultAddress: string) => {

    const { network } = useWallet();

    const [strategies, setStrategies] = useState<Strategy[]>([])

    useEffect(() => {
        const fetchStrategies = async () => {
            const strategies = await fetchStrategiesForVaultAddress(vaultAddress, getNetworkSlug(network.name));
            setStrategies(strategies)
        }
        fetchStrategies()
    }, [vaultAddress])

    return strategies
}

export default useVaultStrategies