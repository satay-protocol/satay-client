import React from 'react'

import { 
    Text,
    HStack,
    Select,
    Button,
    Input,
    Flex
} from '@chakra-ui/react'

import Card from '../utilities/Card'

import { Coin, coins } from '../../data/coins'

import useCreateVault from '../../hooks/manager/useCreateVault'

const CreateVault : React.FC = () => {

    const { createVault } = useCreateVault();

    const [selectedCoin, setSelectedCoin] = React.useState<Coin | undefined>(undefined);
    const [vaultName, setVaultName] = React.useState<string>('');


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
                >
                    <Input 
                        placeholder="Vault Name"
                        value={vaultName}
                        onChange={(e) => setVaultName(e.target.value)}
                    />
                    <Select 
                        placeholder='Base Coin'
                        onChange={(e) => setSelectedCoin(coins.find(coin => coin.type === e.target.value))}
                    >
                        {
                            coins.map((coin) => (
                                <option 
                                    key={coin.type} 
                                    value={coin.type}
                                    label={coin.name}
                                >
                                    {coin.name}
                                </option>
                            ))
                        }
                    </Select>
                    <Button
                        onClick={() => selectedCoin && createVault(vaultName, selectedCoin)}
                        colorScheme="brand"
                        disabled={!selectedCoin || !vaultName}
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