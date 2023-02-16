import React from 'react'

import { 
    Text,
    HStack,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    VStack
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import Card from '../utilities/Card'
import LabeledPercentageInput from '../utilities/LabeledPercentageInput'
import AccentedBox from '../utilities/AccentedBox'

import useCreateVault from '../../hooks/governance/useCreateVault'

import { structToString } from '../../services/aptosUtils'

import { coins } from '../../data/coins'

const MAX_FEE_AMOUNTS = 50;

const CreateVault : React.FC = () => {

    const {
        coin,
        managementFee,
        performanceFee,
        onChangeCoin,
        onChangeManagementFee,
        onChangePerformanceFee,
        onCreateVault
    } = useCreateVault();

    const fieldSpacing = 1;

    return (
        <Card>
            <Flex
                direction="column"
                gap={4}
            >
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                >
                    Create Vault
                </Text>
                <AccentedBox>
                    <HStack
                        alignItems='flex-end'
                    >
                        <VStack
                            alignItems="flex-start"
                            spacing={fieldSpacing}
                        >
                            <Text
                                fontSize='xs'
                                fontWeight='medium'
                            >
                                Base Coin
                            </Text>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    {coin ? coin.name : 'Select a Coin'}
                                </MenuButton>
                                <MenuList>
                                    {
                                        coins.map((coin) => (
                                            <MenuItem 
                                                key={structToString(coin.coinStruct)}
                                                onClick={() => onChangeCoin(coin)}
                                            >
                                                {coin.name}
                                            </MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </Menu>
                        </VStack>
                        <LabeledPercentageInput 
                            label="Management Fee"
                            value={managementFee}
                            onChange={onChangeManagementFee}
                            placeholder='0%'
                            min={0}
                            max={MAX_FEE_AMOUNTS}
                        />
                        <LabeledPercentageInput
                            label="Performance Fee"
                            value={performanceFee}
                            onChange={onChangePerformanceFee}
                            placeholder='0%'
                            min={0}
                            max={MAX_FEE_AMOUNTS}
                        />
                        <Button
                            onClick={onCreateVault}
                            colorScheme="brand"
                            disabled={!coin || !managementFee || !performanceFee}
                            flexShrink={0}
                        >
                            Create
                        </Button>
                    </HStack>
                </AccentedBox>
            </Flex>
        </Card>
    )
}

export default CreateVault