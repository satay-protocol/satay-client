import React from 'react'

import { Flex, Text, VStack } from '@chakra-ui/react'

import Card from '../utilities/Card'
import HalbornAudit from './HalbornAudit'

import SocialLinks from './SocialLinks'

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
                    <SocialLinks />
                </Flex>
            </Card>
            <HalbornAudit />
        </VStack>
    )
}

export default Footer