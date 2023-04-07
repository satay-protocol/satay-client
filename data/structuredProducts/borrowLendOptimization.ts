import { lendUSDCToAries, lendUSDCToAbel, lendUSDCToAptin, lendUSDCThroughSatay } from '../blocks'

import { StructuredProduct } from '../../types/structuredProduct'

const borrowLendOptimization: StructuredProduct = {
    module: {
        account_address: "0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114",
        module_name: "staked_aptos_coin",
    },
    name: "Borrow/Lend Optimization",
    description: "Lend USDC to the borrow/lend market offering the highest APY. Periodically identify and deploy assets to the highest-earning pools.",
    protocols: ["aries", 'aptin', 'abel'],
    blocks: [lendUSDCToAries, lendUSDCToAptin, lendUSDCToAbel],
    block: lendUSDCThroughSatay,
    inDevelopment: true,
    depositBox: null,
}

export default borrowLendOptimization