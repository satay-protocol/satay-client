import React from 'react'

import { Text } from '@chakra-ui/react'

import Card from '../utilities/Card'

import VaultsList from './VaultsList';

const Vaults = () => {
  return (
    <Card>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb={4}
      >
        Vaults
      </Text>
      <VaultsList />
    </Card>
  )
}

export default Vaults