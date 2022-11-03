import React from 'react'

import { Text, Flex } from '@chakra-ui/react'

import Card from '../utilities/Card'

import VaultsList from './VaultsList';

const Vaults = () => {
  return (
    <Flex
      flexDirection='column'
      gap={4}
      w='100%'
    >
      <Card>
        <Text
          fontSize="2xl"
          fontWeight="bold"
        >
          Vaults
        </Text>
      </Card>
      <VaultsList />
    </Flex>
  )
}

export default Vaults