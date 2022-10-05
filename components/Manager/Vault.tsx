import React, {useState} from 'react'

import {
    HStack,
    Image,
    Text,
    Button,
    useDisclosure,
    Flex
} from '@chakra-ui/react'

import { Vault, Strategy } from '../../types/vaults'
import useVaultStrategy from '../../hooks/manager/useVaultStrategy'
import SelectStrategy from '../modals/SelectStrategy'
import ApplyStrategy from '../modals/ApplyStrategy'
import LiquidateStrategy from '../modals/LiquidateStrategy'
import VaultStrategyModals from './VaultStrategyModals'

interface Props {
    vault: Vault,
}

const Vault : React.FC<Props> = ({ vault }) => {

    const { onOpen: onSelectStrategyOpen, onClose: onStrategySelectClose, isOpen : isSelectStrategyOpen } = useDisclosure();
    const { onOpen: onApplyStrategyOpen, onClose: onApplyStrategyClose, isOpen : isApplyStrategyOpen } = useDisclosure();
    const { onOpen: onLiquidateStrategyOpen, onClose: onLiquidateStrategyClose, isOpen : isLiquidateStrategyOpen } = useDisclosure();

    
    const [activeStrategy, setActiveStrategy] = useState<Strategy | null>(null);

    const onApplyOpen = (strategy: Strategy) => {
        setActiveStrategy(strategy);
        onApplyStrategyOpen();
    }

    const onLiquidateOpen = (strategy: Strategy) => {
        setActiveStrategy(strategy);
        onLiquidateStrategyOpen();
    }

    return (
        <>
            <SelectStrategy 
                isOpen={isSelectStrategyOpen}
                onClose={onStrategySelectClose}
                baseCoin={vault.coinType}
                approvedStrategies={vault.strategies.map(strategy => strategy.strategyModule)}
                vault={vault}
            />
            {
                activeStrategy !== null && (
                    <VaultStrategyModals 
                        isApplyStrategyOpen={isApplyStrategyOpen}
                        onApplyStrategyClose={onApplyStrategyClose}
                        isLiquidateStrategyOpen={isLiquidateStrategyOpen}
                        onLiquidateStrategyClose={onLiquidateStrategyClose}
                        vault={vault}
                        activeStrategy={activeStrategy}
                    />
                )
            }
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
                        vault.strategies.map((strategy) => (
                            <HStack
                                key={strategy.strategyModule}
                            >
                                <Text
                                    mr='auto'
                                >
                                    {strategy.title}
                                </Text>
                                <Button
                                    onClick={() => onApplyOpen(strategy)}
                                >
                                    Apply Strategy
                                </Button>
                                <Button
                                    onClick={() => onLiquidateOpen(strategy)}
                                >
                                    Liquidate Strategy
                                </Button>
                                
                            </HStack>
                        ))
                    }
                </Flex>
            </Flex>
        </>
    )
}

export default Vault