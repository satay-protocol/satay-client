import React from 'react'

import { Button } from '@chakra-ui/react'

import { SocialLink } from './socialLinks'

interface Props {
    socialLink: SocialLink
}

const SocialLink: React.FC<Props> = ({ socialLink }) => {
  return (
    <a
        href={socialLink.href}
        target="_blank"
    >
        <Button
            variant="ghost"
            leftIcon={<socialLink.icon />}
        >
            {socialLink.name}
        </Button>
    </a>
  )
}

export default SocialLink