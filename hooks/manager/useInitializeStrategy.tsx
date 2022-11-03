import useWallet from "../useWallet";


const useInitializeStrategy = (strategyModule : string, vaultId : string) => {

    const { submitTransaction } = useWallet();

    const initialize = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${strategyModule}::initialize`,
            arguments: [vaultId, "10000"],
            type_arguments: []
        }, {
            title: 'Strategy Initialized!',
            description: 'Your strategy has been initialized.'
        })
    }

    return {
        initialize
    }
}

export default useInitializeStrategy;