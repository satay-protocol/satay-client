import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    title: string,
    value: string,
}

const VaultStrategyEntry: React.FC<Props> = ({ title, value }) => {
  return (
    <HStack
        w='100%'
        justifyContent='space-between'
    >
        <Text
            opacity={0.7}
            fontSize='lg'
        >
            {title}:
        </Text>
        <Text
            fontWeight='medium'
            fontSize='lg'
        >
            {value}
        </Text>
    </HStack>
  )
}

export default VaultStrategyEntry