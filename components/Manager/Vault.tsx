import React from 'react'

import {
    HStack,
    Image,
    Text,
    Button,
    useDisclosure
} from '@chakra-ui/react'

import { Vault } from '../../types/vaults'
import useVaultStrategy from '../../hooks/manager/useVaultStrategy'
import SelectStrategy from '../modals/SelectStrategy'
import ApplyStrategy from '../modals/ApplyStrategy'
import LiquidateStrategy from '../modals/LiquidateStrategy'

interface Props {
    vault: Vault,
    managerAddress: string
}

const Vault : React.FC<Props> = ({ vault, managerAddress }) => {

    const { onOpen: onSelectStrategyOpen, onClose: onStrategySelectClose, isOpen : isSelectStrategyOpen } = useDisclosure();
    const { onOpen: onApplyStrategyOpen, onClose: onApplyStrategyClose, isOpen : isApplyStrategyOpen } = useDisclosure();
    const { onOpen: onLiquidateStrategyOpen, onClose: onLiquidateStrategyClose, isOpen : isLiquidateStrategyOpen } = useDisclosure();

    const { approveStrategy, applyStrategy, liquidateStrategy } = useVaultStrategy(managerAddress, vault.vaultId, vault.strategyString);

    return (
        <>
            <SelectStrategy 
                isOpen={isSelectStrategyOpen}
                onClose={onStrategySelectClose}
                baseCoin={vault.coinType}
                approveStrategy={approveStrategy}
            />
            <ApplyStrategy 
                isOpen={isApplyStrategyOpen}
                onClose={onApplyStrategyClose}
                baseCoin={vault.coinType}
                vaultAddress={vault.vaultAddress}
                applyStrategy={applyStrategy}
            />
            <LiquidateStrategy
                isOpen={isLiquidateStrategyOpen}
                onClose={onLiquidateStrategyClose}
                strategyCoin={"0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::lp::LP<0x1::aptos_coin::AptosCoin, 0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::coins::USDT>"}
                vaultAddress={vault.vaultAddress}
                liquidateStrategy={liquidateStrategy}
            />
            <HStack
                width='100%'
                borderBottomWidth='1px'
                py={4}
                px={2}
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
                <Button
                    onClick={onApplyStrategyOpen}
                >
                    Apply Strategy
                </Button>
                <Button
                    onClick={onLiquidateStrategyOpen}
                >
                    Liquidate Strategy
                </Button>
            </HStack>
        </>
    )
}

export default Vault