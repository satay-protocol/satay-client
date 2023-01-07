import { HStack, Image, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'

const HalbornAudit = () => {

    const { colorMode } = useColorMode()

    return (
        <HStack>
            <Text
                fontSize='md'
                fontWeight='semibold'
            >
                Audited by
            </Text>
            <a
                href='https://github.com/satay-protocol/smart-contract-audit'
                target='_blank'
                rel='noreferrer'
            >
                <Image 
                    src={`/halborn_logo_${colorMode}.png`}
                    h={8}
                />
            </a>
        </HStack>
    )
}

export default HalbornAudit