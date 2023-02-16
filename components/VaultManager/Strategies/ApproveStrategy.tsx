import React from 'react'

import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import LabeledPercentageInput from '../../utilities/LabeledPercentageInput'

import useApproveStrategy from '../../../hooks/vaultManager/useApproveStrategy'

import { structToString } from '../../../services/aptosUtils'

import { strategies } from '../../../data/strategies'

import { Coin } from '../../../types/coin'

interface Props {
    approvedStrategies: string[],
    baseCoin: Coin
}

const ApproveStrategy: React.FC<Props> = ({ approvedStrategies, baseCoin }) => {

    const availableStrategies = strategies.filter(strategy => 
        structToString(strategy.baseCoin.coinStruct) === structToString(baseCoin.coinStruct) 
        && !approvedStrategies.includes(structToString(strategy.strategyWitness))
    )

    const {
        selectedStrategy,
        selectStrategy,
        debtRatio,
        updateDebtRatio,
        approveStrategy
    } = useApproveStrategy()

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
                    {selectedStrategy?.name || 'Select Strategy'}
                </MenuButton>
                <MenuList>
                    {
                        availableStrategies.map((strategy, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => selectStrategy(strategy)}
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
                disabled={!selectedStrategy || !debtRatio}
            >
                Approve
            </Button>
        </HStack>
    </VStack>
  )
}

export default ApproveStrategy