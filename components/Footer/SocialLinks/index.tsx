import React from 'react'

import { HStack } from '@chakra-ui/react'

import SocialLink from './SocialLink'

import { socialLinks } from './socialLinks'


const SocialLinks = () => {
  return (
    <HStack
        justifyContent="center"
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
  )
}

export default SocialLinks