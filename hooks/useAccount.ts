import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter';
import { useEffect } from 'react';

const useAccount = () => {
    const { connected, connecting, account, connect, disconnect, wallets } = useWallet();

    const connectWallet = (wallet : Wallet) => {
        connect(wallet.adapter.name);
        window.localStorage.setItem('wallet', wallet.adapter.name);
    }

    const disconnectWallet = () => {
        disconnect();
        window.localStorage.removeItem('wallet');
    }

    // useEffect(() => {
    //     const wallet = window.localStorage.getItem('wallet');
    //     if (!connected && !connecting && wallet) {
    //         connect(wallet).catch(() => {});
    //     }
    // }, [connected, connecting, connect])

    return {
        connected,
        account,
        connectWallet,
        disconnectWallet,
        wallets
    }

}

export default useAccount;