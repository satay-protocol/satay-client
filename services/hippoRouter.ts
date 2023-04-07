import {TradeAggregator} from "@manahippo/hippo-sdk";

import {TransactionPayload_EntryFunctionPayload} from "aptos/src/generated";
import {AptosClient} from "aptos";
import {ApiTradeRoute, DetailedRouteAndQuote} from "@manahippo/hippo-sdk/dist/aggregator/types";

export const getBestRoutePayload = async (
    client: AptosClient,
    fromSymbol: string,
    toSymbol: string,
    inputAmt: number
): Promise<TransactionPayload_EntryFunctionPayload | null> => {
    const bestRoute = await getBestAPITradeRoute(client, fromSymbol, toSymbol, inputAmt);
    if (!bestRoute) return null;
    return bestRoute.makeSwapPayload(inputAmt, 0, true) as TransactionPayload_EntryFunctionPayload;
}

export const getBestAPITradeRoute = async (
    client: AptosClient,
    fromSymbol: string,
    toSymbol: string,
    inputAmt: number
): Promise<ApiTradeRoute | null> => {
    const routeAndQuote = await getBestRouteAndQuote(client, fromSymbol, toSymbol, inputAmt);
    if (!routeAndQuote) return null;
    return routeAndQuote.route.toApiTradeRoute();
}

export const getBestRouteAndQuote = async (
    client: AptosClient,
    fromSymbol: string,
    toSymbol: string,
    inputAmt: number
): Promise<DetailedRouteAndQuote | null> => {
    const agg = await TradeAggregator.create(client);
    const xCoinInfo = agg.coinListClient.getCoinInfoBySymbol(fromSymbol);
    const yCoinInfo = agg.coinListClient.getCoinInfoBySymbol(toSymbol);
    return agg.getBestQuote(inputAmt, xCoinInfo[0], yCoinInfo[0])
        .then((route) => route)
        .catch((_) => null);
}

export const getPayloadFromRouteAndQuote = (routeAndQuote: DetailedRouteAndQuote, inputAmt: number, slippageTolerance: number) => (
    routeAndQuote.route.toApiTradeRoute().makeSwapPayload(
        inputAmt,
        routeAndQuote.quote.outputUiAmt * slippageTolerance,
        true
    ) as TransactionPayload_EntryFunctionPayload
)