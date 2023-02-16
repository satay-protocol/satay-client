import React from 'react'

import { Flex } from '@chakra-ui/react'

import Offering from './Offering'

import { offeringsData } from './offeringsData'

const Offerings = () => {
  return (
    <Flex
        gap={4}
        flexDirection={{ base: 'column', md: 'row' }}
    >
        {
            offeringsData.map((offering) => (
                <Offering 
                    key={offering.title}
                    offering={offering}
                />
            ))
        }
    </Flex>
  )
}

export default Offerings