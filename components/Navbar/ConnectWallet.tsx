import React from 'react'

import { Wallet } from '@manahippo/aptos-wallet-adapter'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { ellipsize } from '../../services/utils'

import useWallet from '../../hooks/useWallet'


const ConnectWallet = () => {

    const { connected, account, disconnect, wallets, select  } = useWallet();

    const onConnect = async (wallet : Wallet) => {
        select(wallet.adapter.name);
    }

    return (
        <Menu>
            <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
                as={Button} 
                colorScheme='brand'
                rightIcon={<ChevronDownIcon />}
            >
                {connected ? ellipsize(account?.address?.toString()) : 'Connect Wallet'}
            </MenuButton>
            <MenuList>
                {
                    connected ? (
                        <MenuItem
                            onClick={() => disconnect()}
                        >
                            Disconnect
                        </MenuItem>
                    ) : (
                        wallets.map(wallet => (
                            <MenuItem
                                key={wallet.adapter.name}
                                onClick={() => onConnect(wallet)}
                            >
                                {wallet.adapter.name}
                            </MenuItem>
                        ))
                    )
                }
                
            </MenuList>
        </Menu>
    )
}

export default ConnectWallet