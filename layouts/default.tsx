import React, { ReactNode } from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Container,
} from '@chakra-ui/react';

import { IconType } from 'react-icons';

import Navbar from '../components/Navbar';

import useWallet from '../hooks/useWallet';

import IncorrectNetwork from '../components/utilities/IncorrectNetwork';
import Head from 'next/head';
import NotConnected from '../components/utilities/NotConnected';
import { getNetworkSlug } from '../services/aptosUtils';
import Footer from '../components/Footer';

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

  const { network, connected } = useWallet();

  const correctNetwork = getNetworkSlug(network?.name) !== "";

  return (
    <Box 
      minH="100vh" 
      bg={useColorModeValue('blackAlpha.50', 'blackAlpha.700')}
    >
      <Head>
        <title>Satay Finance</title>
        <meta name="description" content="The premier yield aggregator on Aptos." />
      </Head>
      <Container 
        mx='auto' 
        maxW='4xl'
        p={0}
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={4}
          p={{ base: 4, md: 8}}
        >
          <Navbar />
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
          <Footer />
        </Box>
      </Container>
    </Box>
  );
}

export default DefaultLayout;