import React from 'react'

import {SimpleGrid} from '@chakra-ui/react'

import BlockCard from './BlockCard'

import {NewBlock} from '../../types/block'

interface Props {
    blocks: NewBlock[]
}

const BlocksView: React.FC<Props> = ({ blocks }) => {
    return (
        <SimpleGrid
            width='100%'
            columns={{ base: 1, md: 2 }}
            gap={4}
        >
            {
                blocks.map(block => (
                    <BlockCard
                        key={block.title}
                        block={block}
                    />
                ))
            }
        </SimpleGrid>
    )
}

export default BlocksView