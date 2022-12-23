import React from 'react'

import 'chart.js/auto';
import { Line } from 'react-chartjs-2'

import { useColorModeValue, useTheme } from '@chakra-ui/react';

interface Props {
  data: number[],
  labels: string[],
}

const LineGraph: React.FC<Props> = ({ data, labels }) => {

  const { colors } = useTheme();

  const brand = useColorModeValue(colors.brand[600], colors.brand[400]);

  const gridOptions = {
    display: false,
    drawBorder: false
  }

  const tickOptions = {
    display: false,
  }

  return (
    <Line
        data={{
            labels,
            datasets: [{
                data,
                backgroundColor: brand,
            }]
        }}
        options={{
            responsive: true,
            plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  intersect: false,
                }
            },
            elements: {
                line: {
                  borderColor: brand,
                  borderWidth: 1,
                },
                point: {
                  radius: 0,
                }
            },
            scales: {
                y: {
                    grid: gridOptions,
                    ticks: tickOptions,
                },
                x: {
                    grid: gridOptions,
                    ticks: tickOptions
                },
            },
            interaction: {
                mode: 'x',
                intersect: false,
                axis: 'x',
            },
        }}
    />
  )
}

export default LineGraph