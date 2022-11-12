import React from 'react'

import { Flex, Text, VStack } from '@chakra-ui/react'

import { Strategy } from '../../types/vaults'
import ProtocolList from '../utilities/ProtocolList'

interface Props {
    strategy: Strategy
}

const Strategy : React.FC<Props> = ({ strategy }) => {
    return (
        <Flex
            p={4}
            bg='gray.50'
            rounded='lg'
            key={strategy.strategyModule}
            w='100%'
            justifyContent='space-between'
            gap={4}
        >
            <VStack
                alignItems='flex-start'
                flex={1}
            >
                <Text
                    fontSize="sm"
                    fontWeight="bold"
                >
                    {strategy.title}
                </Text>
                <Text>
                    {strategy.description}
                </Text>
            </VStack>
            <ProtocolList 
                protocols={strategy.protocolsUsed}
            />
        </Flex>
    )
}

export default Strategy