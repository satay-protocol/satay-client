import useWallet from "./useWallet";
import useCoinBalance from "./useCoinBalance";

const useUserCoinBalance = (coinAddress: string) => {

    const { account } = useWallet();

    const balance = useCoinBalance(account?.address?.toString() || '', coinAddress);

    return balance;

}

export default useUserCoinBalance;