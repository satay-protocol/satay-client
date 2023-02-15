import useWallet from "../utility/useWallet";

const useHarvestTend = (vaultStrategyModule: string) => {

    const { submitTransaction } = useWallet();

    const harvest = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${vaultStrategyModule}::harvest`,
            arguments: [],
            type_arguments: []
        }, {
            title: "Strategy Harvested!",
            description: `You have successfully harvested the strategy`
        })
    }

    const tend = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${vaultStrategyModule}::tend`,
            arguments: [],
            type_arguments: []
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