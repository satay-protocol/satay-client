import React from 'react'

import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
} from '@chakra-ui/react'

import Card from '../utilities/Card'
import Action from './Action';

import { Vault } from '../../types/vaults';

interface Props {
    vault: Vault;
    deposit: (amount : number) => Promise<void>;
    withdraw: (amount : number) => Promise<void>;
}

const Actions : React.FC<Props> = ({ vault, deposit, withdraw }) => {
  return (
    <Card
        h='100%'
    >
        <Tabs>
            <TabList>
                <Tab flex={1}>Deposit</Tab>
                <Tab flex={1}>Withdraw</Tab>
            </TabList>
            <TabPanels>
                <TabPanel
                    key='deposit'
                >
                    <Action 
                        action={deposit}
                        asset={vault.asset}
                        logo={vault.logo}
                        actionName='Deposit'
                    />
                </TabPanel>
                <TabPanel
                    key='withdraw'
                >
                    <Action 
                        action={withdraw}
                        logo={vault.logo}
                        asset={vault.asset}
                        actionName='Withdraw'
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Card>
  )
}

export default Actions