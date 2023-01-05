import React from 'react'

import { 
    Text,
    HStack,
    Button,
    Flex,
    NumberInput,
    NumberInputField,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    VStack
} from '@chakra-ui/react'

import Card from '../utilities/Card'

import { coins } from '../../data/coins'

import useCreateVault from '../../hooks/governance/useCreateVault'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { structToString } from '../../services/aptosUtils'

import { Coin } from '../../types/coin'

const MAX_FEE_AMOUNTS = 50;

const CreateVault : React.FC = () => {

    const createVault = useCreateVault();

    const [selectedCoin, setSelectedCoin] = React.useState<Coin | undefined>(undefined);
    const [managementFee, setManagementFee] = React.useState<string>("0");
    const [performanceFee, setPerformanceFee] = React.useState<string>("0");

    const format = (value: string) => value + '%';
    const parse = (value: string) => value.replace('%', '');
    const toFeeAmount = (value: string) => (parseInt(parse(value)) * 100).toString();

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
                <HStack
                    spacing={4}
                    alignItems='flex-end'
                >
                    <VStack
                        alignItems="flex-start"
                        spacing={fieldSpacing}
                    >
                        <Text
                            fontSize='xs'
                            fontWeight='bold'
                        >
                            Base Coin
                        </Text>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                            >
                                {selectedCoin ? selectedCoin.name : 'Select a Coin'}
                            </MenuButton>
                            <MenuList>
                                {
                                    coins.map((coin) => (
                                        <MenuItem 
                                            key={structToString(coin.coinStruct)}
                                            onClick={() => setSelectedCoin(coin)}
                                        >
                                            {coin.name}
                                        </MenuItem>
                                    ))
                                }
                            </MenuList>
                        </Menu>
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
                            Management Fee
                        </Text>
                        <NumberInput
                            value={format(managementFee)}
                            onChange={(value) => setManagementFee(parse(value))}
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
                            value={format(performanceFee)}
                            onChange={(value) => setPerformanceFee(parse(value))}
                            min={0}
                            max={MAX_FEE_AMOUNTS}
                            w='100%'
                        >
                            <NumberInputField />
                        </NumberInput>
                    </VStack>
                    
                    <Button
                        onClick={() => selectedCoin && createVault(selectedCoin, toFeeAmount(managementFee), toFeeAmount(performanceFee))}
                        colorScheme="brand"
                        disabled={!selectedCoin}
                        flexShrink={0}
                    >
                        Create
                    </Button>
                </HStack>
            </Flex>
        </Card>
    )
}

export default CreateVault