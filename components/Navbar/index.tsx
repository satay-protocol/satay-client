import {
    FlexProps,
    Flex,
    IconButton,
    useColorModeValue,
    HStack,
    Image,
    Button
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
import { routes } from './routes';
import Link from 'next/link';

interface Props extends FlexProps {
    onOpen: () => void;
}
  
const Navbar : React.FC<Props> = ({ onOpen, ...rest }) => {    
    return (
        <Flex
            px={4}
            height={20}
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            rounded="lg"
            shadow='xl'
            {...rest}
            gap={8}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />
            <Link
                href='/'
            >
                <Button
                    variant='ghost'
                    colorScheme='brand'
                    px={0}
                >
                    <Image 
                        src="/logo.png"
                        height={10}
                        width={10}
                        alt='satay logo'

                    />
                </Button>
            </Link>
            <Flex
                mr='auto'
                alignItems={'center'}
            >
                {
                    routes.map((route) => (
                        <NavItem 
                            key={route.href}
                            route={route}
                        />
                    ))
                }
            </Flex>
            <HStack>
                {/* <ChainSelect /> */}
                <ConnectWallet />
            </HStack>
        </Flex>
    );
};

export default Navbar