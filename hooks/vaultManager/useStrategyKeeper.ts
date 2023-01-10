import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";
import useWallet from "../utility/useWallet";

import { structToString } from "../../services/aptosUtils";
import { fetchKeeperForStrategy } from "../../services/strategies";

import { satay } from "../../data/moduleAddresses";

import { StructData } from "../../types/aptos";

const useStrategyKeeper = (strategyWitness: StructData, vaultAddress: string) => {

    const { network } = useAptos();
    const { submitTransaction } = useWallet();

    const [curKeeper, setCurKeeper] = useState<string | null>(null);
    const [newKeeper, setNewKeeperState] = useState<string | null>(null);

    const setNewKeeper = (keeper: string) => {
        setNewKeeperState(keeper);
    }

    useEffect(() => {
        const getKeeper = async () => {
            const keeper = await fetchKeeperForStrategy(strategyWitness, vaultAddress, network);
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