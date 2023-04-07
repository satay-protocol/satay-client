import React, { useState } from 'react'

import {
    VStack,
    Image,
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';

import AccentedBox from '../utilities/AccentedBox';

import useUserCoinBalance from '../../hooks/coin/useUserCoinBalance';
import useWallet from '../../hooks/utility/useWallet';
import useCoinInfo from '../../hooks/coin/useCoinInfo';

import { round } from '../../services/utils';

import { StructData } from '../../types/aptos';
import CoinAmountInput from "../utilities/CoinAmountInput";

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

    const [amount, setAmount] = useState(0);

    const onClick = async () => {
        await action(Math.round(amount * 10**decimals));
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
                        <CoinAmountInput
                            decimals={decimals}
                            amount={amount}
                            setAmount={setAmount}
                        />
                    </VStack>
                </AccentedBox>
            </Flex>
            <Flex
                gap={4}
            >
                <Button
                    onClick={onClick}
                    variant='solid'
                    colorScheme='brand'
                    flex={1}
                    isDisabled={inDevelopment || !connected || amount === 0}
                >
                    {inDevelopment ? "Coming Soon" : actionName}
                </Button>
            </Flex>
        </Flex>
    )
}

export default Action