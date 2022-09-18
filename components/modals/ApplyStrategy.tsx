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
import { getCoinType } from '../../services/aptosUtils';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    applyStrategy: (amount: number) => Promise<void>;
    baseCoin: string;
    vaultAddress: string;
}

const ApplyStrategy : React.FC<Props> = ({ isOpen, onClose, applyStrategy, baseCoin, vaultAddress }) => {

    console.log(baseCoin);

    const balance = useCoinBalance(vaultAddress, baseCoin, `${vaultManager}::vault`);

    const [amount, setAmount] = useState(0);

    const onChange = (valueAsString : string) => {
        setAmount(parseFloat(valueAsString));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Apply Strategy
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
                            The vault has {balance} {getCoinType(baseCoin)}.
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
                            onClick={() => applyStrategy(amount)}
                        >
                            Apply Strategy
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ApplyStrategy