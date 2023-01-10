import React from 'react';

import {
    Box,
    Flex,
    Text,
    CloseButton,
    Drawer,
    IconButton,
    DrawerContent,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import Navlinks from './NavLinks';
  
const MobileNav: React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<HamburgerIcon />}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <Box
                        transition="3s ease"
                        w={{ base: 'full', md: 60 }}
                        pos="fixed"
                        h="full"
                        bg={useColorModeValue('white', 'blackAlpha.900')}
                    >
                        <Flex 
                            alignItems="center" 
                            justifyContent="space-between"
                            p={4}
                        >
                            <Text 
                                fontSize="2xl"
                                fontWeight="bold"
                            >
                                Satay
                            </Text>
                            <CloseButton 
                                display={{ base: 'flex', md: 'none' }} 
                                onClick={onClose} 
                            />
                        </Flex>
                        <Navlinks />
                    </Box>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MobileNav;