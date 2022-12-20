import React from 'react'

import { Flex, HStack, Text } from '@chakra-ui/react'
import { socialLinks } from './socialLinks'
import SocialLink from './SocialLink'
import Card from '../utilities/Card'

const Footer = () => {
  return (
    <Card>
        <Flex
            justifyContent='space-between'
            alignItems='center'
        >
            <Text>
                Copyright © 2022 Satay Labs
            </Text>
            <HStack>
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