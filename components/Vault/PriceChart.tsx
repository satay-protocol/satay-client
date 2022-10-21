import React, {useState} from 'react'

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { useColorModeValue, useTheme, Text, Button, HStack } from "@chakra-ui/react";
import Card from '../utilities/Card';
import { getPerformanceArray, performanceArray } from '../../services/utils';

interface Props {
  
}

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

const PriceChart : React.FC<Props> = () => {

    
  const { colors } = useTheme();

  const barColor = colors.brand[600];
  const tickColor = colors.gray[700];

    const [selectedInterval, setSelectedInterval] = useState<Interval>(intervals[1]);
    const [performance, setPerformance] = useState(performanceArray);

    const updatePerformance = (interval: Interval) => {
        setSelectedInterval(interval);
        setPerformance(getPerformanceArray(interval.value));
    }



    return (
        <Card
            gap={4}
        >
            <Text
                fontSize="xl"
                fontWeight="bold"
            >
                Performance
            </Text>
            <Line
                data={{
                    labels: performance.map((price) => price.i),
                    datasets: [{
                        data: performance.map((price) => price.val),
                        backgroundColor: barColor,
                    }]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        }
                    },
                    scales: {
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: tickColor,
                                callback: (value) => `${value}%`,
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
                        }
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
                            onClick={() => updatePerformance(interval)}
                            variant='ghost'
                            colorScheme={interval.name == selectedInterval.name ? 'brand' : 'gray'}
                        >
                            {interval.name}
                        </Button>
                    ))
                }
            </HStack>
        </Card>
    )
}

export default PriceChart;