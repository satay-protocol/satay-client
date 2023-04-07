import { useState, useEffect, useCallback } from "react";

import {useAptos} from "../../../contexts/AptosContext";

import useWallet from "../../utility/useWallet";

import {getLeverAmount} from "../../../services/aries";
import {getBestRouteAndQuote, getPayloadFromRouteAndQuote} from "../../../services/hippoRouter";

import {moduleToString} from "../../../data/modules";
import tortugaLeverage from "../../../data/structuredProducts/tortugaLeverage";

import {DetailedRouteAndQuote} from "@manahippo/hippo-sdk/dist/aggregator/types";
import {PROFILE_NAME} from "./constants";
import useUserCoinBalance from "../../coin/useUserCoinBalance";
import {APT} from "../../../data/coinStructs";

const useAriesTortugaLlsDeposit = () => {

    const { client } = useAptos();

    const { submitTransaction } = useWallet();

    const [leverAmount, setLeverAmount] = useState<number>(3);

    const [amount, setAmount] = useState(0);
    const [routeAndQuote, setRouteAndQuote] = useState<DetailedRouteAndQuote | null>(null);
    const [routeLoading, setRouteLoading] = useState<boolean>(false);

    const balance = useUserCoinBalance(APT)

    const getRoute = useCallback(async () => {
        setRouteLoading(true);
        let swapAmount = amount * getLeverAmount(0.6, leverAmount);
        const routeAndQuote = await getBestRouteAndQuote(client, 'APT', 'tAPT', swapAmount);
        setRouteLoading(false);
        if(!routeAndQuote) return null;
        setRouteAndQuote(routeAndQuote);
    }, [client, amount, leverAmount])

    useEffect(() => {
        if(amount === 0) return;
        getRoute();
    }, [amount, leverAmount, getRoute]);

    const deposit = async () => {
        let swapAmount = amount * getLeverAmount(0.6, leverAmount);
        const route = getPayloadFromRouteAndQuote(routeAndQuote, swapAmount, 0.99);
        const args = [
            PROFILE_NAME,
            Math.round(amount * 10 ** 8),
            Math.round(swapAmount * 10 ** 8),
            route.arguments[11],
            ...route.arguments.slice(0, 10)
        ];
        const typeArgs = route.type_arguments.slice(1, 3).concat(route.type_arguments.slice(5, 7));
        const payload = {
            type: 'entry_function_payload',
            function: `${moduleToString(tortugaLeverage.module)}::deposit`,
            arguments: args,
            type_arguments: typeArgs,
        }
        let success = await submitTransaction(payload, {
            title: "Strategy Deposit Success!",
            description: `You deposited ${amount} APT as collateral to swap ${swapAmount} APT for ${routeAndQuote.quote.outputUiAmt.toFixed(4)} tAPT`,
        })
        if(success) {
            setAmount(0);
        }
    }

    return {
        deposit,
        leverAmount,
        setLeverAmount,
        amount,
        setAmount,
        routeAndQuote,
        routeLoading,
        balance
    }
}

export default useAriesTortugaLlsDeposit;