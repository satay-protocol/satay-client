import React from 'react'

import Link from 'next/link';

import { 
    Flex, 
    NumberInput, 
    Text, 
    Button,
    NumberInputField,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';

import AccentedBox from './AccentedBox';

import useWallet from '../../hooks/utility/useWallet';
import useCoinBalance from '../../hooks/coin/useCoinBalance';
import useCoinInfo from '../../hooks/coin/useCoinInfo';

import { fromAptos } from '../../services/utils';

import { StructData } from '../../types/aptos';

interface Props {
    coinStruct: StructData,
    coinSymbol: string,
    onDeposit: (amount : number) => Promise<void>,
    viewPath: string,
    inDevelopment?: boolean
}

const DepositBox : React.FC<Props> = ({ coinStruct, coinSymbol, onDeposit, viewPath, inDevelopment }) => {

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
                    isDisabled={inDevelopment || !connected || amount === 0}
                >
                    {inDevelopment ? "Coming Soon" : "Deposit"}
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