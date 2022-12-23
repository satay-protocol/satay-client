import React from 'react'

import { Box, useColorModeValue } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode;
    [key: string]: any;
}

const AccentedBox: React.FC<Props> = ({ children, ...rest }) => {

    const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');

    return (
        <Box
            p={4}
            bg={bgColor}
            borderRadius="lg"
            {...rest}
        >
            {children}
        </Box>
    )
}

export default AccentedBox