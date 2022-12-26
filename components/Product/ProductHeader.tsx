import React from 'react'

import { HStack, VStack, Text, Flex } from '@chakra-ui/react';

import Card from '../utilities/Card';
import ProtocolList from '../utilities/ProtocolList';

interface Props {
    name: string;
    description: string;
    protocols: string[]
}

const ProductHeader : React.FC<Props> = ({ name, description, protocols}) => {
  return (
    <Card>
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