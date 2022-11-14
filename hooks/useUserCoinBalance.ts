import useWallet from "./useWallet";
import useCoinBalance from "./useCoinBalance";

import { StructData } from "../types/aptos";

const useUserCoinBalance = (coinStruct: StructData) => {

    const { account } = useWallet();

    const balance = useCoinBalance(account?.address?.toString() || '', coinStruct);

    return balance;

}

export default useUserCoinBalance;