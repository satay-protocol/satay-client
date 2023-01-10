import React from 'react'

import { Text } from '@chakra-ui/react'

import Card from '../utilities/Card'
import Strategies from './Strategies'

import useStrategiesKeptByUser from '../../hooks/keeper/useStrategiesKeptByUser'

interface Props {
    connectedAddress: string
}

const KeeperComponent: React.FC<Props> = ({ connectedAddress }) => {

    const strategiesKeptByUser = useStrategiesKeptByUser(connectedAddress);

    return (
        <Card
            gap={4}
        >
            <Text
                fontSize="3xl"
                fontWeight="extrabold"
            >
                Your Strategies
            </Text>
            <Strategies 
                strategies={strategiesKeptByUser}
            />
        </Card>
    )
}

export default KeeperComponent