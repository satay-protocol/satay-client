import React, { useEffect } from 'react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useBreakpointValue,
    IconButton,
    useClipboard,
    useToast,
    Image,
    Flex,
    Text,
    Box
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { FaWallet } from 'react-icons/fa'

import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter'

import { ellipsize } from '../../services/utils'

const ConnectWallet = () => {

    const { connected, account, disconnect, wallets, select } = useWallet();

    const { onCopy, setValue } = useClipboard("")

    const toast = useToast();

    useEffect(() => {
        if (account?.address) {
            setValue(account?.address?.toString())
        }
    }, [account, setValue])


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
                rightIcon={!mobileView ? <ChevronDownIcon /> : undefined}
                leftIcon={!mobileView ? <FaWallet /> : undefined}
                icon={mobileView ? <FaWallet /> : undefined}
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
                                icon={<Image src={wallet.adapter.icon} boxSize={6} alt={wallet.adapter.name} />}
                                fontWeight="medium"
                                alignItems='center'
                            >
                                <Flex
                                    justifyContent='space-between'
                                    alignItems='center'
                                    gap={4}
                                >
                                    {wallet.adapter.name}
                                    {
                                        (wallet.adapter.name === 'Pontem' || wallet.adapter.name == 'Rise Wallet') && (
                                            <Flex
                                                alignItems='center'
                                                bg='green.500'
                                                rounded='lg'
                                                p={1}

                                            >
                                                <Text
                                                    fontSize='xs'
                                                    color='white'
                                                    fontWeight='bold'
                                                >
                                                    Popular
                                                </Text>
                                            </Flex>
                                        )
                                    }
                                </Flex>
                            </MenuItem>
                        ))
                    )
                }
                
            </MenuList>
        </Menu>
    )
}

export default ConnectWallet