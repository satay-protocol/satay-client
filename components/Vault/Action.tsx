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

interface Props {
    actionName: string;
    action: (amount : number) => Promise<void>;
    asset: string;
    logo: string;
}

const Action : React.FC<Props> = ({ action, asset, logo, actionName}) => {

    const [amount, setAmount] = useState(0);

    const onChange = (valueAsString : string, valueAsNumber : number) => {
        setAmount(valueAsNumber);
    }

    return (
        <Flex
            flexDirection='column'
            gap={8}
        >
            <Flex
                gap={8}
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
                        You have 1.5681 APTOS
                    </Text>
                    <NumberInput
                        value={amount}
                        onChange={onChange}
                        w='100%'
                    >
                        <NumberInputField />
                    </NumberInput>
                    <Text
                        fontSize='sm'
                    >
                        $50.47
                    </Text>
                </VStack>
            </Flex>
            <Flex
                gap={4}
            >
                <Button
                    flex={1}
                >
                    Approve
                </Button>
                <Button
                    onClick={() => action(amount)}
                    variant='solid'
                    colorScheme='blue'
                    flex={1}
                >
                    {actionName}
                </Button>
            </Flex>
        </Flex>
    )
}

export default Action