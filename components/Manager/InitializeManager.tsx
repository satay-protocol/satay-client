import React from 'react'

import { 
    Text,
    Button
} from '@chakra-ui/react'

import Card from '../utilities/Card';

import useInitializeManager from '../../hooks/manager/useInitializeManager'


const InitializeManager : React.FC = () => {

    const { initialize } = useInitializeManager();

    return (
        <Card
            gap={4}
        >
            <Text
                fontSize='xl'
                fontWeight='bold'
            >
                No Manager Account
            </Text>
            <Text>Create a manager account to start managing vaults and strategies.</Text>
            <Button
                onClick={initialize}
            >
                Create Manager Account
            </Button>
        </Card>
    )
}

export default InitializeManager