import React, { useLayoutEffect, useRef } from 'react'

import { Flex, HStack, Image, Text, useColorMode, VStack } from '@chakra-ui/react';

import Card from '../utilities/Card';

import { blackAlpha, bridgeTheme, whiteAlpha } from './theme';

const Bridge = () => {

    const containerRef = useRef();

    const { colorMode } = useColorMode();
    
    useLayoutEffect(() => {
        const bridge = containerRef.current;
        customElements.whenDefined("aptos-bridge").then(() => {
            const theme = bridgeTheme(colorMode);
          // @ts-ignore
          bridge?.setTheme(theme);
        });
    }, [colorMode]);

    return (
        <Flex
            flexDirection='column'
            gap={8}
            w='100%'
        >
            <Flex
                flexDirection='column'
                alignItems='center'
            >
                <Text
                    fontSize='3xl'
                    fontWeight='extrabold'
                >
                    Bridge
                </Text>
                <HStack>
                    <Text
                        fontSize='lg'
                        fontWeight='medium'
                    >
                        Powered by
                    </Text>
                    <Image 
                        src={`/layerZero_${colorMode}.svg`}
                        h='30px'
                        alt='Layer Zero Labs'
                    />
                </HStack>
            </Flex>
            <Card
                alignItems='center'
                gap={4}
                p={6}
            >
                <style>
                    {`
                        button[class$="SelectButtonRoot"] {
                            background-color: ${colorMode == 'dark' ? whiteAlpha(0.1) : blackAlpha(0.1)}; !important
                        }
                        button[class$="SelectButtonRoot"]:hover:not(:disabled) {
                            background-color: ${colorMode == 'dark' ? whiteAlpha(0.2) : blackAlpha(0.2)}; !important
                        }
                        .css-kopfoz:hover {
                            background-color: ${colorMode == 'dark' ? whiteAlpha(0.2) : blackAlpha(0.2)}; !important
                        }
                        .css-w1src5 {
                            margin-top: 0px !important;
                        }
                        .css-s8hbvr {
                            margin-top: 0px !important;
                        }
                        aptos-bridge > div {
                            padding: 0px !important;
                        }
                        .css-8fpckw-LzButton {
                            text-transform: capitalize !important;
                        }
                        .css-1ue53x7-LzButton {
                            text-transform: capitalize !important;
                        }
                    `}
                </style>
                {/* @ts-ignore */}
                <aptos-bridge 
                    ref={containerRef}
                />
            </Card>
        </Flex>
    )
}

export default Bridge