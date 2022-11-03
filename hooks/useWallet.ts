import { useToast } from "@chakra-ui/react";
import { useWallet as useWalletAdapter } from "@manahippo/aptos-wallet-adapter";
import { TransactionPayload } from "aptos/src/generated";
import { useAptos } from "../contexts/AptosContext";

interface ToastMessage {
    title: string;
    description: string;
}

const useWallet = () => {

    const { client, updateClient } = useAptos();

    const { 
        account, 
        connected, 
        wallets, 
        wallet, 
        network,
        connect, 
        disconnect, 
        select, 
        signAndSubmitTransaction 
    } = useWalletAdapter();

    const toast = useToast();

    const submitTransaction = async (transaction: TransactionPayload, toastMessage: ToastMessage) => {
        await signAndSubmitTransaction(transaction)
            .then(async ({hash}) => {
                await client.waitForTransaction(hash);
                await updateClient();
                toast({
                    title: toastMessage.title,
                    description: toastMessage.description,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((e) => {
                toast({
                    title: "Transaction Failed",
                    description: e.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            })
    }

    return {
        account,
        connected,
        wallets,
        wallet,
        network,
        connect,
        disconnect,
        select,
        submitTransaction
    }
}

export default useWallet