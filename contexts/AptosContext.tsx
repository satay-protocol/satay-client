import { useWallet } from "@manahippo/aptos-wallet-adapter";
import { AptosClient } from "aptos";

import { createContext, ReactNode, FC, useContext, useState } from "react"

interface ContextType {
    client: AptosClient;
    updateClient: () => Promise<void>;
}

export const AptosContext = createContext<ContextType>({
    client: new AptosClient('https://fullnode.devnet.aptoslabs.com/v1'),
    updateClient: async () => {}
});

export const useAptos = () => useContext(AptosContext);

interface AptosContextProps {
    children: ReactNode;
}

export const AptosProvider : FC<AptosContextProps> = ({ children }) => {

    const { network } = useWallet();

    const [client, setClient] = useState<AptosClient>(new AptosClient(network?.api || 'https://fullnode.devnet.aptoslabs.com/v1'));

    const updateClient = async () => {
        setClient(new AptosClient(network?.api || 'https://fullnode.devnet.aptoslabs.com/v1'));
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