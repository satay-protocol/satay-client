import { useEffect, useState } from 'react';

import { VaultPreview } from "../types/vaults";

const useVaults = () => {
    const [vaults, setVaults] = useState<VaultPreview[]>([]);

    useEffect(() => {
        const getVaults = async () => {
            const vaults : VaultPreview[] = [
                {
                    asset: 'APTOS',
                    logo: "data:image/png;base64,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",
                    apy: 10.5,
                    totalAssets: 100_000,
                    id: '000'
                },
            ]
            setVaults(vaults);
        }
        getVaults();
    }, []);

    return {
        vaults
    };
}

export default useVaults;