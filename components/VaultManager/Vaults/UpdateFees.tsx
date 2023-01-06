import React from 'react'

import { HStack, VStack, Text, NumberInput, NumberInputField, Button } from '@chakra-ui/react'
import useVaultFees from '../../../hooks/vaultManager/useVaultFees';
import { VaultFees } from '../../../types/vaults';

const MAX_FEE_AMOUNTS = 50;
const fieldSpacing = 1;

interface Props {
    vaultId: string
    vaultFees: VaultFees
}


const UpdateFees: React.FC<Props> = ({ vaultId, vaultFees }) => {

    const {
        managementFee,
        performanceFee,
        updateManagementFee,
        updatePerformanceFee,
        updateFees
    } = useVaultFees(
        vaultId,
        vaultFees.managementFee,
        vaultFees.performanceFee
    );

    return (
        <HStack
            alignItems='flex-end'
            w='100%'
        >
            <VStack
                alignItems="flex-start"
                spacing={fieldSpacing}
                flex={1}
            >
                <Text
                    fontSize='xs'
                    fontWeight='bold'
                >
                    Management Fee
                </Text>
                <NumberInput
                    value={managementFee}
                    onChange={(value) => updateManagementFee(value)}
                    min={0}
                    max={MAX_FEE_AMOUNTS}
                    w='100%'
                >
                    <NumberInputField />
                </NumberInput>
            </VStack>
            <VStack
                alignItems="flex-start"
                spacing={fieldSpacing}
                flex={1}
            >
                <Text
                    fontSize='xs'
                    fontWeight='bold'
                >
                    Performance Fee
                </Text>
                <NumberInput
                    value={performanceFee}
                    onChange={(value) => updatePerformanceFee(value)}
                    min={0}
                    max={MAX_FEE_AMOUNTS}
                    w='100%'
                >
                    <NumberInputField />
                </NumberInput>
            </VStack>
            <Button
                onClick={() => updateFees()}
                colorScheme='brand'
            >
                Update Fees
            </Button>
        </HStack>
    )
}

export default UpdateFees