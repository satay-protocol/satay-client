import React from 'react'

import { 
    HStack, 
    VStack,
    Image 
} from '@chakra-ui/react';

interface Props {
    logo: string;
    asset: string;
    withdraw: (amount : number) => Promise<void>;
}

const Withdraw : React.FC<Props> = ({ logo, withdraw }) => {
  return (
    <HStack>
        <VStack>
            <Image 
                src={logo}
                height='60px'
                width='60px'
                rounded='full'
                alt='coin logo'
            />
        </VStack>
    </HStack>
  )
}

export default Withdraw