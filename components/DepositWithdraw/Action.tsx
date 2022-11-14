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

import { fromAptos, round } from '../../services/utils';
import useUserCoinBalance from '../../hooks/useUserCoinBalance';
import useWallet from '../../hooks/useWallet';

import { StructData } from '../../types/aptos';

interface Props {
    actionName: string;
    action: (amount : number) => Promise<void>;
    symbol: string;
    logo: string;
    coinStruct: StructData
}

const Action : React.FC<Props> = ({ action, symbol, logo, actionName, coinStruct}) => {

    const { connected } = useWallet();

    const balance = useUserCoinBalance(coinStruct);

    const [amountAsString, setAmountAsString] = useState('0.00000000');
    const [amount, setAmount] = useState(0);

    const handleTextChange = (value : string) => {
        setAmountAsString(value);
        if(value == ""){
            setAmountAsString('0.00000000');
            setAmount(0);
        } else if(value[value.length-1] !== "."){
            setAmount(parseFloat(value));
        }
    }

    const onClick = async () => {
        await action(Math.round(fromAptos(amount)));
        setAmountAsString('0.00000000');
        setAmount(0);
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
                </VStack>
                <VStack
                    alignItems='flex-start'
                    spacing={4}
                    p={4}
                    borderRadius='lg'
                    bg='gray.50'
                    flex={1}
                >
                    <VStack
                        spacing={0}
                        alignItems='flex-start'
                    >
                        <Text
                            fontSize='sm'
                            fontWeight='semibold'
                        >
                            Balance
                        </Text>
                        <Text
                            fontSize='sm'
                            fontWeight='bold'
                        >
                            {round(balance, 3)} {symbol}
                        </Text>
                    </VStack>
                    <NumberInput
                        value={amountAsString}
                        onChange={handleTextChange}
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