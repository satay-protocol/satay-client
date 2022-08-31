import { AptosClient } from "aptos";

import { createContext, ReactNode, FC, useContext } from "react"


interface ContextType {
    client: AptosClient;
}

const context = (rpcUrl = 'https://fullnode.devnet.aptoslabs.com/v1') => ({
    client: new AptosClient(rpcUrl)
})

export const AptosContext = createContext<ContextType>(context());

export const useAptos = () => useContext(AptosContext);

interface AptosContextProps {
    children: ReactNode;
    rpcUrl?: string;
}

export const AptosProvider : FC<AptosContextProps> = ({ children, rpcUrl }) => (
    <AptosContext.Provider
        value={context(rpcUrl)}
    >
        {children}
    </AptosContext.Provider>
);