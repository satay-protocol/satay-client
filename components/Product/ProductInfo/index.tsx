import React from 'react'

import { VStack, Text } from '@chakra-ui/react'

import Step from './Step'
import Card from '../../utilities/Card'

import { Block } from '../../../types/block'


interface Props {
  name: string;
  blocks: Block[];
}

const ProductInfo : React.FC<Props> = ({ name, blocks }) => {
  return (
    <VStack
      spacing={2}
    >
      <Card>
        <Text
          fontSize='lg'
          fontWeight='bold'
        >
          {name}
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