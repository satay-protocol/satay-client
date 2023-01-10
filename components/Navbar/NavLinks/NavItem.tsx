import React from 'react';

import {
  Button,
  Link,
  FlexProps,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';

import { Route } from './routes';

interface NavItemProps extends FlexProps {
  route: Route
}

  const NavItem : React.FC<NavItemProps> = ({ route }) => {

    const { pathname } = useRouter();

    return (
      <Link 
          href={route.href} 
          style={{ textDecoration: 'none' }} 
          _focus={{ boxShadow: 'none' }}
      >
        <Button
          variant="ghost"
          colorScheme={pathname === route.href ? 'brand' : 'gray'}
          leftIcon={<route.icon size='30px' />}
          alignItems='center'
          display='flex'
        >
          {route.name}
        </Button>
      </Link>
    );
  };

  export default NavItem;