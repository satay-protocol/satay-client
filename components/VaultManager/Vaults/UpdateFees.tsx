import React from 'react'

import { HStack, VStack, Text, Button } from '@chakra-ui/react'

import LabeledPercentageInput from '../../utilities/LabeledPercentageInput';

import useVaultFees from '../../../hooks/vaultManager/useVaultFees';

import { VaultFees } from '../../../types/vaults';
import { Coin } from '../../../types/coin';

const MAX_FEE_AMOUNTS = 50;

interface Props {
    baseCoin: Coin
    vaultFees: VaultFees
}


const UpdateFees: React.FC<Props> = ({ baseCoin, vaultFees }) => {

    const {
        managementFee,
        performanceFee,
        onManagementFeeChange,
        onPerformanceFeeChange,
        updateFees
    } = useVaultFees(
        baseCoin.coinStruct,
        vaultFees.managementFee,
        vaultFees.performanceFee
    );

    return (
        <VStack
            alignItems="flex-start"
            w='100%'
        >
            <Text
                fontSize='xl'
                fontWeight='semibold'
            >
                Update Fees
            </Text>
            <HStack
                alignItems='flex-end'
                w='100%'
                p={4}
                borderWidth={1}
                rounded='lg'
            >
                <LabeledPercentageInput 
                    label='Management Fee'
                    value={managementFee}
                    onChange={onManagementFeeChange}
                    placeholder='0%'
                    min={0}
                    max={MAX_FEE_AMOUNTS}
                />
                <LabeledPercentageInput
                    label='Performance Fee'
                    value={performanceFee}
                    onChange={onPerformanceFeeChange}
                    placeholder='0%'
                    min={0}
                    max={MAX_FEE_AMOUNTS}
                />
                <Button
                    onClick={() => updateFees()}
                    colorScheme='brand'
                    disabled={
                        (!managementFee || !performanceFee) ||
                        (managementFee === vaultFees.managementFee.toString() 
                        && performanceFee === vaultFees.performanceFee.toString())
                    }
                >
                    Update Fees
                </Button>
            </HStack>
        </VStack>
    )
}

export default UpdateFees