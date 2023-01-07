import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { AptosClient } from "aptos";

import { createContext, ReactNode, FC, useContext, useState, useEffect } from "react"
import { getNetworkSlug } from "../services/network";
import { SupportedNetwork } from "../types/network";

interface ContextType {
    client: AptosClient;
    network: SupportedNetwork
    updateClient: () => Promise<void>;
}

const rpcUrls = {
    "devnet": 'https://fullnode.devnet.aptoslabs.com/v1',
    "testnet": 'https://fullnode.testnet.aptoslabs.com/v1',
    "mainnet": 'https://fullnode.mainnet.aptoslabs.com/v1',
}

export const AptosContext = createContext<ContextType>({
    client: new AptosClient(rpcUrls['testnet']),
    network: 'testnet',
    updateClient: async () => {}
});

export const useAptos = () => useContext(AptosContext);

interface AptosContextProps {
    children: ReactNode;
}

export const AptosProvider : FC<AptosContextProps> = ({ children }) => {

    const { network } = useWallet();

    useEffect(() => {
        updateClient();
    }, [network]);

    const [client, setClient] = useState<AptosClient>(new AptosClient(rpcUrls[getNetworkSlug(network?.name) || "testnet"]));

    const updateClient = async () => {
        setClient(new AptosClient(rpcUrls[getNetworkSlug(network?.name) || "testnet"]));
    }
 
    return (
        
        <AptosContext.Provider
            value={{
                client,
                network: getNetworkSlug(network?.name),
                updateClient
            }}
        >
            {children}
        </AptosContext.Provider>
    )
}