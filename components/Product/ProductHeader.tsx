import React from 'react'

import { HStack, VStack, Text } from '@chakra-ui/react';

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
        <HStack>
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
        </HStack>
    </Card>
  )
}

export default ProductHeader