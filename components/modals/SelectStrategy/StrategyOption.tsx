import React from 'react'

import { Box, Text, Button, HStack } from '@chakra-ui/react'

import { StrategyInfo, Vault } from '../../../types/vaults'
import useInitializeStrategy from '../../../hooks/manager/useInitializeStrategy'

interface Props {
    strategy: StrategyInfo,
    vault: Vault,
}

const StrategyOption : React.FC<Props> = ({ strategy, vault }) => {

    const { initialize } = useInitializeStrategy(strategy.strategyModule, vault.vaultId);

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
                onClick={() => initialize()}
                flexShrink={0}
            >
                Select
            </Button>
        </HStack>
    )
}

export default StrategyOption