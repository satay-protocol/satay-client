import { useToast } from "@chakra-ui/react";
import { useWallet as useWalletAdapter } from "@manahippo/aptos-wallet-adapter";
import { TransactionPayload, Transaction_UserTransaction } from "aptos/src/generated";
import { useAptos } from "../../contexts/AptosContext";

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

    const submitTransaction = async (transaction: TransactionPayload, toastMessage: ToastMessage): Promise<boolean> => {
        return signAndSubmitTransaction(transaction)
            .then(async ({hash}) => {
                return client.waitForTransactionWithResult(hash)
                    .then(async (transaction: Transaction_UserTransaction) => {
                        if(transaction.success){
                            await updateClient();
                            toast({
                                title: toastMessage.title,
                                description: toastMessage.description,
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            });
                            return true;
                        } else {
                            toast({
                                title: "Transaction failed",
                                description: "Transaction failed",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                            return false;
                        }
                    })
            })
            .catch((e) => {
                toast({
                    title: "Transaction Failed",
                    description: e.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return false
            })
    }

    return {
        address: account?.address?.toString() || "",
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