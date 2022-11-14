import React from 'react'

import { Flex, Text, VStack } from '@chakra-ui/react'

import { Strategy } from '../../types/vaults'
import ProtocolList from '../utilities/ProtocolList'
import Link from 'next/link'
import { structToString } from '../../services/vaults'

interface Props {
    strategy: Strategy
}

const Strategy : React.FC<Props> = ({ strategy }) => {
    return (
        <Link
            href={'/products/' + strategy.productName}
        >
            <Flex
                p={4}
                bg='gray.50'
                rounded='lg'
                key={structToString(strategy.strategyWitness)}
                w='100%'
                justifyContent='space-between'
                gap={4}
                _hover={{
                    cursor: 'pointer',
                    shadow: 'lg'
                }}
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
        </Link>
    )
}

export default Strategy