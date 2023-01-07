import React from 'react'

import { Flex, HStack, Text, VStack } from '@chakra-ui/react'

import { socialLinks } from './socialLinks'
import SocialLink from './SocialLink'
import Card from '../utilities/Card'
import HalbornAudit from './HalbornAudit'

const Footer = () => {
    return (
        <VStack
            spacing={4}
        >
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
            <HalbornAudit />
        </VStack>
    )
}

export default Footer