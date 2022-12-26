import React, { useEffect } from 'react'

import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useBreakpointValue,
    IconButton,
    useClipboard,
    useToast
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaWallet } from 'react-icons/fa'

import { ellipsize } from '../../services/utils'



const ConnectWallet = () => {

    const { connected, account, disconnect, wallets, select } = useWallet();

    const { onCopy, setValue } = useClipboard("")

    const toast = useToast();

    useEffect(() => {
        if (account?.address) {
            setValue(account?.address?.toString())
        }
    }, [account])


    const onConnect = async (wallet : Wallet) => {
        select(wallet.adapter.name);
    }

    const copy = () => {
        onCopy();
        toast({
            title: "Address Copied",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }
    

    const mobileView = useBreakpointValue({ base: true, sm: false })

    return (
        <Menu>
            <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
                as={mobileView ? IconButton : Button} 
                colorScheme={connected ? 'brand': 'gray'}
                variant={connected ? 'outline' : 'solid'}
                rightIcon={!mobileView && <ChevronDownIcon />}
                leftIcon={!mobileView && <FaWallet />}
                icon={mobileView && <FaWallet />}
            >
                {(connected ? ellipsize(account?.address?.toString()) : 'Connect Wallet')}
            </MenuButton>
            <MenuList>
                {
                    connected ? (
                        <>
                            <MenuItem
                                onClick={copy}
                            >
                                Copy Address
                            </MenuItem>
                            <MenuItem
                                onClick={() => disconnect()}
                            >
                                Disconnect
                            </MenuItem>
                        </>

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