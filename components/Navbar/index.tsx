import React from 'react';

import Link from 'next/link';

import {
    Flex,
    HStack,
    Image,
    Button,
    Box
} from '@chakra-ui/react'

import ConnectWallet from './ConnectWallet';
import ColorModeToggle from './ColorModeToggle';
import Card from '../utilities/Card';
import MobileNav from './MobileNav';
import Navlinks from './NavLinks';
  
const Navbar : React.FC = () => {    
    return (
        <Card>
            <Flex
                alignItems="center"
                gap={8}
            >
                <Link
                    href='/'
                >
                    <Button
                        variant='ghost'
                        colorScheme='brand'
                        px={0}
                    >
                        <Image 
                            src="/logo.png"
                            height={10}
                            width={10}
                            alt='satay logo'

                        />
                    </Button>
                </Link>
                <Box
                    display={{ base: 'none', md: 'flex' }}
                >
                    <Navlinks />
                </Box>
                <HStack 
                    flex={1}
                    justifyContent='flex-end'
                >
                    <ConnectWallet />
                    <ColorModeToggle />
                    <MobileNav />
                </HStack>
            </Flex>
        </Card>
    );
};

export default Navbar