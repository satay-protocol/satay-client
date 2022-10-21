import React from 'react';
import {
  Button,
  Link,
  FlexProps,
} from '@chakra-ui/react';

import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

interface NavItemProps extends FlexProps {
    icon: IconType;
    href: string;
    children: string;
}

  const NavItem : React.FC<NavItemProps> = ({ icon, children, href, ...rest }) => {

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