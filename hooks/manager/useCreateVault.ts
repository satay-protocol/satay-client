import { Coin } from "../../data/coins";
import useAccount from "../useAccount";



const useCreateVault = () => {

    const { account, signAndSubmitTransaction } = useAccount();

    const createVault = async (vaultName: string, coin : Coin) => {
        if(account){
            await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `0xc09622c20bdd49b2b83b7e05c264a62cfedeb45eaf5c629d0f0174917d801aef::satay::new_vault`,
                arguments: [vaultName],
                type_arguments: [coin.type]
            })
        }
    }

    return {
        createVault
    }
}

export default useCreateVault;