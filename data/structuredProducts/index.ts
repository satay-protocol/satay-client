import tortugaLeverage from "./tortugaLeverage";
import { dittoStakingTestnet, dittoStakingMainnet } from "./dittoLPFarming";

import { StructuredProduct } from "../../types/structuredProduct";
import { DEFAULT_NETWORK, SupportedNetwork } from "../../services/aptosClients";

const devnetStructuredProducts = [];

const testnetStructuredProducts: StructuredProduct[] = [
    dittoStakingTestnet,
    tortugaLeverage
]

const mainnetStructuredProducts: StructuredProduct[] = [
    dittoStakingMainnet,
]

type StructuredProductMapping = {
    [key in SupportedNetwork]: StructuredProduct[];
};

const structuredProducts: StructuredProductMapping = {
    'devnet': devnetStructuredProducts,
    'testnet': testnetStructuredProducts,
    'mainnet': mainnetStructuredProducts,
}

export const getStructuredProducts = (chainName: SupportedNetwork = DEFAULT_NETWORK) => structuredProducts[chainName] || [];

export const getStructuredProduct = (product_name: string, chainName: SupportedNetwork = DEFAULT_NETWORK) => {
    return getStructuredProducts(chainName).find((product) => product.moduleAddress.includes(product_name));
}