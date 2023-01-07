import React from 'react'

import { HStack, Image, Skeleton, Text, VStack } from '@chakra-ui/react'

import useVaultManagerVaultInfo from '../../../hooks/vaultManager/useVaultManagerVaultInfo'
import UpdateFees from './UpdateFees'
import FreezeVault from './FreezeVault'
import Strategies from '../Strategies'
import AccentedBox from '../../utilities/AccentedBox'

interface Props {
    vaultId: string
}

const Vault: React.FC<Props> = ({ vaultId }) => {

    const vaultInfo = useVaultManagerVaultInfo(vaultId)

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
                vaultId={vaultId}
                isFrozen={vaultInfo.isFrozen}
              />
            </HStack>
            <UpdateFees
              vaultId={vaultId}
              vaultFees={vaultInfo.fees}
            />
            <Strategies 
              vaultAddress={vaultInfo.vaultAddress}
              vaultId={vaultId}
              baseCoin={vaultInfo.baseCoin}
            />
          </VStack>
        </AccentedBox>
      )
}

export default Vault