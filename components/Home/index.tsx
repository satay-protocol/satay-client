import React from 'react'

import {Text, VStack, Flex, Image, Button, useColorModeValue} from '@chakra-ui/react'

import Offerings from './Offerings'

const Home = () => {

  const aptosLogoUri = useColorModeValue('/aptos_text_light.svg', '/aptos_text_dark.svg')

  return (
    <VStack
      spacing={8}
    >
      <Flex
          flexDirection='column'
          alignItems='center'
      >
        <Text
          fontSize='5xl'
          fontWeight='black'
        >
          Satay Finance
        </Text>
        <Text
          fontWeight='extrabold'
          textAlign='center'
          fontSize='xl'
        >
          One-stop DeFi Aggregator
        </Text>

      </Flex>
      <Image
          src='/vault_diagram.png'
          alt='Satay Vault Diagram'
          w={{base: '100%', md: '75%'}}
      />
      <Flex
          alignItems='center'
          mt={4}
          gap={2}
      >
        <Text
            fontSize='md'
            fontWeight='bold'
            opacity={0.7}
        >
          Powered by
        </Text>
        <a
            href='https://aptoslabs.com/'
            target='_blank'
            rel='noreferrer'
        >
          <Button
              variant='ghost'
              px={2}
          >
            <Image
                src={aptosLogoUri}
                h='32px'
                alt='Aptos Labs Logo'
            />
          </Button>
        </a>
      </Flex>
      <Offerings />
    </VStack>
  )
}

export default Home