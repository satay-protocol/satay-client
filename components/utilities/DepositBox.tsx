import React from 'react'

import Link from 'next/link';

import { 
    Flex, 
    NumberInput, 
    Text, 
    VStack,
    Button,
    NumberInputField,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';

import useWallet from '../../hooks/useWallet';

import { fromAptos } from '../../services/utils';
import useCoinBalance from '../../hooks/useCoinBalance';

import { StructData } from '../../types/aptos';
import useCoinInfo from '../../hooks/useCoinInfo';

interface Props {
    coinStruct: StructData,
    coinSymbol: string,
    onDeposit: (amount : number) => Promise<void>,
    viewPath: string,
}

const DepositBox : React.FC<Props> = ({ coinStruct, coinSymbol, onDeposit, viewPath }) => {

    const { connected, account } = useWallet()

    const balance = useCoinBalance(account.address.toString(), coinStruct);

    const { decimals } = useCoinInfo(coinStruct);

    const [amount, setAmount] = React.useState(0);
    const [amountAsString, setAmountAsString] = React.useState('0.00000000');

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
        await onDeposit(Math.round(fromAptos(amount)));
        setAmountAsString('0.00000000');
        setAmount(0);
    }

    return (
        <VStack
            p={4}
            alignItems='flex-start'
            borderRadius='lg'
            bg='gray.50'
            flex={1}
        >
            <Text
                fontWeight='bold'
                fontSize='xl'
            >
                Deposit
            </Text>
            <Text
                fontSize='sm'
                fontWeight='bold'
            >
                Balance: {balance} {coinSymbol}
            </Text>
            <NumberInput
                value={amountAsString}
                onChange={handleTextChange}
                w='100%'
                max={balance}
                precision={decimals}
                defaultValue={0}
                focusBorderColor='brand.500'
            >
                <NumberInputField />
            </NumberInput>
            <Flex
                gap={4}
            >
                <Button
                    onClick={() => onClick()}
                    variant='solid'
                    colorScheme='brand'
                    disabled={!connected}
                >
                    Deposit
                </Button>
                <Link
                    href={viewPath}
                >
                    <Button
                        variant='outline'
                        colorScheme='brand'
                        rightIcon={<ArrowForwardIcon />}
                    >
                        View
                    </Button>
                </Link>
            </Flex>
        </VStack>
    )
}

export default DepositBox