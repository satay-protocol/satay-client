import React from 'react'

import Link from 'next/link';

import { VStack, Text, Flex, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import Card from '../utilities/Card';
import ProtocolList from '../utilities/ProtocolList';

interface Props {
    name: string;
    description: string;
    protocols: string[]
}

const ProductHeader : React.FC<Props> = ({ name, description, protocols}) => {

  return (
    <Card
        gap={2}
    >
        <Link
            href={`/products`}
        >
            <Button
                variant='ghost'
                size='xs'
                mr='auto'
                leftIcon={<ArrowBackIcon />}
                ml={-2}
            >
                Strategies
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
                    {name}
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

export default ProductHeader