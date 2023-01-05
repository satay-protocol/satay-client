import React from 'react'

import { Box, Flex } from '@chakra-ui/react'

import Vaults from './Vaults';

import useManagerResource from '../../hooks/manager/useManagerResource'
import NotManager from './NotManager';


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
              {/* <CreateVault /> */}
            </Flex>
          ) : (
            <NotManager />
          )
        }
      </Box>
    )
}

export default ManagerComponent