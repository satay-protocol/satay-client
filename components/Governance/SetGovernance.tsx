import React from 'react'

import { Button, HStack, Text } from '@chakra-ui/react'

import Card from '../utilities/Card'
import LabeledInput from '../utilities/LabeledInput'
import AccentedBox from '../utilities/AccentedBox'

import useSetGovernance from '../../hooks/governance/useSetGovernance'

const SetGovernance = () => {

    const { newGovernanceAddress, onChange, onSubmit } = useSetGovernance();

    return (
        <Card
            gap={4}
        >
            <Text
                fontSize="xl"
                fontWeight="bold"
            >
                Set Governance
            </Text>
            <AccentedBox>
                <HStack
                    w='100%'
                    alignItems='flex-end'
                >
                    <LabeledInput 
                        label="New Governance Address"
                        value={newGovernanceAddress}
                        onChange={onChange}
                        placeholder="0x..."
                    />
                    <Button
                        colorScheme="brand"
                        onClick={onSubmit}
                        disabled={!newGovernanceAddress}
                    >
                        Offer
                    </Button>
                </HStack>
            </AccentedBox>
        </Card>
    )
}

export default SetGovernance