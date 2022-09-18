import React, { useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    NumberInput,
    NumberInputField,
    Text,
    Button,
    VStack
  } from '@chakra-ui/react'
import useCoinBalance from '../../hooks/useCoinBalance';
import { vaultManager } from '../../data/vaultManager';
import { getTypeString } from '../../services/vaults';
import { getCoinType } from '../../services/aptosUtils';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    liquidateStrategy: (amount: number) => Promise<void>;
    strategyCoin: string;
    vaultAddress: string;
}

const LiquidateStrategy : React.FC<Props> = ({ isOpen, onClose, liquidateStrategy, strategyCoin, vaultAddress }) => {

    const balance = useCoinBalance(vaultAddress, strategyCoin, `${vaultManager}::vault`);

    const [amount, setAmount] = useState(0);

    const onChange = (valueAsString : string) => {
        setAmount(parseFloat(valueAsString));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Liquidate Strategy
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    p={4}
                >
                    <VStack
                        alignItems='flex-start'
                        gap={4}
                    >
                        <Text>
                            The vault has {balance} {getCoinType(strategyCoin)}.
                        </Text>
                        <NumberInput
                            onChange={onChange}
                            w='100%'
                            precision={8}
                            defaultValue={0}
                        >
                            <NumberInputField />
                        </NumberInput>
                        <Button
                            onClick={() => liquidateStrategy(amount)}
                        >
                            Liquidate Strategy
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default LiquidateStrategy