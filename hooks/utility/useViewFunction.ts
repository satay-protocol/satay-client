import {useState, useEffect, useCallback} from 'react';

import {useAptos} from "../../contexts/AptosContext";

import { ViewRequest, MoveValue } from 'aptos/src/generated'

const useViewFunction = (viewRequestInput: ViewRequest) => {

    const { client } = useAptos()

    const [viewRequest, _setViewRequest] = useState<ViewRequest>(viewRequestInput);
    const [returnValue, setReturnValue] = useState<MoveValue[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getData = useCallback(async () => {
        if(!viewRequest) return;
        await client.view(viewRequest)
            .then(setReturnValue)
            .catch(setError)
        setLoading(false);
    }, [client, viewRequest])



    useEffect(() => {
        getData();
    }, [getData])

    return {
        returnValue,
        loading,
        error
    }
}

export default useViewFunction;