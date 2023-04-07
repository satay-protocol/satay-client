import React from 'react'

import DepositWithdraw from '../DepositWithdraw'
import {NewBlock} from "../../types/block";
import {newBlockToOldBlock} from "../../services/blocks";

interface Props {
    block: NewBlock
}

const BlockProductDepositWithdraw: React.FC<Props> = ({ block }) => {

    const { deposit, withdraw } = block.blockHook();

    return (
        <DepositWithdraw
            deposit={deposit}
            withdraw={withdraw}
            // TEMPORARY
            block={newBlockToOldBlock(block)}
        />
    )
}

export default BlockProductDepositWithdraw