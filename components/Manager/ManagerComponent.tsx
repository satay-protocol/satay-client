import React from 'react'

import { Box, Flex } from '@chakra-ui/react'

import InitializeManager from './InitializeManager';
import CreateVault from './CreateVault';
import Vaults from './Vaults';

import useManagerResource from '../../hooks/manager/useManagerResource'


interface Props {
    managerAddress: string
}

const ManagerComponent : React.FC<Props> = ({ managerAddress }) => {

    const { managerResource } = useManagerResource(managerAddress);

    return (
      <Box>
        {
          managerResource ? (
            <Flex
              direction="column"
              gap={4}
            >
              <Vaults 
                managerAddress={managerAddress}
              />
              <CreateVault />
            </Flex>
          ) : (
            <InitializeManager />
          )
        }
      </Box>
    )
}

export default ManagerComponent