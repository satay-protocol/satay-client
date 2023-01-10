import React from 'react'

import { Skeleton, Text } from '@chakra-ui/react'

import Card from '../utilities/Card'
import Strategies from './Strategies'

import useStrategiesKeptByUser from '../../hooks/keeper/useStrategiesKeptByUser'

interface Props {
    connectedAddress: string
}

const KeeperComponent: React.FC<Props> = ({ connectedAddress }) => {

    const { strategiesKeptByUser, fetched } = useStrategiesKeptByUser(connectedAddress);

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
            <Skeleton
                isLoaded={fetched}
            >
                <Strategies 
                    strategies={strategiesKeptByUser}
                />
            </Skeleton>
        </Card>
    )
}

export default KeeperComponent