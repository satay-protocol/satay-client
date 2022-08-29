import React from 'react'

import { 
    VStack,
    Text,
    Box
} from '@chakra-ui/react'
import { Strategy } from '../../types/vaults'

interface Props {
    strategies: Strategy[]
}

const Strategies: React.FC<Props> = ({ strategies }) => {
  return (
    <VStack
        alignItems='flex-start'
    >
        <Text
            fontSize="xl"
            fontWeight="bold"
        >
            Strategies
        </Text>
        {
            strategies.map((strategy, index) => {
                return (
                    <Box
                        key={index}
                        p={4}
                        bg='gray.50'
                        rounded='lg'
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
                    </Box>
                )
            })
        }
    </VStack>
  )
}

export default Strategies