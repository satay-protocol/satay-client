import React from 'react'

import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Box
} from '@chakra-ui/react'

import Action from './Action';

import { Block } from '../../types/block';

interface Props {
    deposit: (amount : number) => Promise<void>;
    withdraw: (amount : number) => Promise<void>;
    block: Block,
    inDevelopment?: boolean
}

const DepositWithdraw : React.FC<Props> = ({ deposit, withdraw, block, inDevelopment }) => {
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
                        <Action
                            key='depositAction'
                            action={deposit}
                            symbol={block.inputCoinSymbol}
                            logo={`/${block.inputProtocol}_logo.jpeg`}
                            actionName='Deposit'
                            coinStruct={block.inputCoinType}
                            inDevelopment={inDevelopment}
                        />
                    </TabPanel>
                    <TabPanel
                        key='withdraw'
                    >
                        <Action
                            key='withdrawAction'
                            action={withdraw}
                            symbol={block.outputCoinSymbol}
                            logo={`/${block.outputProtocol}_logo.jpeg`}
                            actionName='Withdraw'
                            coinStruct={block.outputCoinType}
                            inDevelopment={inDevelopment}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default DepositWithdraw