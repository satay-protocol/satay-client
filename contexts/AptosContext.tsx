import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { AptosClient } from "aptos";

import { createContext, ReactNode, FC, useContext, useState, useEffect } from "react"
import { DEFAULT_NETWORK } from "../services/aptosClients";
import { getNetworkSlug } from "../services/aptosUtils";

interface ContextType {
    client: AptosClient;
    updateClient: () => Promise<void>;
}

const rpcUrls = {
    "devnet": 'https://fullnode.devnet.aptoslabs.com/v1',
    "testnet": 'https://fullnode.testnet.aptoslabs.com/v1',
    "mainnet": 'https://fullnode.mainnet.aptoslabs.com/v1',
}

export const AptosContext = createContext<ContextType>({
    client: new AptosClient(rpcUrls[DEFAULT_NETWORK]),
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

    const [client, setClient] = useState<AptosClient>(new AptosClient(rpcUrls[getNetworkSlug(network?.name) || DEFAULT_NETWORK]));

    const updateClient = async () => {
        setClient(new AptosClient(rpcUrls[getNetworkSlug(network?.name) || DEFAULT_NETWORK]));
    }
 
    return (
        
        <AptosContext.Provider
            value={{
                client,
                updateClient
            }}
        >
            {children}
        </AptosContext.Provider>
    )
}