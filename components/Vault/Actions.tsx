import React from 'react'

import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Box
} from '@chakra-ui/react'

import Card from '../utilities/Card'
import Action from './Action';

import { Block } from '../../types/block';

interface Props {
    deposit: (amount : number) => Promise<void>;
    withdraw: (amount : number) => Promise<void>;
    coinLogo: string;
    coinSymbol: string;
    coinAddress: string;
    block?: Block
}

const Actions : React.FC<Props> = ({ deposit, withdraw, coinAddress, coinLogo, coinSymbol }) => {
  return (
    <Box
        w={'100%'}
    >
        <Card
            h='100%'
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
                        <Action
                            key='depositAction'
                            action={deposit}
                            symbol={coinSymbol}
                            logo={coinLogo}
                            actionName='Deposit'
                            coinAddress={coinAddress}
                        />
                    </TabPanel>
                    <TabPanel
                        key='withdraw'
                    >
                        <Action
                            key='withdrawAction'
                            action={withdraw}
                            logo={coinLogo}
                            symbol={coinSymbol}
                            actionName='Withdraw'
                            coinAddress={coinAddress}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    </Box>
  )
}

export default Actions