import React, { useEffect, useState } from 'react'

import {
    VStack,
    Image,
    Text,
    NumberInput,
    NumberInputField,
    Flex,
    Button,
    useColorModeValue
} from '@chakra-ui/react';

import { fromAptos, round } from '../../services/utils';
import useUserCoinBalance from '../../hooks/useUserCoinBalance';
import useWallet from '../../hooks/useWallet';

import { StructData } from '../../types/aptos';
import useCoinInfo from '../../hooks/useCoinInfo';
import AccentedBox from '../utilities/AccentedBox';

interface Props {
    actionName: string;
    action: (amount : number) => Promise<void>;
    symbol: string;
    logo: string;
    coinStruct: StructData,
    inDevelopment?: boolean
}

const Action : React.FC<Props> = ({ action, symbol, logo, actionName, coinStruct, inDevelopment }) => {

    const { connected } = useWallet();

    const balance = useUserCoinBalance(coinStruct);

    const { decimals } = useCoinInfo(coinStruct);

    const zeroWithDecimals = `0.${'0'.repeat(decimals)}`;

    const [amountAsString, setAmountAsString] = useState(zeroWithDecimals);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if(amount === 0) {
            setAmountAsString(zeroWithDecimals);
        }
    }, [decimals, amount, zeroWithDecimals]);

    const handleTextChange = (value : string) => {
        setAmountAsString(value);
        if(value == ""){
            setAmount(0);
        } else if(value[value.length-1] !== "."){
            setAmount(parseFloat(value));
        }
    }

    const onClick = async () => {
        await action(Math.round(amount * 10**decimals));
        setAmountAsString(zeroWithDecimals);
        setAmount(0);
    }

    const onFocus = () => {
        if(amount === 0){
            setAmountAsString("");
        }
    }

    return (
        <Flex
            flexDirection='column'
            gap={4}
        >
            <Flex
                gap={4}
            >
                <AccentedBox>
                    <VStack
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
                </AccentedBox>
                <AccentedBox
                    flex={1}
                >
                    <VStack
                        alignItems='flex-start'
                        spacing={4}
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
                            precision={decimals}
                            defaultValue={0}
                            focusBorderColor='brand.500'
                            onFocus={onFocus}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </VStack>
                </AccentedBox>
            </Flex>
            <Flex
                gap={4}
            >
                <Button
                    onClick={() => onClick()}
                    variant='solid'
                    colorScheme='brand'
                    flex={1}
                    disabled={inDevelopment || !connected || amount === 0}
                >
                    {inDevelopment ? "Coming Soon" : actionName}
                </Button>
            </Flex>
        </Flex>
    )
}

export default Action