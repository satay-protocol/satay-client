import { useWallet, PontemWalletAdapter } from '@manahippo/aptos-wallet-adapter';
import { useState, useEffect } from 'react'

const devnetChainId = "33";

const useCurrentNetwork = () => {

    const { connected } = useWallet();

    const [currentNetworkId, setCurrentNetworkId] = useState('');

    useEffect(() => {

        const fetchCurrentNetwork = async () => {
            // @ts-ignore
            const chainId = await window.pontem.chainId()
            setCurrentNetworkId(chainId)
        }

        if (connected) {
            fetchCurrentNetwork();
            // @ts-ignore
            window?.pontem?.onChangeNetwork((network) => {
                network?.chainId && setCurrentNetworkId(network.chainId);
            })
        }
    }, [connected]);

    return {
        correctNetwork: currentNetworkId === devnetChainId,
    }

}

export default useCurrentNetwork;