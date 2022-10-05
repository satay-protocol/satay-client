import React from 'react'

import { 
    HStack, 
    Text 
} from '@chakra-ui/react'

const columns = [
    "Asset",
    "Total Deposits",
    "Active Strategies"
]

const HeaderRow : React.FC = () => {
  return (
    <HStack
        width='100%'
        px={2}
    >
        {
            columns.map(column => (
                <Text 
                    key={column}
                    flex={1}
                >
                    {column}
                </Text>
            ))
        }
    </HStack>
  )
}

export default HeaderRow