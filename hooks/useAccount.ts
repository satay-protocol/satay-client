import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter';

const useAccount = () => {
    const { connected, account, connect, disconnect, signAndSubmitTransaction, wallets } = useWallet();

    const connectWallet = (wallet : Wallet) => {
        connect(wallet.adapter.name);
    }

    const disconnectWallet = () => {
        disconnect();
    }

    return {
        connected,
        account,
        signAndSubmitTransaction,
        connectWallet,
        disconnectWallet,
        wallets
    }

}

export default useAccount;