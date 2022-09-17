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

interface Props {
    vault: Vault,
    managerAddress: string
}

const Vault : React.FC<Props> = ({ vault, managerAddress }) => {

    const { onOpen, onClose, isOpen } = useDisclosure();

    const { approveStrategy } = useVaultStrategy(managerAddress, vault.vaultId);

    return (
        <>
            <SelectStrategy 
                isOpen={isOpen}
                onClose={onClose}
                baseCoin={vault.coinType}
                approveStrategy={approveStrategy}
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
                    onClick={onOpen}
                >
                    Select Strategy
                </Button>
                <Button>
                    Apply Strategy
                </Button>
                <Button>
                    Liquidate Strategy
                </Button>
            </HStack>
        </>
    )
}

export default Vault