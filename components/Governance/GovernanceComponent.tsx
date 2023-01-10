import React from 'react'

import { Box, Flex } from '@chakra-ui/react'

import CreateVault from './CreateVault';
import Vaults from './Vaults';
import NotGovernance from './NotGovernance';
import SetGovernance from './SetGovernance';

import useGovernanceAccess from '../../hooks/governance/useGovernanceAccess';

interface Props {
    connectedAddress: string
}

const GovernanceComponent : React.FC<Props> = ({ connectedAddress }) => {

    const hasGovernanceAccess = useGovernanceAccess(connectedAddress);

    return (
      <Box>
        {
          hasGovernanceAccess ? (
            <Flex
              direction="column"
              gap={4}
            >
              <Vaults />
              <CreateVault />
              <SetGovernance />
            </Flex>
          ) : (
            <NotGovernance />
          )
        }
      </Box>
    )
}

export default GovernanceComponent