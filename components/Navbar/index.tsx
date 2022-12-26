import React from 'react';

import Link from 'next/link';

import {
    Flex,
    HStack,
    Image,
    Button
} from '@chakra-ui/react'

import NavItem from './NavItem';
import ConnectWallet from './ConnectWallet';
import ColorModeToggle from './ColorModeToggle';
import Card from '../utilities/Card';
import MobileNav from './MobileNav';

import { routes } from './routes';
  
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
                <Flex
                    alignItems={'center'}
                    display={{ base: 'none', md: 'flex' }}
                >
                    {
                        routes.map((route) => (
                            <NavItem 
                                key={route.href}
                                route={route}
                            />
                        ))
                    }
                </Flex>
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