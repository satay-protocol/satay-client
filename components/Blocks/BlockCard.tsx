import React from 'react'

import { Text, Flex, Image } from '@chakra-ui/react'

import Card from '../utilities/Card'
import BlockDepositBox from './BlockDepositBox'

import { Block } from '../../types/block'

interface Props {
    block: Block
}

const BlockCard : React.FC<Props> = ({ block }) => {

    return (
        <Card
            gap={4}
        >
            <Flex
                direction='column'
                gap={4}
            >
                <Flex 
                    direction='row'
                    flex={1}
                    justifyContent='space-between'
                >
                    <Flex
                        direction='column'
                    >
                        <Text
                            fontSize={{ base: 'lg', md: 'xl'}}
                            fontWeight='bold'
                        >
                            {block.title}
                        </Text>
                        <Text
                            fontSize={{ base: 'sm', md: 'md'}}
                            fontWeight='bold'
                            color='brand.500'
                        >
                            7% APY
                        </Text>
                    </Flex>
                    <Image 
                        src={`/${block.outputProtocol}_logo.jpeg`}
                        alt={block.outputCoinSymbol}
                        boxSize={{ base: 10, md: 12 }}
                        rounded='full'
                        display={{ base: 'none', md: 'block' }}
                    />
                </Flex>
                <BlockDepositBox 
                        block={block}
                    />
            </Flex>
        </Card>
    )
}

export default BlockCard