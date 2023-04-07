import { useState, useEffect, useCallback } from "react";

import {useAptos} from "../../../contexts/AptosContext";

import useWallet from "../../utility/useWallet";

import {getBestRouteAndQuote, getPayloadFromRouteAndQuote} from "../../../services/hippoRouter";

import useViewFunction from "../../utility/useViewFunction";

import { structToString } from "../../../services/aptosUtils";

import {moduleToString, tortugaAriesLLSModule} from "../../../data/modules";
import {APT, tAPT} from "../../../data/coinStructs";

import { PROFILE_NAME } from "./constants";

import {DetailedRouteAndQuote} from "@manahippo/hippo-sdk/dist/aggregator/types";

const useAriesTortugaLlsDeposit = () => {

    const { client } = useAptos();

    const { address, submitTransaction } = useWallet();

    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [routeAndQuote, setRouteAndQuote] = useState<DetailedRouteAndQuote | null>(null);
    const [routeLoading, setRouteLoading] = useState<boolean>(false);

    const { returnValue: depositedAmount } = useViewFunction({
        function: `${moduleToString(tortugaAriesLLSModule)}::get_deposit_amount`,
        type_arguments: [structToString(tAPT)],
        arguments: [address.slice(2), PROFILE_NAME.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("")]
    });

    const { returnValue: borrowedAmount } = useViewFunction({
        function: `${moduleToString(tortugaAriesLLSModule)}::get_borrowed_amount`,
        type_arguments: [structToString(APT)],
        arguments: [address.slice(2), PROFILE_NAME.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("")]
    })

    const getRoute = useCallback(async () => {
        setRouteLoading(true);
        const routeAndQuote = await getBestRouteAndQuote(client, 'tAPT', 'APT', withdrawAmount);
        if(!routeAndQuote) return null;
        setRouteAndQuote(routeAndQuote);
        setRouteLoading(false);
    }, [client, withdrawAmount])

    useEffect(() => {
        if(withdrawAmount === 0) return;
        getRoute();
    }, [withdrawAmount, getRoute]);

    const withdraw = async () => {
        const route = getPayloadFromRouteAndQuote(routeAndQuote, withdrawAmount, 0.99);
        const args = [
            PROFILE_NAME,
            withdrawAmount * 10 ** 8,
            parseInt(route.arguments[11]),
            ...route.arguments.slice(0, 10)
        ];
        const typeArgs = route.type_arguments.slice(1, 3).concat(route.type_arguments.slice(5, 7));
        const success = await submitTransaction({
            type: 'entry_function_payload',
            function: `${moduleToString(tortugaAriesLLSModule)}::withdraw`,
            arguments: args,
            type_arguments: typeArgs
        }, {
            title: "Strategy Withdraw Success!",
            description: `You swapped ${withdrawAmount} APT for ${routeAndQuote.quote.outputUiAmt.toFixed(4)} tAPT`,
        })
        if(success) {
            setWithdrawAmount(0);
        }
    }

    return {
        withdraw,
        withdrawAmount,
        setWithdrawAmount,
        routeAndQuote,
        routeLoading,
        depositedAmount: (depositedAmount && depositedAmount.length > 0) ? parseInt(depositedAmount[0] as string) / 10 ** 8 : 0,
        borrowedAmount: (borrowedAmount && borrowedAmount.length > 0) ? borrowedAmount[0] as number / 10 ** 8 : 0
    }
}

export default useAriesTortugaLlsDeposit;