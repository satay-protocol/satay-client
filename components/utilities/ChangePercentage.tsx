import { Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

interface Props {
    percentChange: number;
}

const ChangePercentage: React.FC<Props> = ({ percentChange }) => {

    const positiveColor = useColorModeValue('green.500', 'green.300');
    const negativeColor = useColorModeValue('red.500', 'red.300');
    const neutralColor = useColorModeValue('gray.500', 'gray.300');

    const color = percentChange > 0 ? positiveColor : percentChange < 0 ? negativeColor : neutralColor;

    return (
        <Text
            color={color}
            fontWeight='bold'
        >
            {percentChange < 0 && '+'}{percentChange.toFixed(2)}%
        </Text>
    )
}

export default ChangePercentage