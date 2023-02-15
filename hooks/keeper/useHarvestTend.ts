import { structToModule, structToString } from "../../services/aptosUtils";
import { StructData } from "../../types/aptos";
import useWallet from "../utility/useWallet";

const useHarvestTend = (baseCoinStruct: StructData, strategyWitness: StructData) => {

    const strategyModule = structToModule(strategyWitness);

    const { submitTransaction } = useWallet();

    const harvest = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::harvest`,
            arguments: [],
            type_arguments: [structToString(baseCoinStruct)]
        }, {
            title: "Strategy Harvested!",
            description: `You have successfully harvested the strategy`
        })
    }

    const tend = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::tend`,
            arguments: [],
            type_arguments: [structToString(baseCoinStruct)]
        }, {
            title: "Strategy Tended!",
            description: `You have successfully tended the strategy`
        })
    }

    return {
        harvest,
        tend
    }
}

export default useHarvestTend