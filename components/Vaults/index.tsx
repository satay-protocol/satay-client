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
      gap={4}
      w='100%'
    >
      <Card>
        <Text
          fontSize={page ? pageHeaderSize : nonpageHeaderSize}
          fontWeight={page ? 'extrabold' : 'bold'}
        >
          Vaults
        </Text>
        <Text
          fontWeight={page ? 'semibold' : 'normal'}
        >
          Satay Vaults are secure capital pools that automatically maximize yield on staked digital assets
        </Text>
      </Card>
      <VaultsList />
    </Flex>
  )
}

export default Vaults