import React from 'react'

import { 
    VStack,
    Text,
    Box
} from '@chakra-ui/react'
import { Strategy } from '../../types/vaults'

interface Props {
    strategy: Strategy | null
}

const Strategies: React.FC<Props> = ({ strategy }) => {
  return (
    <VStack
        alignItems='flex-start'
    >
        <Text
            fontSize="xl"
            fontWeight="bold"
        >
            Strategy
        </Text>
        {
            strategy ? (
                <Box
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
            ) : (
                <Text>No active strategy.</Text>
            )
        }
        
    </VStack>
  )
}

export default Strategies