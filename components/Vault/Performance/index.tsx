import React, { useState } from 'react'

import moment from 'moment';

import { Box, Button, HStack, Skeleton, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import LineGraph from '../../utilities/LineGraph';
import AccentedBox from '../../utilities/AccentedBox';
import ChangePercentage from '../../utilities/ChangePercentage';

import useVaultPerformance from '../../../hooks/vault/useVaultPerformance';

import { Interval, intervals } from './intervals';
import { Metric, metrics } from './metrics';

interface Props {
    vaultId: string;
    symbol: string;
}

const Performance: React.FC<Props> = ({ vaultId, symbol }) => {

    const [selectedMetric, setSelectedMetric] = useState<Metric>(metrics[0]);
    const [selectedInterval, setSelectedInterval] = useState<Interval>(intervals[0]);

    const { performance, loading } = useVaultPerformance(vaultId, selectedInterval.value);
    const [displayValueIndex, setDisplayValueIndex] = useState<number>(performance.length - 1);
    const [mouseOver, setMouseOver] = useState<boolean>(false);

    const displayValue = mouseOver
        ? performance[displayValueIndex]?.metrics[selectedMetric.value] || 0
        : performance[performance.length - 1]?.metrics[selectedMetric.value] || 0;

    return (
        <Box
            w='100%'
            display='flex'
            flexDirection='column'
            gap={2}
        >
            <AccentedBox>
                <Box
                    display='flex'
                    flexDirection='column'
                    gap={4}
                >
                    <Tabs
                        isFitted
                        onChange={(index) => setSelectedMetric(metrics[index])}
                        colorScheme='brand'
                    >
                        <TabList>
                            {
                                metrics.map((metric) => (
                                    <Tab
                                        key={metric.value}
                                    >
                                        {metric.name}
                                    </Tab>
                                ))
                            }
                        </TabList>
                    </Tabs>
                    <Skeleton
                        isLoaded={!loading}
                    >
                        <HStack
                            mb={2}
                        >
                            <Text
                                fontSize='lg'
                                fontWeight='bold'
                            >
                                {displayValue.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})} {symbol}
                            </Text>
                            <ChangePercentage 
                                amountStart={performance[0]?.metrics[selectedMetric.value] || 0}
                                amountEnd={displayValue}
                            />
                        </HStack>
                        <LineGraph 
                            data={performance.map((p) => p.metrics[selectedMetric.value] || 0)}
                            labels={performance.map((p) => moment(p.time).format('M/DD/YY HH:mm'))}
                            setDisplayIndex={setDisplayValueIndex}
                            onMouseLeave={() => {
                                setMouseOver(false)
                                setDisplayValueIndex(performance.length - 1)}
                            }
                            onMouseEnter={() => setMouseOver(true)}
                        />
                    </Skeleton>
                    <HStack
                        spacing={4}
                        justifyContent='space-around'
                    >
                        {
                            intervals.map((interval) => (
                                <Button
                                    key={interval.name}
                                    onClick={() => setSelectedInterval(interval)}
                                    variant='ghost'
                                    colorScheme={interval.name == selectedInterval.name ? 'brand' : 'gray'}
                                >
                                    {interval.name}
                                </Button>
                            ))
                        }
                    </HStack>
                </Box>
            </AccentedBox>
        </Box>
    ) 
}

export default Performance