import React from 'react'

import {
    HStack,
    Image,
    Text,
    Button,
    useDisclosure,
    Flex
} from '@chakra-ui/react'

import SelectStrategy from '../modals/SelectStrategy'
import StrategyRow from './StrategyRow'

import { Vault, VaultStrategyData } from '../../types/vaults'
import { structToString } from '../../services/vaults'

interface Props {
    vault: Vault,
}

const vaultStrategyData : VaultStrategyData = {
    debt_ratio: 1000,
    total_debt: 0,
    total_gain: 0,
    total_loss: 0,
    strategy_coin_type: {
        struct_name: '',
        module_name: '',
        account_address: '',
    }
}

const Vault : React.FC<Props> = ({ vault }) => {

    const { onOpen: onSelectStrategyOpen, onClose: onStrategySelectClose, isOpen : isSelectStrategyOpen } = useDisclosure();


    return (
        <>
            <SelectStrategy 
                isOpen={isSelectStrategyOpen}
                onClose={onStrategySelectClose}
                baseCoin={vault.baseCoin}
                approvedStrategies={vault.strategies.map(strategy => structToString(strategy.strategyWitness))}
                vault={vault}
            />
            <Flex
                direction='column'
                borderBottomWidth='1px'
                py={4}
                px={2}
                gap={4}
            >
                <HStack
                    width='100%'
                    borderRadius={8}
                >
                    <HStack
                        flex={1}
                    >
                        <Image
                            src={vault.logo}
                            height='40px'
                            width='40px'
                            rounded='full'
                            alt='token logo'
                        />
                        <Text
                            flex={1}
                        >
                            {vault.symbol}
                        </Text>
                    </HStack>
                    <Button
                        onClick={onSelectStrategyOpen}
                    >
                        Select Strategy
                    </Button>
                </HStack>
                <Text
                    fontWeight='bold'
                >
                    Active Strategies
                </Text>
                <Flex
                    direction='column'
                    gap={2}
                >
                    {
                        vault.strategies.map((strategy) => (
                            <StrategyRow 
                                key={`${strategy.strategyWitness.account_address}::${strategy.strategyWitness.module_name}`}
                                strategy={strategy}
                                vaultId={vault.vaultId}
                            />
                        ))
                    }
                </Flex>
            </Flex>
        </>
    )
}

export default Vault