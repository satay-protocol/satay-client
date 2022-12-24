import React, { useEffect } from 'react'

import 'chart.js/auto';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'

import { useColorModeValue, useTheme } from '@chakra-ui/react';

interface Props {
  data: number[],
  labels: string[],
  setDisplayIndex?: (value: number) => void,
  onMouseLeave?: () => void,
  onMouseEnter?: () => void,
}

const LineGraph: React.FC<Props> = ({ data, labels, setDisplayIndex, onMouseLeave, onMouseEnter }) => {
  

  const { colors } = useTheme();

  const brand = useColorModeValue(colors.brand[600], colors.brand[400]);
  const hoverLine = useColorModeValue(colors.blackAlpha[400], colors.whiteAlpha[400]);

  useEffect(() => {
    Chart.register({
      id: 'uniqueid5', //typescript crashes without id
      afterDraw: function (chart: Chart, easing: any) {
        const activeElements = chart.tooltip.getActiveElements()
        if (activeElements.length) {
          const activePoint = activeElements[0];
          setDisplayIndex && setDisplayIndex(activePoint.index);
          const ctx = chart.ctx;
          const x = activePoint.element.x;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = hoverLine;
          ctx.stroke();
          ctx.restore();
        }
      }
    });
  }, [setDisplayIndex, brand]);

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
            events: ['mouseout', 'mousemove'],
            plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  intersect: false,
                  mode: 'index',
                  enabled: false,
                }
            },
            elements: {
                line: {
                  borderColor: brand,
                  borderWidth: 3,
                },
                point: {
                  radius: 2,
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
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'index',
              intersect: false
            }
        }}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
    />
  )
}

export default LineGraph