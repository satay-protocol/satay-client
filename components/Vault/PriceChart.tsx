import React from 'react'

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { useColorModeValue, useTheme, Text } from "@chakra-ui/react";
import Card from '../utilities/Card';
import { getPerformanceArray } from '../../services/utils';

interface Props {
  
}

const prices = getPerformanceArray();

const PriceChart : React.FC<Props> = () => {

  const { colors } = useTheme();

  const barColor = useColorModeValue(colors.brand[600], colors.brand[300]);
  const gridLineColor = useColorModeValue(colors.gray[200], colors.gray[700]);
  const tickColor = useColorModeValue(colors.gray[700], colors.gray[200]);

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
                labels: prices.map((price) => price.i),
                datasets: [{
                    data: prices.map((price) => price.val),
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
    </Card>
  )
}

export default PriceChart;