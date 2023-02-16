import React from 'react'

import { Text, Flex, useBreakpointValue } from '@chakra-ui/react'

import Card from '../utilities/Card'
import VaultsList from './VaultsList';

interface Props {
  page?: boolean
}

const Vaults: React.FC<Props> = ({ page }) => {

  const pageHeaderSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const nonpageHeaderSize = useBreakpointValue({ base: 'xl', md: '2xl' })

  return (
    <Flex
      flexDirection='column'
      gap={8}
      w='100%'
    >
      <Flex
          flexDirection='column'
          alignItems='center'
      >
          <Text
              fontSize={page ? pageHeaderSize : nonpageHeaderSize}
              fontWeight={page ? 'extrabold' : 'bold'}
          >
            Vaults
          </Text>
          <Text
              fontWeight={page ? 'semibold' : 'normal'}
              textAlign='center'
              maxW={{ base: '100%', md: '50%' }}
          >
              Satay Vaults are secure capital pools that optimize allocations to Blocks and Strategies to maximize yield on staked assets.
          </Text>
      </Flex>
      <VaultsList />
    </Flex>
  )
}

export default Vaults