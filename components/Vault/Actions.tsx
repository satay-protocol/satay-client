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
import { structToString } from '../../services/vaults';

interface Props {
    deposit: (amount : number) => Promise<void>;
    withdraw: (amount : number) => Promise<void>;
    block: Block
}

const Actions : React.FC<Props> = ({ deposit, withdraw, block }) => {
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
                            symbol={block.inputCoinSymbol}
                            logo={`/${block.inputProtocol}_logo.jpeg`}
                            actionName='Deposit'
                            coinAddress={structToString(block.inputCoinType)}
                        />
                    </TabPanel>
                    <TabPanel
                        key='withdraw'
                    >
                        <Action
                            key='withdrawAction'
                            action={withdraw}
                            logo={`/${block.outputProtocol}_logo.jpeg`}
                            symbol={block.outputCoinSymbol}
                            actionName='Withdraw'
                            coinAddress={structToString(block.outputCoinType)}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    </Box>
  )
}

export default Actions