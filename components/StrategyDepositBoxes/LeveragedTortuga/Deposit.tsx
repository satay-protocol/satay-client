import React from 'react';

import {
    Box,
    Button,
    CircularProgress,
    HStack,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    VStack
} from "@chakra-ui/react";

import CoinAmountInput from "../../utilities/CoinAmountInput";

import useAriesTortugaLlsDeposit from "../../../hooks/strategies/ariesTortugaLLS/useAriesTortugaLlsDeposit";

import {getLeverAmount} from "../../../services/aries";

const Deposit: React.FC = () => {

    const {
        leverAmount,
        setLeverAmount,
        amount,
        setAmount,
        routeAndQuote,
        routeLoading,
        deposit,
        balance
    } = useAriesTortugaLlsDeposit();

    const quote = routeAndQuote?.quote;

    return (
        <VStack
            w='100%'
            alignItems='flex-start'
            spacing={4}
        >
            <VStack
                w='100%'
                alignItems='flex-start'
                spacing={1}
            >
                <Text
                    fontSize="xs"
                    fontWeight="medium"
                >
                    Deposit Amount
                </Text>
                <Text
                    fontSize="xs"
                    fontWeight="medium"
                    opacity={0.6}
                >
                    Balance: {balance} APT
                </Text>
                <CoinAmountInput
                    decimals={8}
                    amount={amount}
                    setAmount={setAmount}
                    max={balance}
                    symbol='APT'
                />
            </VStack>
            <VStack
                w='100%'
                alignItems='flex-start'
                spacing={1}
            >
                <Text
                    fontSize="xs"
                    fontWeight="medium"
                >
                    Leverage Multiplier
                </Text>
                <HStack
                    w='100%'
                    gap={4}
                >
                    <Slider value={leverAmount} onChange={setLeverAmount} min={1} max={6} step={1}>
                        <SliderTrack>
                            <Box position='relative' right={10} />
                            <SliderFilledTrack bg='brand.500' />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                    </Slider>
                    <Text>
                        {leverAmount}x
                    </Text>
                </HStack>
            </VStack>
            <VStack
                w='100%'
                alignItems='flex-start'
                spacing={1}
            >
                <Text
                    fontSize="xs"
                    fontWeight="medium"
                >
                    Swap Amount
                </Text>
                <Text
                    fontSize='lg'
                    fontWeight='semibold'
                >
                    {amount.toFixed(4)} APT * {getLeverAmount(0.6, leverAmount).toFixed(4)} = {(amount * getLeverAmount(0.6, leverAmount)).toFixed(4)} APT
                </Text>
            </VStack>
            <VStack
                w='100%'
                alignItems='flex-start'
                spacing={1}
            >
                <Text
                    fontSize="xs"
                    fontWeight="medium"
                >
                    Best Quote
                </Text>
                {
                    routeLoading ? (
                        <CircularProgress
                            isIndeterminate
                            color='brand.500'
                            size='24px'
                        />
                    ) : (
                        <Text
                            fontSize='lg'
                            fontWeight='semibold'
                        >
                            {
                                amount === 0 ? (
                                    "Enter a deposit amount"
                                ) : (
                                    !quote ? (
                                        "No quote available"
                                    ) : (
                                        `${quote.outputUiAmt.toFixed(4)} ${quote.outputSymbol} (${quote.avgPrice.toFixed(4)} ${quote.outputSymbol} / ${quote.inputSymbol})`
                                    )
                                )
                            }
                        </Text>
                    )
                }
            </VStack>
            <Button
                w='100%'
                colorScheme='brand'
                onClick={deposit}
                isDisabled={amount === 0 || routeLoading}
            >
                Deposit
            </Button>
        </VStack>
    );
};

export default Deposit;
