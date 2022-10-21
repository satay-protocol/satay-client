import React, { useState } from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'  
import { ChevronDownIcon } from '@chakra-ui/icons'

const chains = ['Aptos', 'Sui'];

const ChainSelect = () => {

    const [selectedChain, setSelectedChain] = useState<string>('Aptos');

    const onClick = (chain: string) => {
        setSelectedChain(chain);
    }

    return (
        <Menu>
            <MenuButton 
                as={Button} 
                colorScheme='brand'
                rightIcon={<ChevronDownIcon />}
            >
                {selectedChain}
            </MenuButton>
            <MenuList>
                {chains.map((chain) => (
                    <MenuItem key={chain} onClick={() => onClick(chain)}>
                        {chain}
                    </MenuItem>
                ))}
            </MenuList>
            </Menu>
    )
}

export default ChainSelect