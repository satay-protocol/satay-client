import React from 'react'

import { Text, VStack } from '@chakra-ui/react'

import { Strategy } from '../../types/strategy'
import ProtocolList from '../utilities/ProtocolList'
import Link from 'next/link'
import AccentedBox from '../utilities/AccentedBox'

interface Props {
    strategy: Strategy
}

const Strategy : React.FC<Props> = ({ strategy }) => {
    return (
        <Link
            href={'/products' + (strategy.productName ? `/${strategy.productName}` : '')}
        >
            <AccentedBox
                w='100%'
                display='flex'
                justifyContent='space-between'
                flexDirection={{ base: 'column-reverse', md: 'row' }}
                gap={4}
                _hover={{
                    cursor: 'pointer',
                    shadow: 'md'
                }}
                transition='all 0.2s'
            >
                <VStack
                    alignItems='flex-start'
                    flex={1}
                >
                    <Text
                        fontSize="sm"
                        fontWeight="bold"
                    >
                        {strategy.name}
                    </Text>
                    <Text>
                        {strategy.description}
                    </Text>
                </VStack>
                <ProtocolList 
                    protocols={strategy.protocols}
                />
            </AccentedBox>
        </Link>
    )
}

export default Strategy