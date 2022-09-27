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
import { vaultManager } from '../../data/vaultManager';
import Holdings from './Holdings';

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
                        asset={vault.asset}
                        logo={vault.logo}
                        actionName='Deposit'
                        coinAddress={vault.coinType}
                    />
                </TabPanel>
                <TabPanel
                    key='withdraw'
                >
                    <Action
                        key='withdrawAction'
                        action={withdraw}
                        logo={vault.logo}
                        asset={"Vault Coin"}
                        actionName='Withdraw'
                        coinAddress={`${vaultManager}::vault::VaultCoin<${vault.coinType}>`}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
        <Holdings 
            vaultAddress={vault.vaultAddress}
        />
    </Card>
  )
}

export default Actions