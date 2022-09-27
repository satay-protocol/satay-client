import {
    FlexProps,
    Flex,
    IconButton,
    useColorModeValue,
    Text,
    HStack,
    Menu,
    MenuButton,
    Box,
    MenuList,
    MenuItem,
    Image
} from '@chakra-ui/react'

import {
    FiMenu,
    FiChevronDown,
} from 'react-icons/fi';

import { useRouter } from 'next/router';

import { ellipsize } from '../../services/utils';
import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter';

interface Props extends FlexProps {
    onOpen: () => void;
}
  
const Navbar : React.FC<Props> = ({ onOpen, ...rest }) => {

    const {
        connected,
        account,
        wallets,
        select,
        disconnect
    } = useWallet();

    const onConnect = async (wallet : Wallet) => {
        select(wallet.adapter.name);
    }

    return (
        <Flex
            px={4}
            height={20}
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            justifyContent={{ base: 'space-between' }}
            rounded="lg"
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Image 
                src="/logo.png"
                height={10}
                width={10}
                alt='satay logo'
            />
            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Text fontSize="sm">
                                    {connected ? ellipsize(account?.address?.toString()) : 'Connect Wallet'}
                                </Text>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}
                        >
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
                </Flex>
            </HStack>
        </Flex>
    );
};

export default Navbar