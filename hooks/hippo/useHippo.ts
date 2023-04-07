import { useEffect, useState, useCallback } from "react";

import {TradeAggregator} from "@manahippo/hippo-sdk";

import {useAptos} from "../../contexts/AptosContext";

import {TransactionPayload_EntryFunctionPayload} from "aptos/src/generated";

const useHippo = (fromSymbol: string, toSymbol: string, inputUiAmt: string) => {

    const [payload, setPayload] = useState<TransactionPayload_EntryFunctionPayload | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { client } = useAptos();

    const getQuote = useCallback(async () => {
        const agg = await TradeAggregator.create(client);
        const xCoinInfo = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
        const yCoinInfo = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
        const inputAmt = parseFloat(inputUiAmt);
        const bestRoute = await agg.getBestQuote(inputAmt, xCoinInfo[0], yCoinInfo[0]);
        const payload = bestRoute.route.toApiTradeRoute().makeSwapPayload(inputAmt, 0, true) as TransactionPayload_EntryFunctionPayload;
        setPayload(payload);
        setLoading(false);
    }, [client, fromSymbol, inputUiAmt, toSymbol]);

    useEffect(() => {
        getQuote();
    }, [client, getQuote]);

    return {
        payload,
        loading
    }
    
}

export default useHippo