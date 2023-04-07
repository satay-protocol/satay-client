import {useState, useEffect} from 'react';

import {useAptos} from "../../contexts/AptosContext";

import {MaybeHexString} from "aptos";
import {MoveStructValue} from 'aptos/src/generated'

const useAccountResource = <T = MoveStructValue>(accountAddress: MaybeHexString, resourceType: string) => {

    const { client } = useAptos()

    const [accountResource, setAccountResource] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!accountAddress || !resourceType) return;
        client.getAccountResource(accountAddress, resourceType)
            .then((accountResource) => {
                setAccountResource(accountResource.data as T);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            })
    }, [accountAddress, client, resourceType])

    return {
        accountResource,
        loading,
        error
    }
}

export default useAccountResource;