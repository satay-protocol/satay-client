import tortugaLeverage from "./tortugaLeverage";
import { dittoStakingTestnet, dittoStakingMainnet } from "./dittoLPFarming";
import borrowLendOptimization from "./borrowLendOptimization";

import { DEFAULT_NETWORK } from "../../contexts/AptosContext";

import { StructuredProduct } from "../../types/structuredProduct";
import { SupportedNetwork } from "../../types/network";
import { tortugaStaking } from "./tortugaStake";
import { dittoStaking } from "./dittoStaking";


const testnetStructuredProducts: StructuredProduct[] = [
    dittoStakingTestnet,
    tortugaLeverage,
    borrowLendOptimization,
    tortugaStaking,
    dittoStaking
]

const mainnetStructuredProducts: StructuredProduct[] = [
    dittoStakingMainnet,
]

type StructuredProductMapping = {
    [key in SupportedNetwork]: StructuredProduct[];
};

const structuredProducts: StructuredProductMapping = {
    'testnet': testnetStructuredProducts,
    // 'mainnet': mainnetStructuredProducts,
}

export const getStructuredProducts = (chainName: SupportedNetwork = DEFAULT_NETWORK) => structuredProducts[chainName] || [];

export const getStructuredProduct = (product_name: string, chainName: SupportedNetwork = DEFAULT_NETWORK) => {
    return getStructuredProducts(chainName).find((product) => product.moduleAddress.includes(product_name));
}