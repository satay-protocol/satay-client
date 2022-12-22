import React, { useState } from 'react'

import { Box, Button, HStack, Text, useColorModeValue, useTheme } from '@chakra-ui/react';

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import moment from 'moment';

import useVaultPerformance from '../../hooks/useVaultPerformance';
import { toAptos } from '../../services/utils';

interface Interval {
    name: string;
    value: number;
}

const intervals : Interval[] = [
    {
        name: '1D',
        value: 15,
    },
    {
        name: '1W',
        value: 30,
    },
    {
        name: '1M',
        value: 45,
    },
    {
        name: '3M',
        value: 60,
    }
]

interface Props {
    vaultId: string;
    tvl: number;
}

const Performance: React.FC<Props> = ({ vaultId, tvl }) => {

    const { performance, loading } = useVaultPerformance(vaultId);

    const { colors } = useTheme();

    const barColor = colors.brand[500];
    const tickColor = colors.gray[700];
  
    const [selectedInterval, setSelectedInterval] = useState<Interval>(intervals[1]);

    return (
        <Box
            w='100%'
            display='flex'
            flexDirection='column'
            gap={2}
        >
            <Text
                fontSize="xl"
                fontWeight="bold"
            >
                TVL
            </Text>
            <Text>
                {toAptos(tvl).toLocaleString()} APT
            </Text>
            <Box
                bg={useColorModeValue('gray.50', 'gray.800')}
                borderRadius="lg"
                p={4}
            >
                <Line
                    data={{
                        labels: performance.map((price) => moment(price.time).format('M/D/YY h:mm A')),
                        datasets: [{
                            data: performance.map((performance) => performance.totalAssets),
                            backgroundColor: barColor,
                        }]
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            }
                        },
                        elements: {
                            line: {
                                borderColor: barColor,
                            }
                        },
                        scales: {
                            y: {
                                grid: {
                                    display: false,
                                    color: tickColor,
                                },
                                ticks: {
                                    color: tickColor,
                                    display: false,
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: tickColor,
                                    display: false,
                                }
                            },
                        },
                    }}
                />
                <HStack
                    spacing={4}
                    justifyContent='space-around'
                >
                    {
                        intervals.map((interval) => (
                            <Button
                                key={interval.name}
                                // onClick={() => updatePerformance(interval)}
                                variant='ghost'
                                colorScheme={interval.name == selectedInterval.name ? 'brand' : 'gray'}
                            >
                                {interval.name}
                            </Button>
                        ))
                    }
                </HStack>
            </Box>
            
        </Box>
    ) 
}

export default Performance