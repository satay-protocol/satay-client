import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Block } from '../../../types/block'
import BlockComponent from '../../Block'
import Card from '../../utilities/Card'

interface Props {
    block: Block,
    number: number
}

const Step : React.FC<Props> = ({ block, number }) => {
  return (
    <Card>
        <HStack
            spacing={4}
        >
            <Text
                fontSize='2xl'
                fontWeight='bold'
            >
                {number}
            </Text>
            <BlockComponent
                block={block}
            />
        </HStack>
    </Card>
  )
}

export default Step