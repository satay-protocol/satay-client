import React from 'react'

import DepositBox from '../utilities/DepositBox'

import { Block } from '../../types/block'

interface Props {
    block: Block
}

const BlockDepositBox: React.FC<Props> = ({ block }) => {

    const deposit = async (amount: number) => {};

    return (
        <DepositBox 
            coinStruct={block.inputCoinType}
            coinSymbol={block.inputCoinSymbol}
            onDeposit={deposit}
            viewPath={`/blocks`}
        />
    )
}

export default BlockDepositBox