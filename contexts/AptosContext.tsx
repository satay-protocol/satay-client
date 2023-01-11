import { createContext, ReactNode, FC, useContext, useState, useEffect } from "react"

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

const defaultNetwork: SupportedNetwork = 'testnet';

export const AptosContext = createContext<ContextType>({
    client: getAptosClient(defaultNetwork),
    network: 'testnet',
    updateClient: async () => {}
});

export const useAptos = () => useContext(AptosContext);

interface AptosContextProps {
    children: ReactNode;
}

export const AptosProvider : FC<AptosContextProps> = ({ children }) => {

    const { network: networkInfo } = useWallet();

    useEffect(() => {
        updateClient();
    }, [networkInfo]);

    let network = getNetworkSlug(networkInfo?.name) || defaultNetwork;

    const [client, setClient] = useState<AptosClient>(getAptosClient(network));

    const updateClient = async () => {
        setClient(getAptosClient(network));
    }
 
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