import React from 'react'

import Link from 'next/link';

import { VStack, Text, Flex, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import Card from '../utilities/Card';
import ProtocolList from '../utilities/ProtocolList';

interface Props {
    title: string;
    description: string;
    protocols: string[]
}

const BlockHeader : React.FC<Props> = ({ title, description, protocols}) => {

    return (
        <Card
            gap={2}
            w='100%'
        >
            <Link
                href={`/blocks`}
            >
                <Button
                    variant='ghost'
                    size='xs'
                    mr='auto'
                    leftIcon={<ArrowBackIcon />}
                    ml={-2}
                >
                    Blocks
                </Button>
            </Link>
            <Flex
                flexDirection={{base: 'column-reverse', sm: 'row'}}
                gap={4}
            >
                <VStack
                    flex={1}
                    alignItems='flex-start'
                >
                    <Text
                        fontSize='xl'
                        fontWeight='bold'
                    >
                        {title}
                    </Text>
                    <Text>
                        {description}
                    </Text>
                </VStack>
                <ProtocolList
                    protocols={protocols}
                />
            </Flex>
        </Card>
    )
}

export default BlockHeader