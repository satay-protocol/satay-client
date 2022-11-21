import { useEffect, useState } from "react";

import { useAptos } from "../../contexts/AptosContext";

import { satay } from "../../data/moduleAddresses";

import { ManagerResource } from "../../types/aptos";


const useManagerResource = (managerAddress : string) => {

    const { client } = useAptos();

    const [managerResource, setManagerResource] = useState<ManagerResource | null>(null)
    const [complete, setComplete] = useState<boolean>(false);

    useEffect(() => {
        const getManagerResource = async () => {
            const resource = await client.getAccountResource(managerAddress, `${satay}::satay::ManagerAccount`)
                .then(res => res)
                .catch((err) => null)
            if(resource?.data){
                setManagerResource({...resource.data, vaultManager: satay} as ManagerResource);
                setComplete(true);
            } else {
                setManagerResource(null);
                setComplete(true);
            }
        }
        if(!managerResource && !complete){
            getManagerResource();
        }
    }, [client, managerAddress])

    return {
        managerResource,
        complete,
    }
}

export default useManagerResource;