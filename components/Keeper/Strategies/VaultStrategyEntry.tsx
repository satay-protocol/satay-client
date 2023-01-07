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
    >
        <Text
            opacity={0.7}
            fontWeight='medium'
        >
            {title}:
        </Text>
        <Text
            fontWeight='medium'
        >
            {value}
        </Text>
    </HStack>
  )
}

export default VaultStrategyEntry