import React from 'react'

import { HStack, Image, Skeleton, Text, VStack } from '@chakra-ui/react'

import useVaultManagerVaultInfo from '../../../hooks/vaultManager/useVaultManagerVaultInfo'
import UpdateFees from './UpdateFees'
import FreezeVault from './FreezeVault'

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
        <VStack
          alignItems="flex-start"
          w='100%'
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
                fontSize='lg'
                fontWeight='semibold'
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
      </VStack>
      )
}

export default Vault