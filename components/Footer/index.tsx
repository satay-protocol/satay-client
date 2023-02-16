import React from 'react'

import { Flex, Text } from '@chakra-ui/react'

import HalbornAudit from './HalbornAudit'

import SocialLinks from './SocialLinks'

export const footerHeight = 20;

const Footer = () => {
    return (
        <Flex
            gap={4}
            position='absolute'
            bottom={0}
            left={0}
            right={0}
            height={footerHeight}
            alignItems='center'
            justifyContent='space-between'
            p={4}
            flexDirection={{base: 'column', md: 'row'}}
        >
            <Text
                display={{base: 'none', md: 'block'}}
            >
                Copyright © 2022 Satay Labs
            </Text>
            <SocialLinks />
            <HalbornAudit />
        </Flex>
    )
}

export default Footer