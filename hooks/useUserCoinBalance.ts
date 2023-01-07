import useWallet from "./utility/useWallet";
import useCoinBalance from "./coin/useCoinBalance";

import { StructData } from "../types/aptos";

const useUserCoinBalance = (coinStruct: StructData) => {

    const { address } = useWallet();

    const balance = useCoinBalance(address, coinStruct);

    return balance;

}

export default useUserCoinBalance;