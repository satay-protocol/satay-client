import React from 'react'

import { Flex } from '@chakra-ui/react'

import NavItem from './NavItem'

import { routes } from './routes'

const Navlinks = () => {
  return (
    <Flex
        alignItems={{base: 'flex-start', md: 'center'}}
        flexDirection={{base: 'column', md: 'row'}}
        gap={{base: 4, md: 0}}
    >
        {
            routes.map((route) => (
                <NavItem 
                    key={route.href}
                    route={route}
                />
            ))
        }
    </Flex>
  )
}

export default Navlinks