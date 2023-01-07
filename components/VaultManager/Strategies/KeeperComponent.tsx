import { Button, HStack, Input, Text } from '@chakra-ui/react'
import React from 'react'
import useStrategyKeeper from '../../../hooks/vaultManager/useStrategyKeeper'
import { ellipsize } from '../../../services/utils'

import { StructData } from '../../../types/aptos'
import Copyable from '../../utilities/Copyable'

interface Props {
    vaultAddress: string,
    strategyWitess: StructData
}

const KeeperComponent: React.FC<Props> = ({ vaultAddress, strategyWitess }) => {

    const {
        curKeeper,
        newKeeper,
        setNewKeeper,
        onUpdate
    } = useStrategyKeeper(strategyWitess, vaultAddress);

    return (
        <HStack
            w='100%'
        >
            <HStack>
                <Text>
                    Keeper:
                </Text>
                <Copyable 
                    copyText={curKeeper}
                    display={ellipsize(curKeeper)}
                />
            </HStack>
            <Input 
                value={newKeeper}
                onChange={(e) => setNewKeeper(e.target.value)}
                placeholder={'New Keeper Address'}
                flex={1}
            />
            <Button
                onClick={onUpdate}
            >
                Update
            </Button>
        </HStack>
    )
}

export default KeeperComponent