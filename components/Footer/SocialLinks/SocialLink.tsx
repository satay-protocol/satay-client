import React from 'react'

import { Button, useBreakpoint, useBreakpointValue } from '@chakra-ui/react'

import { SocialLink } from './socialLinks'

interface Props {
    socialLink: SocialLink
}

const SocialLink: React.FC<Props> = ({ socialLink }) => {

    const showText = useBreakpointValue({base: false, md: true});

    return (
        <a
            href={socialLink.href}
            target="_blank"
            rel="noreferrer"
        >
            <Button
                variant="ghost"
                leftIcon={<socialLink.icon />}
            >
                {showText && socialLink.name}
            </Button>
        </a>
    )
}

export default SocialLink