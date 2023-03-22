import React from 'react'

import { Text, Flex, useBreakpointValue } from '@chakra-ui/react'

import BlockClass from "./BlockClass";
import {borrowLend, liquidStaking} from "../../data/blocks";

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
        <BlockClass
            title="Liquid Staking"
            description="Earn yield on your staked coins."
            link="https://pontem.network/posts/a-guide-to-liquid-staking"
            blocks={liquidStaking}
        />
        <BlockClass
            title="Borrow / Lend"
            description="Borrow and lend your staked coins."
            link="https://www.nansen.ai/guides/crypto-lending-everything-you-need-to-know-to-get-started"
            blocks={borrowLend}
        />
    </Flex>
  )
}

export default Blocks