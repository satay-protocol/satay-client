import React from 'react'

import { Flex, HStack, Text, useBreakpoint, useBreakpointValue } from '@chakra-ui/react'
import { socialLinks } from './socialLinks'
import SocialLink from './SocialLink'
import Card from '../utilities/Card'

const Footer = () => {

    const breakpoint = useBreakpoint();
    console.log(breakpoint);
    return (
        <Card>
            <Flex
                justifyContent='space-between'
                alignItems='center'
            >
                <Text
                    display={{base: 'none', md: 'block'}}
                >
                    Copyright © 2022 Satay Labs
                </Text>
                <HStack
                    justifyContent={{base: 'center', md: 'flex-end'}}
                    flex={1}
                >
                    {
                        socialLinks.map((socialLink) => (
                            <SocialLink 
                                key={socialLink.name}
                                socialLink={socialLink}
                            />
                        ))
                    }
                </HStack>
            </Flex>
        </Card>
    )
}

export default Footer