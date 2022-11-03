import React from 'react'

import { Flex, HStack, Text, VStack, Image } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { Strategy } from '../../types/vaults'

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
        >
            <VStack
                alignItems='flex-start'
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
            <HStack>
                {
                    strategy.protocolsUsed.map((protocol, index) => (
                        <>
                            <Image
                                src={`/${protocol}_logo.jpeg`}
                                alt={protocol}
                                w={"48px"}
                                h={"48px"}
                                rounded='full'
                            />
                            {
                                index !== strategy.protocolsUsed.length - 1 && (
                                    <AddIcon />
                                )
                            }
                        </>
                    ))
                }
            </HStack>
        </Flex>
    )
}

export default Strategy