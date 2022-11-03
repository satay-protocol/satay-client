import React from 'react'

import { HStack, Image } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'


interface Props {
    protocols: string[]
    iconSize?: string
}

const ProtocolList : React.FC<Props> = ({ protocols, iconSize = '48px' }) => {
  return (
    <HStack>
        {
            protocols.map((protocol, index) => (
                <>
                    <Image
                        src={`/${protocol}_logo.jpeg`}
                        alt={protocol}
                        w={iconSize}
                        h={iconSize}
                        rounded='full'
                    />
                    {
                        index !== protocols.length - 1 && (
                            <AddIcon />
                        )
                    }
                </>
            ))
        }
    </HStack>
  )
}

export default ProtocolList