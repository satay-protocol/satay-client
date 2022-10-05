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
            strategies.length > 0 ? (
                strategies.map(strategy => (
                    <Box
                        p={4}
                        bg='gray.50'
                        rounded='lg'
                        key={strategy.strategyModule}
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
                ))
            ) : (
                <Text>No active strategies.</Text>
            )
        }
    </VStack>
  )
}

export default Strategies