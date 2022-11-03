import React, { useState } from 'react'

import {
    VStack,
    Image,
    Text,
    NumberInput,
    NumberInputField,
    Flex,
    Button
} from '@chakra-ui/react';

import { fromAptos } from '../../services/utils';
import useUserCoinBalance from '../../hooks/useUserCoinBalance';
import useWallet from '../../hooks/useWallet';

interface Props {
    actionName: string;
    action: (amount : number) => Promise<void>;
    asset: string;
    logo: string;
    coinAddress: string
}

const Action : React.FC<Props> = ({ action, asset, logo, actionName, coinAddress}) => {

    const { connected } = useWallet();

    const balance = useUserCoinBalance(coinAddress);

    const [amount, setAmount] = useState(0);

    const onChange = (valueAsString : string) => {
        setAmount(parseFloat(valueAsString));
    }

    const onClick = async () => {
        await action(Math.round(fromAptos(amount)));
    }

    return (
        <Flex
            flexDirection='column'
            gap={4}
        >
            <Flex
                gap={4}
            >
                <VStack
                    bg='gray.50'
                    p={4}
                    borderRadius='lg'
                    minH='100%'
                    justifyContent='center'
                >
                    <Image 
                        src={logo}
                        height='60px'
                        width='60px'
                        rounded='full'
                        alt='token logo'
                    />
                    <Text>
                        {asset}
                    </Text>
                </VStack>
                <VStack
                    alignItems='flex-start'
                    spacing={4}
                    p={4}
                    borderRadius='lg'
                    bg='gray.50'
                    flex={1}
                >
                    <Text
                        fontSize='sm'
                    >
                        You have {balance} {asset}
                    </Text>
                    <NumberInput
                        onChange={onChange}
                        w='100%'
                        max={balance}
                        precision={8}
                        defaultValue={0}
                        focusBorderColor='brand.500'
                    >
                        <NumberInputField />
                    </NumberInput>
                </VStack>
            </Flex>
            <Flex
                gap={4}
            >
                <Button
                    onClick={() => onClick()}
                    variant='solid'
                    colorScheme='brand'
                    flex={1}
                    disabled={!connected}
                >
                    {actionName}
                </Button>
            </Flex>
        </Flex>
    )
}

export default Action