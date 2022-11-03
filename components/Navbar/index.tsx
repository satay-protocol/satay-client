import {
    FlexProps,
    Flex,
    IconButton,
    useColorModeValue,
    HStack,
    Image
} from '@chakra-ui/react'

import {
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

import { FiHome } from 'react-icons/fi';
import { BsSafe } from 'react-icons/bs';

import NavItem from './NavItem';
import ChainSelect from './ChainSelect';
import ConnectWallet from './ConnectWallet';

interface Props extends FlexProps {
    onOpen: () => void;
}

interface LinkItemProps {
    name: string;
    href: string;
  }
  
  
const Navbar : React.FC<Props> = ({ onOpen, ...rest }) => {    

    const LinkItems: Array<LinkItemProps> = [
        { name: 'Home', href: '/' },
        { name: 'Vaults', href: '/vaults' },
        { name: 'Products', href: '/products' },
    ];


    return (
        <Flex
            px={4}
            height={20}
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            rounded="lg"
            gap={16}
            shadow='xl'
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
            <Flex
                mr='auto'
                gap={4}
            >
                {
                    LinkItems.map((item, index) => (
                        <NavItem 
                            key={index}
                            href={item.href}
                        >
                            {item.name}
                        </NavItem>
                    ))
                }
            </Flex>
            <HStack spacing={{ base: '0', md: '6' }}>
                <ChainSelect />
                <ConnectWallet />
            </HStack>
        </Flex>
    );
};

export default Navbar