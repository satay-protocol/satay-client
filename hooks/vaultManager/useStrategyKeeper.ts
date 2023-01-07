import { useState, useEffect } from "react";
import { satay } from "../../data/moduleAddresses";
import { structToString } from "../../services/aptosUtils";
import { getNetworkSlug } from "../../services/network";
import { fetchKeeperForStrategy } from "../../services/strategies";
import { StructData } from "../../types/aptos";
import useWallet from "../utility/useWallet";

const useStrategyKeeper = (strategyWitness: StructData, vaultAddress: string) => {

    const { network, submitTransaction } = useWallet();

    const [curKeeper, setCurKeeper] = useState<string | null>(null);
    const [newKeeper, setNewKeeperState] = useState<string | null>(null);

    const setNewKeeper = (keeper: string) => {
        setNewKeeperState(keeper);
    }

    useEffect(() => {
        const getKeeper = async () => {
            const keeper = await fetchKeeperForStrategy(strategyWitness, vaultAddress, getNetworkSlug(network.name));
            setCurKeeper(keeper);
        };
        getKeeper();
    }, [strategyWitness, vaultAddress]);

    const onUpdate = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::strategy_config::set_keeper`,
            arguments: [
                vaultAddress,
                newKeeper
            ],
            type_arguments: [structToString(strategyWitness)]
        }, {
            title: 'Keeper Updated!',
            description: 'Your keeper has been updated.'
        });
        setNewKeeperState(null);
    }


    return {
        curKeeper,
        newKeeper,
        setNewKeeper,
        onUpdate
    };
}

export default useStrategyKeeper;