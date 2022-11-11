import React, { ReactNode } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  Container,
} from '@chakra-ui/react';

import { FiHome } from 'react-icons/fi';
import { BsSafe } from 'react-icons/bs';
import { IconType } from 'react-icons';

import Navbar from '../components/Navbar';

import { vaultManager } from '../data/vaultManager';

import useWallet from '../hooks/useWallet';

import IncorrectNetwork from '../components/utilities/IncorrectNetwork';
import Head from 'next/head';
import NotConnected from '../components/utilities/NotConnected';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const DefaultLayout = ({
  children,
}: {
  children: ReactNode;
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { network, connected } = useWallet();

  const correctNetwork = network?.chainId === '36' || network?.chainId === '2';

  return (
    <Box 
      minH="100vh" 
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Head>
        <title>Satay Finance</title>
        <meta name="description" content="The premier yield aggregator on Aptos." />
      </Head>
      <Container 
        mx='auto' 
        maxW='4xl'
      >
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none' }}
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
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Box
          display='flex'
          flexDirection='column'
          gap={4}
          p={4}
        >
          <Navbar
            onOpen={onOpen}
          />
          {
            !connected 
              ? (
                <NotConnected />
              ) : (
                correctNetwork 
                  ? children 
                  : (
                    <IncorrectNetwork />
                  )
              )
          }
        </Box>
      </Container>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent : React.FC<SidebarProps> = ({ onClose, ...rest }) => {

  const { account } = useWallet();

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Vaults', icon: BsSafe, href: '/vaults' },
  ];

  if(account && vaultManager === account.address) {
    LinkItems.push({ name: 'Manage', icon: BsSafe, href: `/manager/${vaultManager}` });
  }

  return (
    <Box
      transition="3s ease"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex 
          h="20" 
          alignItems="center" 
          mx="8" 
          justifyContent="space-between"
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
    </Box>
  );
};

export default DefaultLayout;