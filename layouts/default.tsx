import React from 'react';

import Head from 'next/head';

import {
  Box,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';


import Navbar, { navbarHeight } from '../components/Navbar';
import IncorrectNetwork from '../components/utilities/IncorrectNetwork';
import Footer, { footerHeight } from '../components/Footer';

import useWallet from '../hooks/utility/useWallet';

import { getNetworkSlug } from '../services/network';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {

  const { network, connected } = useWallet();

  const correctNetwork = Boolean(getNetworkSlug(network?.name))

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
        justifyContent='center'
        p={0}
      >
        <Box
          display='flex'
          gap={4}
          p={{ base: 4, md: 8}}
          pt={{ base: 4 + navbarHeight, md: 8 + navbarHeight }}
          pb={{ base: 4 + navbarHeight, md: 8 + footerHeight }}
        >
          <Navbar />
          {
            connected && !correctNetwork 
            ? <IncorrectNetwork />
            : children
          }
          <Footer />
        </Box>
      </Container>
    </Box>
  );
}

export default DefaultLayout;