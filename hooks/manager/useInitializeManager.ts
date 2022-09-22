import { useWallet } from "@manahippo/aptos-wallet-adapter";

const useInitializeManager = () => {

    const { account, signAndSubmitTransaction } = useWallet();

    const initialize = async () => {
        if(account){
            await signAndSubmitTransaction({
                type: 'entry_function_payload',
                function: `0xc09622c20bdd49b2b83b7e05c264a62cfedeb45eaf5c629d0f0174917d801aef::satay::initialize`,
                arguments: [],
                type_arguments: []
            }, {
                max_gas_amount: '5000',
                gas_unit_price: '1000',
            })
        }
    }

    return {
        initialize
    }
}

export default useInitializeManager;