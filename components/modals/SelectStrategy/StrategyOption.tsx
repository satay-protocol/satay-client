import React from 'react'

import { Box, Text, Button, HStack } from '@chakra-ui/react'

import { Strategy } from '../../../types/vaults'

interface Props {
    strategy: Strategy,
    approveStrategy: (strategyType: string) => Promise<void>
}

const StrategyOption : React.FC<Props> = ({ strategy, approveStrategy }) => {

    return (
        <HStack
            gap={4}
        >
            <Box>
                <Text
                    fontWeight='bold'
                >
                    {strategy.title}
                </Text>
                <Text
                    fontSize='sm'
                >
                    {strategy.description}
                </Text>
            </Box>
            <Button
                onClick={() => approveStrategy(strategy.strategyId)}
                flexShrink={0}
            >
                Select
            </Button>
        </HStack>
    )
}

export default StrategyOption