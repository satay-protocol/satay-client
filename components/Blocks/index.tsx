import React from 'react'

import { Text, Flex, useBreakpointValue, Box } from '@chakra-ui/react'

import Card from '../utilities/Card'
import BlocksView from './BlocksView';
import LiquidStaking from './LiquidStaking';
import BorrowLend from './BorrowLend';

interface Props {
  page?: boolean
}

const Blocks: React.FC<Props> = ({ page }) => {

  const pageHeaderSize = useBreakpointValue({ base: '2xl', md: '3xl' })
  const nonpageHeaderSize = useBreakpointValue({ base: 'xl', md: '2xl' })

  return (
    <Flex
      flexDirection='column'
      gap={4}
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
                Blocks
            </Text>
            <Text
                fontWeight={page ? 'semibold' : 'normal'}
                textAlign='center'
                maxW={{ base: '100%', md: '50%' }}
            >
                Satay Blocks are composable, primative DeFi operations that can be used to create yield generating strategies.
            </Text>
        </Flex>
      <LiquidStaking />
      <BorrowLend />
    </Flex>
  )
}

export default Blocks