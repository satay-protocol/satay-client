import React, {useState} from 'react'

import {
    HStack,
    Image,
    Text,
    Button,
    useDisclosure,
    Flex
} from '@chakra-ui/react'

import { Vault, VaultStrategyData } from '../../types/vaults'
import SelectStrategy from '../modals/SelectStrategy'
import HarvestButton from './HarvestButton'

import {getStrategy} from '../../data/strategies'
import DebtRatioSlider from './DebtRatioSlider'

interface Props {
    vault: Vault,
}

const vaultStrategyData : VaultStrategyData = {
    debt_ratio: 1000,
    total_debt: 0,
    total_gain: 0,
    total_loss: 0,
    base_coin_type: {
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
                baseCoin={vault.coinType}
                approvedStrategies={vault.strategies.map(strategy => strategy.strategyModule)}
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
                            {vault.asset}
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
                        (vault.strategies.concat(getStrategy("0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac::leveraged_ditto_strategy", vaultStrategyData))).map((strategy) => (
                            <HStack
                                key={strategy.strategyModule}
                                spacing={4}
                            >
                                <Text
                                    mr='auto'
                                >
                                    {strategy.title}
                                </Text>
                                <DebtRatioSlider 
                                    strategyModule={strategy.strategyModule}
                                    vaultId={vault.vaultId}
                                    currentDebtRatio={strategy.debtRatio}
                                />
                                <HarvestButton 
                                    vaultId={vault.vaultId}
                                    strategyModule={strategy.strategyModule}
                                />
                            </HStack>
                        ))
                    }
                </Flex>
            </Flex>
        </>
    )
}

export default Vault