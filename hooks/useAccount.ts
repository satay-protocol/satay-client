import { useWallet, Wallet, WalletName } from '@manahippo/aptos-wallet-adapter';
import { useEffect } from 'react';

const useAccount = () => {
    const { connected, connecting, account, connect, disconnect, select, wallets } = useWallet();

    const connectWallet = (wallet : Wallet) => {
        connect(wallet.adapter.name);
        window.localStorage.setItem('wallet', wallet.adapter.name);
    }

    const disconnectWallet = () => {
        disconnect();
        window.localStorage.removeItem('wallet');
    }

    useEffect(() => {
        const wallet = window.localStorage.getItem('wallet') as WalletName;
        if (!connected && !connecting && wallet) {
            select(wallet)
        }
    }, [connected, connecting, connect])

    return {
        connected,
        account,
        connectWallet,
        disconnectWallet,
        wallets
    }

}

export default useAccount;