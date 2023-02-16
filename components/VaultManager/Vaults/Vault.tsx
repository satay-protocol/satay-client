import React from 'react'

import { HStack, Image, Skeleton, Text, VStack } from '@chakra-ui/react'

import UpdateFees from './UpdateFees'
import FreezeVault from './FreezeVault'
import Strategies from '../Strategies'
import AccentedBox from '../../utilities/AccentedBox'

import useVaultManagerVaultInfo from '../../../hooks/vaultManager/useVaultManagerVaultInfo'

import { Coin } from '../../../types/coin'

interface Props {
    baseCoin: Coin
}

const Vault: React.FC<Props> = ({ baseCoin }) => {

    const vaultInfo = useVaultManagerVaultInfo(baseCoin.coinStruct)

    if(!vaultInfo){
        return (
          <Skeleton 
            h={12}
          />
        )
    };
    
    return (
      <AccentedBox
        w='100%'
      >
        <VStack
          alignItems="flex-start"
          w='100%'
          spacing={4}
        >
          <HStack
            w='100%'
            justifyContent='space-between'
          >
            <HStack
              spacing={4}
            >
              <Image 
                src={`/${vaultInfo.baseCoin.protocol}_logo.jpeg`}
                boxSize={12}
                rounded="full"
                alt='Vault Logo'
              />
              <Text
                fontSize='2xl'
                fontWeight='bold'
              >
                {vaultInfo.baseCoin.symbol} Vault
              </Text>
            </HStack>
            <FreezeVault 
              baseCoin={baseCoin}
              isFrozen={vaultInfo.isFrozen}
            />
          </HStack>
          <UpdateFees
            baseCoin={baseCoin}
            vaultFees={vaultInfo.fees}
          />
          <Strategies 
            vaultAddress={vaultInfo.vaultAddress}
            baseCoin={vaultInfo.baseCoin}
          />
        </VStack>
      </AccentedBox>
    )
}

export default Vault