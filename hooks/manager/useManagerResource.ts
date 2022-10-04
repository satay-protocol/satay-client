import { useEffect, useState } from "react";
import { useAptos } from "../../contexts/AptosContext";
import { vaultManager } from "../../data/vaultManager";

export interface ManagerResource {
    vaults: {handle : string},
    next_vault_id: string;
    vaultManager: string
}

const useManagerResource = (managerAddress : string) => {

    const { client } = useAptos();

    const [managerResource, setManagerResource] = useState<ManagerResource | null>(null)
    const [complete, setComplete] = useState<boolean>(false);

    useEffect(() => {
        const getManagerResource = async () => {
            const resource = await client.getAccountResource(managerAddress, `${vaultManager}::satay::ManagerAccount`)
                .then(res => res)
            if(resource?.data){
                setManagerResource({...resource.data, vaultManager} as ManagerResource);
                setComplete(true);
            }
        }
        if(!managerResource && !complete && managerAddress){
            getManagerResource();
        }
    })

    return {
        managerResource,
        complete,
    }
}

export default useManagerResource;