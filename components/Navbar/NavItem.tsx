import React from 'react';
import {
  Button,
  Link,
  FlexProps,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';

interface NavItemProps extends FlexProps {
    href: string;
    children: string;
}

  const NavItem : React.FC<NavItemProps> = ({ children, href }) => {

    const { pathname } = useRouter();

    return (
      <Link 
          href={href} 
          style={{ textDecoration: 'none' }} 
          _focus={{ boxShadow: 'none' }}
      >
        <Button
          variant="ghost"
          colorScheme={pathname === href ? 'brand' : 'gray'}
        >
          {children}
        </Button>
      </Link>
    );
  };

  export default NavItem;