import { tortugaStakeAptos, tortugaCollateralAptos, repeatStakeTortugaAptos } from '../blocks'

import { StructuredProduct } from '../../types/structuredProduct'

const tortugaLeverage: StructuredProduct = {
    moduleAddress: "0x0000",
    name: "Leveraged Liquid Staking",
    description: "Stake APT on Tortuga for tAPT to earn APT emissions. Deposit tAPT into Aries Markets as collateral to borrow APT. Stake borrowed APT on Tortuga and repeat.",
    protocols: ["tortuga", "aries"],
    blocks: [tortugaStakeAptos, tortugaCollateralAptos, repeatStakeTortugaAptos],
    block: tortugaStakeAptos,
    inDevelopment: true
}

export default tortugaLeverage