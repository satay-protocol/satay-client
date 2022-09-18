import { useWallet } from "@manahippo/aptos-wallet-adapter";

import useCoinBalance from "./useCoinBalance";

const useUserCoinBalance = (coinAddress: string) => {

    const { account } = useWallet();

    const balance = useCoinBalance(account?.address?.toString() || '', coinAddress);

    return balance;

}

export default useUserCoinBalance;