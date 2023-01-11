import { tortugaStakeAptos, tortugaCollateralAptos, repeatStakeTortugaAptos, lendUSDCToAries, lendUSDCToAbel, lendUSDCToAptin, lendUSDCThroughSatay } from '../blocks'

import { StructuredProduct } from '../../types/structuredProduct'

const borrowLendOptimization: StructuredProduct = {
    moduleAddress: "0x111",
    name: "Borrow/Lend Optimization",
    description: "Lend USDC to the borrow/lend market offering the highest APY. Periodically identify and deploy assets to the highest-earning pools.",
    protocols: ["aries", 'aptin', 'abel'],
    blocks: [lendUSDCToAries, lendUSDCToAptin, lendUSDCToAbel],
    block: lendUSDCThroughSatay,
    inDevelopment: true
}

export default borrowLendOptimization