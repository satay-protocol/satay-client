import React from 'react'

import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, NumberInput, NumberInputField, Text, VStack } from '@chakra-ui/react'
import useApproveStrategy from '../../../hooks/vaultManager/useApproveStrategy'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { structToString } from '../../../services/aptosUtils'
import { strategies } from '../../../data/strategies'
import { Coin } from '../../../types/coin'
import LabeledPercentageInput from '../../utilities/LabeledPercentageInput'

interface Props {
    vaultId: string,
    approvedStrategies: string[],
    baseCoin: Coin
}

const ApproveStrategy: React.FC<Props> = ({ vaultId, approvedStrategies, baseCoin }) => {

    const availableStrategies = strategies.filter(strategy => 
        structToString(strategy.baseCoin.coinStruct) === structToString(baseCoin.coinStruct) 
        && !approvedStrategies.includes(structToString(strategy.strategyWitness))
    )

    const {
        selectedWitness,
        selectWitness,
        debtRatio,
        updateDebtRatio,
        approveStrategy
    } = useApproveStrategy(vaultId)

  return (
    <VStack
        w='100%'
        spacing={4}
        alignItems='flex-start'
    >
        <Text
            fontSize='xl'
            fontWeight='semibold'
        >
            Approve Strategy
        </Text>
        <HStack
            w='100%'
            p={4}
            borderWidth={1}
            rounded='lg'
            alignItems='flex-end'
        >
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    {selectedWitness || 'Select Strategy'}
                </MenuButton>
                <MenuList>
                    {
                        availableStrategies.map((strategy, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => selectWitness(strategy.strategyWitness)}
                            >
                                {strategy.name}
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
            <LabeledPercentageInput 
                label='Debt Ratio'
                value={debtRatio}
                onChange={updateDebtRatio}
                placeholder='0%'
                min={0}
                max={100}
            />

            <Button
                onClick={approveStrategy}
                colorScheme='brand'
                disabled={!selectedWitness || !debtRatio}
            >
                Approve
            </Button>
        </HStack>
    </VStack>
  )
}

export default ApproveStrategy