import React from 'react'

import { Text, Flex, Box } from '@chakra-ui/react'
import {ArrowForwardIcon} from '@chakra-ui/icons'

import ProtocolList from '../utilities/ProtocolList';

import { Block } from '../../types/block';

interface Props {
    bg?: string;
    block: Block
}

const BlockComponent : React.FC<Props> = ({ bg, block }) => {
  return (
    <Flex
        bg={bg}
        gap={4}
        alignItems='center'
    >
      <Box
        flex={1}
      >
        <Text>
          {block.description}
        </Text>
      </Box>
      <ProtocolList 
        protocols={[block.inputProtocol, block.outputProtocol]}
        iconSize='36px'
        iconSeparator={<ArrowForwardIcon />}
      />
    </Flex>
  )
}

export default BlockComponent