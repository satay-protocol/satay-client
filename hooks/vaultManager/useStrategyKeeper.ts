import { useState, useEffect } from "react";

import { useAptos } from "../../contexts/AptosContext";
import useWallet from "../utility/useWallet";

import { structToString } from "../../services/aptosUtils";
import { fetchKeeperForStrategy } from "../../services/strategies";

import { satay } from "../../data/moduleAddresses";

import { StructData } from "../../types/aptos";

const useStrategyKeeper = (baseCoinStruct: StructData, strategyWitness: StructData) => {

    const { client } = useAptos();
    const { submitTransaction } = useWallet();

    const [curKeeper, setCurKeeper] = useState<string | null>(null);
    const [newKeeper, setNewKeeperState] = useState<string | null>(null);

    const setNewKeeper = (keeper: string) => {
        setNewKeeperState(keeper);
    }

    useEffect(() => {
        const getKeeper = async () => {
            const keeper = await fetchKeeperForStrategy(client, baseCoinStruct, strategyWitness);
            setCurKeeper(keeper);
        };
        getKeeper();
    }, [strategyWitness, baseCoinStruct]);

    const onUpdate = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${satay}::strategy_config::set_keeper`,
            arguments: [newKeeper],
            type_arguments: [structToString(baseCoinStruct), structToString(strategyWitness)]
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