import React from 'react'

import { VStack, Text } from '@chakra-ui/react'

import Step from './Step'
import Card from '../../utilities/Card'

import { Block } from '../../../types/block'


interface Props {
  blocks: Block[];
}

const ProductInfo : React.FC<Props> = ({ blocks }) => {
  return (
    <VStack
      spacing={4}
      w='100%'
    >
      <Card>
        <Text
          fontSize='lg'
          fontWeight='bold'
        >
          Blocks
        </Text>
      </Card>
      {blocks.map((block, index) => (
        <Step 
          key={index}
          block={block}
          number={index + 1}
        />
      ))}
    </VStack>
  )
}

export default ProductInfo