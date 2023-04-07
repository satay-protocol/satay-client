import { createContext, ReactNode, FC, useContext, useState, useEffect, useCallback } from "react"

import { useWallet } from "@manahippo/aptos-wallet-adapter";

import { AptosClient } from "aptos";

import { getAptosClient } from "../services/aptosClients";
import { getNetworkSlug } from "../services/network";

import { SupportedNetwork } from "../types/network";

interface ContextType {
    client: AptosClient;
    network: SupportedNetwork
    updateClient: () => Promise<void>;
}

export const DEFAULT_NETWORK: SupportedNetwork = 'mainnet';

export const AptosContext = createContext<ContextType>({
    client: getAptosClient(DEFAULT_NETWORK),
    network: DEFAULT_NETWORK,
    updateClient: async () => {}
});

export const useAptos = () => useContext(AptosContext);

interface AptosContextProps {
    children: ReactNode;
}

export const AptosProvider : FC<AptosContextProps> = ({ children }) => {

    const { network: networkInfo } = useWallet();

    let network = getNetworkSlug(networkInfo?.name) || DEFAULT_NETWORK;

    const updateClient = useCallback(async () => {
        setClient(getAptosClient(network));
    }, [network]);

    useEffect(() => {
        updateClient();
    }, [networkInfo, updateClient]);


    const [client, setClient] = useState<AptosClient>(getAptosClient(network));


 
    return (
        
        <AptosContext.Provider
            value={{
                client,
                network,
                updateClient
            }}
        >
            {children}
        </AptosContext.Provider>
    )
}