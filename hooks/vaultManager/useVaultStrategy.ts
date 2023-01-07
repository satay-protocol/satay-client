import useWallet from "../useWallet";

const useVaultStrategy = (vaultId: string, strategyModule: string) => {

    const { submitTransaction } = useWallet();

    const harvest = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::harvest`,
            arguments: [vaultId],
            type_arguments: []
        }, {
            title: "Strategy Harvested!",
            description: `You have successfully harvested the strategy`
        })
    }

    const tend = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::tend`,
            arguments: [vaultId],
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

export default useVaultStrategy