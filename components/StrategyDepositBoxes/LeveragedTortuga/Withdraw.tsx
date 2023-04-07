import React from 'react';

import {
    Button,
    CircularProgress,
    Text,
    VStack
} from "@chakra-ui/react";

import CoinAmountInput from "../../utilities/CoinAmountInput";

import useAriesTortugaLlsWithdraw from "../../../hooks/strategies/ariesTortugaLLS/useAriesTortugaLlsWithdraw";

const Withdraw = () => {
    const {
        withdrawAmount,
        setWithdrawAmount,
        withdraw,
        routeLoading,
        routeAndQuote,
        depositedAmount,
        borrowedAmount
    } = useAriesTortugaLlsWithdraw();

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
                    Withdraw Amount
                </Text>
                <Text
                    fontSize="xs"
                    fontWeight="medium"
                    opacity={0.6}
                >
                    Available: {depositedAmount} tAPT
                </Text>
                <CoinAmountInput
                    decimals={8}
                    amount={withdrawAmount}
                    setAmount={setWithdrawAmount}
                    max={depositedAmount}
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
                                withdrawAmount === 0 ? (
                                    "Enter a withdraw amount"
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
            <VStack
                w='100%'
                alignItems='flex-start'
                spacing={1}
            >
                <Text
                    fontSize="xs"
                    fontWeight="medium"
                >
                    Estimated Output
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
                                withdrawAmount === 0 ? (
                                    "Enter a withdraw amount"
                                ) : (
                                    !quote ? (
                                        "No quote available"
                                    ) : (
                                        `${(quote.outputUiAmt - borrowedAmount).toFixed(4)} APT - Gas`
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
                onClick={withdraw}
                isDisabled={withdrawAmount === 0 || routeLoading}
            >
                Withdraw
            </Button>
        </VStack>
    );
};

export default Withdraw;
