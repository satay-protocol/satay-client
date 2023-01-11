import { tortugaStakeAptos, tortugaCollateralAptos, repeatStakeTortugaAptos } from '../blocks'

import { StructuredProduct } from '../../types/structuredProduct'

const tortugaLeverage: StructuredProduct = {
    moduleAddress: "0x0000",
    name: "Leveraged Liquid Staking",
    description: "Stake APT on Tortuga for tAPT. Deposit tAPT into Aries Markets as collateral. Borrow APT and repeat.",
    coinStruct: "0x1::aptos_coin::AptosCoin",
    coinSymbol: "APT",
    coinSlug: "aptos",
    protocols: ["tortuga", "aries"],
    blocks: [tortugaStakeAptos, tortugaCollateralAptos, repeatStakeTortugaAptos],
    block: tortugaStakeAptos,
    inDevelopment: true
}

export default tortugaLeverage