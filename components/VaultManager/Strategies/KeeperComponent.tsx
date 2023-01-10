import React from 'react'

import { Button, HStack, Box, Text } from '@chakra-ui/react'

import Copyable from '../../utilities/Copyable'
import LabeledInput from '../../utilities/LabeledInput'

import useStrategyKeeper from '../../../hooks/vaultManager/useStrategyKeeper'

import { ellipsize } from '../../../services/utils'

import { StructData } from '../../../types/aptos'

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
        <Box
            w='100%'
            display='flex'
            flexDirection='column'
            gap={4}
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
            <HStack
                w='100%'
                alignItems='flex-end'
            >
                
                <LabeledInput 
                    label='New Keeper Address'
                    value={newKeeper}
                    onChange={setNewKeeper}
                    placeholder='0x...'
                />
                <Button
                    onClick={onUpdate}
                    disabled={!newKeeper || curKeeper === newKeeper}
                    variant='ghost'
                >
                    Offer
                </Button>
            </HStack>
        </Box>
    )
}

export default KeeperComponent