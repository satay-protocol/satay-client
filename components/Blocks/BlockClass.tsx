import React from 'react'

import {Button, Flex, Text, VStack} from '@chakra-ui/react'

import Card from '../utilities/Card'
import BlocksView from './BlocksView'
import {Block} from "../../types/block";

interface Props {
    title: string
    description: string
    link: string
    blocks: Block[]
}

const BorrowLend: React.FC<Props> = ({ blocks, title, description, link }) => {
    return (
        <Card>
            <Flex
                flexDirection='column'
                gap={4}
            >
                <Flex
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <VStack
                        alignItems="flex-start"
                    >
                        <Text
                            fontSize='2xl'
                            fontWeight='bold'
                        >
                            {title}
                        </Text>
                        <Text>
                            {description}
                        </Text>
                    </VStack>
                    <a
                        href={link}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <Button
                            colorScheme='brand'
                            variant='ghost'
                        >
                            Learn More
                        </Button>
                    </a>
                </Flex>
                <BlocksView
                    blocks={blocks}
                />
            </Flex>
        </Card>
    )
}

export default BorrowLend