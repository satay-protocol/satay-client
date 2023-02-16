import { AiOutlineSwap } from "react-icons/ai"
import { BiCodeBlock } from "react-icons/bi"
import { CiVault } from "react-icons/ci"

import { IconType } from "react-icons"

export interface OfferingType {
    icon: IconType
    title: string
    description: string
    route: string
}

export const offeringsData: OfferingType[] = [
    {
        icon: CiVault,
        title: 'Automated Vaults',
        description: 'Vaults optimize allocations to Blocks and Strategies to maximize yield.',
        route: '/vaults'
    },
    {
        icon: AiOutlineSwap,
        title: 'Strategies',
        description: 'Strategies are compositions of Blocks that facilitate multi-protocol yield aggregation.',
        route: '/products'
    },
    {
        icon: BiCodeBlock,
        title: 'Blocks',
        description: 'Blocks are composable DeFi primitive operations through trusted third-party protocols.',
        route: '/blocks'
    },
]