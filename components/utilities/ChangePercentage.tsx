import React from 'react'

import { Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
    amountStart: number;
    amountEnd: number;
}

const ChangePercentage: React.FC<Props> = ({ amountStart, amountEnd }) => {

    const change = amountEnd - amountStart;
    const changeDisplay = `${change > 0 ? "+" : ""}${change.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    const percentChange = (change / (amountStart || 100)) * 100;
    const percentDisplay = `${percentChange > 0 ? "+" : ""}${percentChange.toFixed(2)}%`;

    const positiveColor = useColorModeValue('green.500', 'green.300');
    const negativeColor = useColorModeValue('red.500', 'red.300');
    const neutralColor = useColorModeValue('gray.500', 'gray.300');

    const color = percentChange > 0 ? positiveColor : percentChange < 0 ? negativeColor : neutralColor;

    return (
        <Text
            color={color}
            fontWeight='bold'
        >
            {changeDisplay} {amountStart > 0 && `(${percentDisplay})`}
        </Text>
    )
}

export default ChangePercentage