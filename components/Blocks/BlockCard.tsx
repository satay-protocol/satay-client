import React from 'react'

import { Text, Flex, Image } from '@chakra-ui/react'

import { Block } from '../../types/block'

interface Props {
    block: Block
}

const BlockCard : React.FC<Props> = ({ block }) => {

    return (
        <Flex
            direction='column'
            gap={4}
            p={4}
            rounded='lg'
            borderWidth={0.5}
            borderColor='brand.500'
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
                        {block.apy}% APY
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
            <Text>
                {block.description}
            </Text>
            {/* <BlockDepositBox
                block={block}
            /> */}
        </Flex>
    )
}

export default BlockCard