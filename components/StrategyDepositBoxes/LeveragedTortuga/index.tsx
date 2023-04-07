import React from 'react';

import {
    Box, Button,
    CircularProgress,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text, VStack
} from "@chakra-ui/react";

import Deposit from "./Deposit";
import useAriesProfile from "../../../hooks/strategies/ariesTortugaLLS/useAriesProfile";
import Withdraw from "./Withdraw";

const LeveragedTortugaDepositBox = () => {

    const { ariesProfile, loading, registerProfile, profileHasLlsAccount, addLlsSubAccount } = useAriesProfile();

    if(loading) {
        return (
            <VStack>
                <CircularProgress
                    isIndeterminate
                    color='brand.500'
                />
            </VStack>
        )
    }

    if(!ariesProfile) {
        return (
            <VStack>
                <Text
                    textAlign='center'
                    fontSize='xl'
                    fontWeight='bold'
                >
                    No Aries profile found
                </Text>
                <Text
                    textAlign='center'
                >
                    You must register an Aries profile to use this strategy
                </Text>
                <Button
                    colorScheme='brand'
                    onClick={registerProfile}
                >
                    Register
                </Button>
            </VStack>
        )
    }

    if(!profileHasLlsAccount) {
        return (
            <VStack>
                <Text
                    textAlign='center'
                    fontSize='xl'
                    fontWeight='bold'
                >
                    No Satay-LLS subaccount found
                </Text>
                <Text
                    textAlign='center'
                >
                    You must add a Satay-LLS account to your Aries Profile use this strategy
                </Text>
                <Button
                    colorScheme='brand'
                    onClick={addLlsSubAccount}
                >
                    Add LLS Account
                </Button>
            </VStack>
        )
    }

    return (
        <Box
            w={'100%'}
        >
            <Tabs colorScheme='brand'>
                <TabList>
                    <Tab flex={1}>Deposit</Tab>
                    <Tab flex={1}>Withdraw</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel
                        key='deposit'
                    >
                        <Deposit />
                    </TabPanel>
                    <TabPanel
                        key='withdraw'
                    >
                        <Withdraw />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default LeveragedTortugaDepositBox;
