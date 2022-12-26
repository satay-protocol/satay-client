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
import ColorModeToggle from './ColorModeToggle';
import Card from '../utilities/Card';

interface Props extends FlexProps {
    onOpen: () => void;
}
  
const Navbar : React.FC<Props> = ({ onOpen, ...rest }) => {    
    return (
        <Card>
            <Flex
                alignItems="center"
                {...rest}
                gap={8}
            >
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
                    alignItems={'center'}
                    display={{ base: 'none', md: 'flex' }}
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
                <HStack 
                    flex={1}
                    justifyContent='flex-end'
                >
                    {/* <ChainSelect /> */}
                    <ConnectWallet />
                    <ColorModeToggle />
                    <IconButton
                        display={{ base: 'flex', md: 'none' }}
                        onClick={onOpen}
                        variant="outline"
                        aria-label="open menu"
                        icon={<FiMenu />}
                    />
                </HStack>
            </Flex>
        </Card>
    );
};

export default Navbar