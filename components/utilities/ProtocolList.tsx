import React from 'react'

import { HStack, Image } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

interface Props {
    protocols: string[]
    iconSize?: string
    iconSeparator?: React.ReactNode
}

const ProtocolList : React.FC<Props> = ({ protocols, iconSize = '48px', iconSeparator = <AddIcon /> }) => {
  return (
    <HStack>
        {
            protocols.map((protocol, index) => (
                <HStack
                    key={protocol}
                >
                    <Image
                        src={`/${protocol}_logo.jpeg`}
                        alt={protocol}
                        w={iconSize}
                        h={iconSize}
                        rounded='full'
                    />
                    {
                        index !== protocols.length - 1 && (
                            iconSeparator
                        )
                    }
                </HStack>
            ))
        }
    </HStack>
  )
}

export default ProtocolList