import { useState, useEffect } from 'react';

import { useAptos } from "../contexts/AptosContext";
import useAccount from './useAccount';

import { MoveModule } from "aptos/dist/generated";
import { useWallet } from '@manahippo/aptos-wallet-adapter';



const useTransaction = () => {
    const { client } = useAptos();

    const { account } = useAccount();

    const [module, setModule] = useState<MoveModule | null>(null);

    useEffect(() => {
        if(!module && account?.address){
            client.getAccountModule(account.address, 'message')
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    })

    return {
        module
    }

}

export default useTransaction;