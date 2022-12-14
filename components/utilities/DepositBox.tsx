import React from 'react'

import Link from 'next/link';

import { 
    Flex, 
    NumberInput, 
    Text, 
    VStack,
    Button,
    NumberInputField,
    useColorModeValue
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';

import useWallet from '../../hooks/useWallet';

import { fromAptos } from '../../services/utils';
import useCoinBalance from '../../hooks/useCoinBalance';

import { StructData } from '../../types/aptos';
import useCoinInfo from '../../hooks/useCoinInfo';
import AccentedBox from './AccentedBox';

interface Props {
    coinStruct: StructData,
    coinSymbol: string,
    onDeposit: (amount : number) => Promise<void>,
    viewPath: string,
}

const DepositBox : React.FC<Props> = ({ coinStruct, coinSymbol, onDeposit, viewPath }) => {

    const { connected, address } = useWallet()

    const balance = useCoinBalance(address, coinStruct);

    const { decimals } = useCoinInfo(coinStruct);

    const [amount, setAmount] = React.useState(0);
    const [amountAsString, setAmountAsString] = React.useState('0.00000000');

    const handleTextChange = (value : string) => {
        setAmountAsString(value);
        if(value == ""){
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

    const onFocus = () => {
        if(amount === 0){
            setAmountAsString("");
        }
    }



    return (
        <AccentedBox
            flex={1}
            display='flex'
            flexDirection='column'
            gap={2}
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
                onFocus={onFocus}
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
                    disabled={!connected || amount === 0}
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
                        View More
                    </Button>
                </Link>
            </Flex>
        </AccentedBox>
    )
}

export default DepositBox