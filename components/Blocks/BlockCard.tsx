import React from 'react'

import {Text, Flex, Image, useColorMode} from '@chakra-ui/react'

import {NewBlock} from '../../types/block'
import Link from "next/link";

interface Props {
    block: NewBlock
}

const BlockCard : React.FC<Props> = ({ block }) => {

    const colorMode = useColorMode();

    return (
        <Link
            href={`/blocks/${block.module.module_name}`}
        >
            <Flex
                direction='column'
                gap={4}
                p={4}
                rounded='lg'
                borderWidth={0.5}
                borderColor='brand.500'
                transition='all ease-in-out 0.2s'
                _hover={{
                    bg: colorMode.colorMode === 'light' ? 'blackAlpha.50' : 'whiteAlpha.50',
                    cursor: 'pointer'
                }}
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
                        src={`/${block.outputCoin.protocol}_logo.jpeg`}
                        alt={block.outputCoin.symbol}
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
        </Link>
    )
}

export default BlockCard