import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Container,
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';

import {
    BsSafe
} from 'react-icons/bs';
import { IconType } from 'react-icons';
import Navbar from '../components/Navbar';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Vaults', icon: BsSafe, href: '/vaults' },
];

const DefaultLayout = ({
  children,
}: {
  children: ReactNode;
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box 
      minH="100vh" 
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
        >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
        </Drawer>
        <Navbar
          onOpen={onOpen}
        />
        <Box
          ml={{
            base: 0,
            md: 60
          }}
        >
          <Container 
            mx='auto' 
            p="4"
            maxW='6xl'
          >
            {children}
          </Container>
        </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent : React.FC<SidebarProps> = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
        <Flex 
            h="20" 
            alignItems="center" 
            mx="8" 
            justifyContent="space-between"
        >
            <Text 
              fontSize="2xl"
              fontWeight="bold"
            >
                Satay
            </Text>
            <CloseButton 
                display={{ base: 'flex', md: 'none' }} 
                onClick={onClose} 
            />
        </Flex>
        {
            LinkItems.map((link) => (
                <NavItem 
                    key={link.name} 
                    icon={link.icon}
                    href={link.href}
                >
                    {link.name}
                </NavItem>
            ))
        }
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link 
        href={href} 
        style={{ textDecoration: 'none' }} 
        _focus={{ boxShadow: 'none' }}
    >
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
            bg: 'cyan.400',
            color: 'white',
            }}
            {...rest}
        >
            {
                icon && (
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                    color: 'white',
                    }}
                    as={icon}
                />
                )
            }
            {children}
      </Flex>
    </Link>
  );
};

export default DefaultLayout;