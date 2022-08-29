import {
    FlexProps,
    Flex,
    IconButton,
    useColorModeValue,
    Text,
    HStack,
    Menu,
    MenuButton,
    VStack,
    Box,
    MenuList,
    MenuItem
} from '@chakra-ui/react'

import {
    FiMenu,
    FiChevronDown,
} from 'react-icons/fi';
import useAccount from '../../hooks/useAccount';
import { ellipsize } from '../../services/utils';
  

interface Props extends FlexProps {
    onOpen: () => void;
}
  
const Navbar : React.FC<Props> = ({ onOpen, ...rest }) => {

    const {
        connected,
        account,
        wallets,
        connectWallet,
        disconnectWallet,
    } = useAccount();

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Satay
            </Text>
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
                                        onClick={() => disconnectWallet()}
                                    >
                                        Disconnect
                                    </MenuItem>
                                ) : (
                                    wallets.map(wallet => (
                                        <MenuItem
                                            key={wallet.adapter.name}
                                            onClick={() => connectWallet(wallet)}
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